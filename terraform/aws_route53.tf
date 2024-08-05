## Data ####################################################################
data "aws_route53_zone" "prj_route53_zone" {
  name = var.route53_zone_name
}

## Resources ####################################################################
resource "aws_route53_record" "prj_route53_record" {
  name    = var.project_url
  zone_id = data.aws_route53_zone.prj_route53_zone.zone_id
  type    = "A"

  alias {
    evaluate_target_health = true
    name                   = aws_lb.prj_alb.dns_name
    zone_id                = aws_lb.prj_alb.zone_id
  }
}