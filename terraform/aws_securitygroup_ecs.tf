## Valiables ####################################################################

locals {
  ecs_sg_name        = "${local.env_project_name}-ecs-from-vpc-internal"
  ecs_sg_description = "${local.env_project_name} ecs service common sg"
}

## Resources ###################################################################
resource "aws_security_group" "ecs_from_vpc_local" {
  name       = "${local.workspace}_ecs_from_vpc_local"
  description = local.ecs_sg_description
  vpc_id      = aws_vpc.self.id

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags  = {
    Name = local.ecs_sg_name
  }
}

resource "aws_security_group_rule" "project_ecs_ingress_local_all"{
    security_group_id = aws_security_group.ecs_from_vpc_local.id
    type              = "ingress"
    description       = "VPC Local Network"
    cidr_blocks       = [aws_vpc.self.cidr_block]
    from_port         = 0
    to_port           = 0
    protocol          = "-1"
}