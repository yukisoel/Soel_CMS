## Resources ####################################################################
resource "aws_vpc" "self" {
  cidr_block = local.vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    Name = "${local.env_project_name}-vpc"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_subnet" "pub_1" {
  vpc_id = aws_vpc.self.id
  cidr_block = local.subnet_pub_1_cidr_block
  availability_zone = "ap-northeast-1a"

  tags = {
    Name = "${local.env_project_name}-pub-1"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_subnet" "pub_2" {
  vpc_id = aws_vpc.self.id
  cidr_block = local.subnet_pub_2_cidr_block
  availability_zone = "ap-northeast-1c"

  tags = {
    Name = "${local.env_project_name}-pub-2"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_subnet" "pri_1" {
  vpc_id = aws_vpc.self.id
  cidr_block = local.subnet_pri_1_cidr_block
  availability_zone = "ap-northeast-1a"

  tags = {
    Name = "${local.env_project_name}-pri-1"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_subnet" "pri_2" {
  vpc_id = aws_vpc.self.id
  cidr_block = local.subnet_pri_2_cidr_block
  availability_zone = "ap-northeast-1c"

  tags = {
    Name = "${local.env_project_name}-pri-2"
    Project = var.project_name
    Env = local.workspace
  }
}

