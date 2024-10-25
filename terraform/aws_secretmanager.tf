## Data Resources  ############################################
data "aws_secretsmanager_secret" "project_secrets" {
  name = "${var.project_name}-${local.env_project_name}"
}

data "aws_secretsmanager_secret_version" "existing_secret_version" {
  secret_id = data.aws_secretsmanager_secret.project_secrets.id
}
