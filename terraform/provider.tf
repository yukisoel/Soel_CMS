provider "aws" {
  profile = "soel_cms"
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Project = var.project_name
      Env = local.workspace
    }
  }
}