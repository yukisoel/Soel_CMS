variable "project_name" {
  type = string
    description = "プロジェクト名"
}

locals {
  workspace = terraform.workspace
  vpc_cidr_block = terraform.workspace == "dev" ? "10.0.0.0/16" : ""
#       terraform.workspace == "stage" ? "10.1.0.0/16" :
#         terraform.workspace == "prod" ? "10.2.0.0/16" :
}