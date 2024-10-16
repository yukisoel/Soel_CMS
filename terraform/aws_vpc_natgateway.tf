## Resources ####################################################################
resource "aws_eip" "nat1" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat1" {
  allocation_id = aws_eip.nat1.id
  subnet_id = aws_subnet.pub_1.id

  tags = {
    Name = "${local.env_project_name}-nat1"
    Project = var.project_name
    Env = local.workspace
  }
}
