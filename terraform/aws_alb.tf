## Resources ####################################################################

resource "aws_lb" "prj_alb" {
  name = "${local.env_project_name}-alb"
  load_balancer_type = "application"
  internal = false

  subnets = [
    aws_subnet.pub_1.id,
    aws_subnet.pub_2.id
  ]

  security_groups = [
      aws_security_group.alb_from_https.id
  ]
  ip_address_type = "ipv4"
  idle_timeout = 1200

  tags = {
    Name = "${local.env_project_name}-alb"
    Project = var.project_name
    Env = local.workspace
  }
}

resource "aws_lb_listener" "prj_alb_listener" {
  load_balancer_arn = aws_lb.prj_alb.arn
  port = 443
  protocol = "HTTPS"
  ssl_policy = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn = aws_acm_certificate.cert.arn
  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.targetgroup1.arn
  }
  lifecycle {
    ignore_changes = [
    default_action
    ]
  }
}

resource "aws_lb_target_group" "targetgroup1" {
  name = "${local.env_project_name}-tg1"
  vpc_id = aws_vpc.self.id
  target_type = "ip"
  port = 8080
  protocol = "HTTP"
  proxy_protocol_v2 = false
  deregistration_delay = 30
  health_check {
    path = "/"
    timeout = 5
    healthy_threshold = 5
    unhealthy_threshold = 2
    matcher = 200
  }
  tags = {
    Name = "${local.env_project_name}-tg1"
  }
}