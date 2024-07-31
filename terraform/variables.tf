variable "project_name" {
  type = string
    description = "プロジェクト名"
}

## locals ######################################################################

locals {
  workspace = terraform.workspace
  env_project_name = "${local.workspace}-${var.project_name}"
  vpc_name = "soel-cms-vpc"
  vpc_cidr_block = terraform.workspace == "dev" ? "10.0.0.0/16" : ""
  subnet_pub_1_cidr_block = terraform.workspace == "dev" ? "10.0.0.0/24" : ""
  subnet_pub_2_cidr_block = terraform.workspace == "dev" ? "10.0.1.0/24" : ""
  subnet_pri_1_cidr_block = terraform.workspace == "dev" ? "10.0.2.0/24" : ""
  subnet_pri_2_cidr_block = terraform.workspace == "dev" ? "10.0.3.0/24" : ""
#       terraform.workspace == "stage" ? "10.1.0.0/16" :
#         terraform.workspace == "prod" ? "10.2.0.0/16" :
}