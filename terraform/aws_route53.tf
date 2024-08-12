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

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 300
  type            = each.value.type
  zone_id         = data.aws_route53_zone.prj_route53_zone.zone_id
}