## Resources ####################################################################

resource "aws_acm_certificate" "cert" {
  domain_name = var.project_url
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.prj_route53_record.fqdn]
}