## Resources ####################################################################
resource "aws_vpc_endpoint" "prj_vpc_endpoint_ecr_dkr" {
  vpc_id       = aws_vpc.self.id
  service_name = "com.amazonaws.ap-northeast-1.ecr.dkr"
  vpc_endpoint_type = "Interface"

  private_dns_enabled = true

  subnet_ids = [
    aws_subnet.pub_1.id,
    aws_subnet.pub_2.id
  ]

  security_group_ids = [
    aws_security_group.vpc_endpoint_sg_from_ecs.id
  ]

  tags = {
    Name = "${local.env_project_name}-vpc-endpoint-ecr-dkr"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_vpc_endpoint" "prj_vpc_endpoint_ecr_api" {
  vpc_id       = aws_vpc.self.id
  service_name = "com.amazonaws.ap-northeast-1.ecr.api"
  vpc_endpoint_type = "Interface"

  private_dns_enabled = true

  subnet_ids = [
    aws_subnet.pub_1.id,
    aws_subnet.pub_2.id
  ]

  security_group_ids = [
    aws_security_group.vpc_endpoint_sg_from_ecs.id
  ]

  tags = {
    Name = "${local.env_project_name}-vpc-endpoint-ecr-api"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_vpc_endpoint" "prj_vpc_endpoint_s3" {
  vpc_id       = aws_vpc.self.id
  service_name = "com.amazonaws.ap-northeast-1.s3"
  vpc_endpoint_type = "Gateway"

  tags = {
    Name = "${local.env_project_name}-vpc-endpoint-s3"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_vpc_endpoint" "prj_vpc_endpoint_logs" {
  vpc_id       = aws_vpc.self.id
  service_name = "com.amazonaws.ap-northeast-1.logs"
  vpc_endpoint_type = "Interface"

  private_dns_enabled = true

  subnet_ids = [
    aws_subnet.pub_1.id,
    aws_subnet.pub_2.id
  ]

  security_group_ids = [
    aws_security_group.vpc_endpoint_sg_from_ecs.id
  ]

  tags = {
    Name = "${local.env_project_name}-vpc-endpoint-logs"
    Project = var.project_name
    Env = local.workspace
  }
}




resource "aws_security_group" "vpc_endpoint_sg_from_ecs" {
  name = "${local.env_project_name}-vpc-endpoint-sg"
  vpc_id = aws_vpc.self.id

  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    security_groups = [
      aws_security_group.ecs_from_vpc_local.id
    ]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.env_project_name}-vpc-endpoint-sg"
    Project = var.project_name
    Env = local.workspace
  }
}