## Variables ###############################################
locals {
  deploy_project_name     = "${local.env_project_name}-deployapp"
  deploy_group_name       = "${local.env_project_name}-deploygroup"
  deploy_role_name        = "${local.env_project_name}-deployrole"
  deploy_role_description = "${local.env_project_name} deploy to ECS"
}

data "aws_iam_policy_document" "codedeploy_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["codedeploy.amazonaws.com"]
    }
  }
}

## Data Resources  ############################################
resource "aws_iam_role" "pj_infra_deploy" {
  name        = local.deploy_role_name
  description = local.deploy_role_description
  tags = {
    Name = local.deploy_role_name
  }
  assume_role_policy = data.aws_iam_policy_document.codedeploy_assume_role.json
  managed_policy_arns = [
    data.aws_iam_policy.AWSCodeDeployRoleForECS.arn
  ]
}

data "aws_iam_policy" "AWSCodeDeployRoleForECS" {
  arn = "arn:aws:iam::aws:policy/AWSCodeDeployRoleForECS"
}

## Resources ###############################################
resource "aws_codedeploy_app" "project_codedeploy" {
  name  = local.deploy_project_name
  compute_platform = "ECS"
}

resource "aws_codedeploy_deployment_group" "pj_infra" {
  app_name               = aws_codedeploy_app.project_codedeploy.name
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"
  deployment_group_name  = local.deploy_group_name
  service_role_arn       = aws_iam_role.pj_infra_deploy.arn

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"
    }

    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5
    }
  }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  ecs_service {
    cluster_name = local.cluster_name
    service_name = local.service_name
  }

  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [aws_lb_listener.prj_alb_listener.arn]
      }

      target_group {
        name = aws_lb_target_group.targetgroup1.name
      }

      target_group {
        name = aws_lb_target_group.targetgroup2.name
      }
    }
  }
  depends_on = [aws_ecs_service.project_ecs]
}