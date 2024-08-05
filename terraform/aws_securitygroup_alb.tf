## Resources ####################################################################

resource "aws_security_group" "alb_from_https" {
  name = "${local.env_project_name}-alb-sg"
  vpc_id = aws_vpc.self.id

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.env_project_name}-alb-sg"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_security_group_rule" "https" {
  security_group_id = aws_security_group.alb_from_https.id
  type = "ingress"
  protocol = "tcp"
  from_port = 443
  to_port = 443
  cidr_blocks = ["0.0.0.0/0"]
}