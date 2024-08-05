## Resources ####################################################################
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.self.id

  tags = {
    Name = "${local.env_project_name}-igw"
  }
}