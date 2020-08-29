module "website_production" {
  source           = "./modules/website"
  namespace        = "ps2alerts"
  environment      = "production"
  identifier       = "ps2alerts-website-production"
  url              = "ps2alerts.com"
  checksum_version = var.checksum_version
  api_host         = "api.ps2alerts.com"
  api_token        = var.api_token
  cpu_limit        = "250m"
  mem_limit        = "128Mi"
  cpu_request      = "125m"
  mem_request      = "64Mi"
}