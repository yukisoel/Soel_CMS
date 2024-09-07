## Data Resources ################################################################
data "aws_prefix_list" "s3_endpoint" {
  name  = "com.amazonaws.ap-northeast-1.s3"
}

## Resources ####################################################################
resource "aws_route_table" "prj_public_table" {
  vpc_id = aws_vpc.self.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${local.env_project_name}-public-route-table"
    Project = var.project_name
    Env = local.workspace
  }

  depends_on = [
      aws_internet_gateway.igw
  ]
}

resource "aws_route_table" "prj_private_table" {
    vpc_id = aws_vpc.self.id

    tags = {
        Name = "${local.env_project_name}-private-route-table"
        Project = var.project_name
        Env = local.workspace
    }

  depends_on = [
    aws_vpc_endpoint.prj_vpc_endpoint_s3,
    data.aws_prefix_list.s3_endpoint
  ]
}

resource "aws_vpc_endpoint_route_table_association" "prj_vpc_endpoint_route_table_association" {
  route_table_id  = aws_route_table.prj_private_table.id
  vpc_endpoint_id = aws_vpc_endpoint.prj_vpc_endpoint_s3.id
}

resource "aws_route_table_association" "prj_rt_association_pub_1" {
  route_table_id = aws_route_table.prj_public_table.id
  subnet_id = aws_subnet.pub_1.id
}

resource "aws_route_table_association" "prj_rt_association_pub_2" {
  route_table_id = aws_route_table.prj_public_table.id
  subnet_id = aws_subnet.pub_2.id
}

resource "aws_route_table_association" "prj_rt_association_pri_1" {
  route_table_id = aws_route_table.prj_private_table.id
  subnet_id = aws_subnet.pri_1.id
}

resource "aws_route_table_association" "prj_rt_association_pri_2" {
  route_table_id = aws_route_table.prj_private_table.id
  subnet_id = aws_subnet.pri_2.id
}