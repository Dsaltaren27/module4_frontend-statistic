output "cloudfront_url" {
  description = "URL del dashboard de estadísticas via CloudFront"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "s3_bucket_name" {
  description = "Nombre del bucket S3 donde se despliega el frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución CloudFront (necesario para invalidar caché en CI/CD)"
  value       = aws_cloudfront_distribution.frontend.id
}
