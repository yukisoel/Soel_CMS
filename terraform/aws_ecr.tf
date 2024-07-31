## locals ######################################################################

## Data ######################################################################

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "ecr_policy_document" {
  statement {
    sid = "ECRRepositoryPolicy"
    effect = "Allow"

    principals {
      identifiers = [data.aws_caller_identity.current.account_id]
      type = "AWS"
    }

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload"
    ]
  }
}

## Resources ###################################################################

resource "aws_ecr_repository" "prj_ecr" {
  name = local.env_project_name
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = false
  }

  tags = {
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_ecr_repository_policy" "prj_ecr_policy" {
  repository = aws_ecr_repository.prj_ecr.name
  policy     = data.aws_iam_policy_document.ecr_policy_document.json
}

resource "aws_ecr_lifecycle_policy" "prj_ecr_lifecycle_policy" {
  repository = aws_ecr_repository.prj_ecr.name
  policy     = jsonencode({
    rules = [
      {
        rulePriority = 1,
        description = "Expire images older than 60 days",
        selection = {
          tagStatus = "any",
          countType = "sinceImagePushed",
          countUnit = "days",
          countNumber = 60
        },
        action = {
          type = "expire"
        }
      }
    ]
  })
}