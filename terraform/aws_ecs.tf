## Variables #############################################
locals {
  task_name ="${local.env_project_name}-ecs-task"
  cluster_name = "${local.env_project_name}-ecs-cluster"
  task_execution_role_name = "${local.env_project_name}-ecs-task-execution-role"

  web_ecs_containerDef_json =
}

## Data Resources  ############################################
data "aws_iam_policy" "AmazonECSTaskExecutionRolePolicy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecstasks_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

## Resources ###############################################

resource "aws_iam_role" "ecsTaskExecutionRole" {
  naem = local.task_execution_role_name
  assume_role_policy = data.aws_iam_policy_document.ecstasks_assume_role.json
    managed_policy_arns = [
        data.aws_iam_policy.AmazonECSTaskExecutionRolePolicy.arn
    ]

  tags = {
    Name = local.task_execution_role_name
  }
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
  task_role_arn = aws_iam_role.ecsTaskExecutionRole.arn
  container_definitions = local.
}

