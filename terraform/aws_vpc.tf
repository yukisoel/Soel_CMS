## Resources ####################################################################
resource "aws_vpc" "self" {
  cidr_block = local.vpc_cidr_block

  tags = {
    Project = var.project_name
    Env = local.workspace
  }
}