variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "Region de AWS donde se desplegaran los recursos"
}

variable "frontend_bucket_name" {
  type        = string
  description = "Nombre del bucket S3 para el frontend del dashboard"
}
