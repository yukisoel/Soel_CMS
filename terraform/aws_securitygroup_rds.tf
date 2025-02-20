## Valiables ####################################################################

locals {
  rds_sg_name        = "${local.env_project_name}-rds-from-ecs"
  rds_sg_description = "${local.env_project_name} rds sg"
}

## Resources ###################################################################
resource "aws_security_group" "rds_from_ecs" {
  name       = "${local.workspace}_rds_from_ecs"
  description = local.rds_sg_description
  vpc_id      = aws_vpc.self.id

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags  = {
    Name = local.rds_sg_name
  }
}

resource "aws_security_group_rule" "project_rds_ingress_from_ecs" {
    security_group_id = aws_security_group.rds_from_ecs.id
    type              = "ingress"
    description       = "ECS Task"
    from_port         = 5432
    to_port           = 5432
    protocol          = "tcp"
    source_security_group_id = aws_security_group.ecs_from_vpc_local.id
}
