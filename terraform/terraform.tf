terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }

  backend "s3" {
    profile = "soel_cms"
    bucket = "soel-cms-terraform-state"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
    dynamodb_table = "terraform-soel-cms-lock"
    encrypt = true
  }
}