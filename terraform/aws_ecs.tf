## Variables #############################################
locals {
  task_name                = "${local.env_project_name}-ecs-task"
  cluster_name             = "${local.env_project_name}-ecs-cluster"
  service_name             = "${local.env_project_name}-ecs-service"
  container_name           = local.env_project_name
  task_execution_role_name = "${local.env_project_name}-ecs-task-execution-role"

  web_ecs_containerDef_json = jsonencode([
    {
      name      = local.env_project_name
      image     = "${aws_ecr_repository.prj_ecr.repository_url}:latest"
      cpu       = 256
      memory    = 1024
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
          protocol      = "tcp"
        }
      ]
      secrets = [
        {
          "name"      = "GOOGLE_CLIENT_ID"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:GOOGLE_CLIENT_ID::"
        },
        {
          "name"      = "GOOGLE_CLIENT_SECRET"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:GOOGLE_CLIENT_SECRET::"
        },
        {
          "name"      = "GOOGLE_SCOPE"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:GOOGLE_SCOPE::"
        },
        {
          "name"      = "COGNITO_USER_POOL_ID"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:COGNITO_USER_POOL_ID::"
        },
        {
          "name"      = "COGNITO_CLIENT_ID"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:COGNITO_CLIENT_ID::"
        },
        {
          "name"      = "COGNITO_CLIENT_SECRET"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:COGNITO_CLIENT_SECRET::"
        },
        {
          "name"      = "COGNITO_USER_POOL_DOMAIN"
          "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:COGNITO_USER_POOL_DOMAIN::"
        },
        {
          "name" = "POSTGRES_HOST"
            "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:POSTGRES_HOST::"
        },
        {
          "name" = "POSTGRES_PORT"
            "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:POSTGRES_PORT::"
        },
        {
          "name" = "POSTGRES_USER"
          "valueFrom" = "arn:aws:secretsmanager:ap-northeast-1:211125631266:secret:rds!db-1ccd67f6-96d9-4f6b-a402-744e4d1e5cea-xbmbJc:username::"
        },
        {
          "name" = "POSTGRES_PASSWORD"
            "valueFrom" = "arn:aws:secretsmanager:ap-northeast-1:211125631266:secret:rds!db-1ccd67f6-96d9-4f6b-a402-744e4d1e5cea-xbmbJc:password::"
        },
        {
          "name" = "POSTGRES_DB"
            "valueFrom" = "${data.aws_secretsmanager_secret.project_secrets.arn}:POSTGRES_DB::"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${local.task_name}"
          "awslogs-region"        = "ap-northeast-1"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

## Data Resources  ############################################
data "aws_iam_policy" "AmazonECSTaskExecutionRolePolicy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecstasks_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    effect = "Allow"
    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

## Resources ###############################################

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = local.task_execution_role_name
  assume_role_policy = data.aws_iam_policy_document.ecstasks_assume_role.json
  managed_policy_arns = [
    data.aws_iam_policy.AmazonECSTaskExecutionRolePolicy.arn
  ]

  tags = {
    Name = local.task_execution_role_name
  }
}

resource "aws_iam_role_policy" "ecsTaskExecutionRoleSMPolicy" {
  name = "${local.task_execution_role_name}-sm-policy"
  role = aws_iam_role.ecsTaskExecutionRole.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
        ]
        Resource = [
          data.aws_secretsmanager_secret.project_secrets.arn,
          "arn:aws:secretsmanager:ap-northeast-1:211125631266:secret:rds!db-1ccd67f6-96d9-4f6b-a402-744e4d1e5cea-xbmbJc"
        ]
      }
    ]
  })
}

resource "aws_cloudwatch_log_group" "project_ecs" {
  name = "/ecs/${local.task_name}"
}

resource "aws_ecs_cluster" "project_ecs" {
  name = "${local.cluster_name}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_task_definition" "project_ecs" {
  family             = local.task_name
  cpu                = "256"
  memory             = "1024"
  execution_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
  network_mode       = "awsvpc"
  requires_compatibilities = [
    "FARGATE"
  ]
  task_role_arn         = aws_iam_role.ecsTaskExecutionRole.arn
  container_definitions = local.web_ecs_containerDef_json
}

resource "aws_ecs_service" "project_ecs" {
  name                               = local.service_name
  cluster                            = aws_ecs_cluster.project_ecs.arn
  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  desired_count                      = 1
  task_definition                    = aws_ecs_task_definition.project_ecs.arn
  launch_type                        = "FARGATE"
  enable_ecs_managed_tags            = true
  health_check_grace_period_seconds  = 0

  deployment_controller {
    type = "CODE_DEPLOY"
  }
  load_balancer {
    container_name   = local.container_name
    container_port   = 8080
    target_group_arn = aws_lb_target_group.targetgroup1.arn
  }
  network_configuration {
    assign_public_ip = false
    subnets = [
      aws_subnet.pri_1.id,
      aws_subnet.pri_2.id
    ]
    security_groups = [
      aws_security_group.ecs_from_vpc_local.id
    ]
  }
  platform_version       = "1.4.0"
  enable_execute_command = true
}
