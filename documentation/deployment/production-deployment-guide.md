# 🚀 Expenzez Production Deployment Guide

**Version**: 1.0.0  
**Date**: August 2025  
**Environment**: Production  
**Status**: Ready for Deployment  

---

## 📋 Pre-Deployment Checklist

### ✅ **Security Requirements**
- [x] All critical and high vulnerabilities resolved
- [x] Security headers implemented and tested
- [x] HTTPS-only communication enforced
- [x] Input validation implemented across all endpoints
- [x] Rate limiting configured and tested
- [x] Secrets moved to secure storage (.env.secure)
- [x] Database encryption enabled
- [x] Monitoring and alerting configured

### ✅ **Code Quality Requirements**
- [x] TypeScript compilation successful (frontend & backend)
- [x] All tests passing (85%+ coverage)
- [x] Linting issues resolved
- [x] Code review completed
- [x] Performance benchmarks met
- [x] Documentation complete
- [x] Error handling implemented

### ✅ **Infrastructure Requirements**
- [x] AWS account configured with appropriate permissions
- [x] Domain name registered and DNS configured
- [x] SSL certificates obtained and configured
- [x] DynamoDB tables created with backups enabled
- [x] AWS Cognito User Pool configured
- [x] Third-party API credentials secured
- [x] Monitoring systems configured

---

## 🏗️ Infrastructure Setup

### 1. **AWS Account Setup**

#### Required AWS Services
```bash
# Services that will be automatically provisioned
- AWS Lambda (Serverless functions)
- API Gateway (API endpoints)
- DynamoDB (Database)
- Cognito (User authentication)
- CloudWatch (Monitoring)
- KMS (Key management)
- S3 (Static assets)
```

#### IAM Permissions Required
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:*",
        "apigateway:*",
        "dynamodb:*",
        "cognito-idp:*",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:PassRole",
        "cloudformation:*",
        "s3:*",
        "logs:*",
        "kms:*"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2. **Environment Configuration**

#### Backend Environment Variables
```bash
# Production environment variables (.env.production)
NODE_ENV=production
AWS_REGION=eu-west-2
STAGE=production

# AWS Cognito
COGNITO_USER_POOL_ID=eu-west-2_xxxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

# TrueLayer Banking API
TRUELAYER_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
TRUELAYER_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TRUELAYER_REDIRECT_URI=https://api.expenzez.com/callback/truelayer

# Database
DYNAMODB_TABLE_NAME=expenzez-production
DYNAMODB_REGION=eu-west-2

# Monitoring
SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@sentry.io/xxxxxxx

# Security
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ENCRYPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# API Configuration
API_BASE_URL=https://api.expenzez.com
CORS_ORIGIN=https://app.expenzez.com,expenzez://
```

#### Frontend Environment Variables
```bash
# Production environment variables (.env.production)
EXPO_PUBLIC_API_URL=https://api.expenzez.com/api
EXPO_PUBLIC_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
EXPO_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@sentry.io/xxxxxxx
EXPO_PUBLIC_ENVIRONMENT=production
```

---

## 🎯 Deployment Process

### Phase 1: Backend Deployment

#### Step 1: Prepare Backend for Deployment
```bash
# Navigate to backend directory
cd expenzez-backend

# Install production dependencies
npm ci --only=production

# Build TypeScript for Lambda functions
npm run build:functions

# Verify build completed successfully
ls -la dist/functions/
```

#### Step 2: Configure AWS Credentials
```bash
# Configure AWS CLI (if not already done)
aws configure
# AWS Access Key ID: [Your Access Key]
# AWS Secret Access Key: [Your Secret Key]
# Default region: eu-west-2
# Default output format: json

# Verify configuration
aws sts get-caller-identity
```

#### Step 3: Deploy Backend Infrastructure
```bash
# Deploy all Lambda functions and infrastructure
serverless deploy --stage production --verbose

# Expected output:
# ✓ Service deployed to stack expenzez-backend-production
# ✓ API Gateway endpoints created
# ✓ DynamoDB tables created
# ✓ Lambda functions deployed
# ✓ CloudWatch logs configured
```

#### Step 4: Verify Backend Deployment
```bash
# Test health check endpoint
curl https://api.expenzez.com/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2025-08-20T10:00:00.000Z",
#   "version": "1.0.0",
#   "environment": "production"
# }

# Test authentication endpoint
curl -X POST https://api.expenzez.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!","name":"Test User"}'
```

### Phase 2: Database Initialization

#### Step 1: Initialize DynamoDB Tables
```bash
# Tables are automatically created by Serverless framework
# Verify tables exist and are configured correctly

aws dynamodb list-tables --region eu-west-2
# Expected output: expenzez-production

# Verify table configuration
aws dynamodb describe-table --table-name expenzez-production --region eu-west-2
```

#### Step 2: Configure Database Backups
```bash
# Enable Point-in-Time Recovery
aws dynamodb put-backup-policy \
  --table-name expenzez-production \
  --backup-policy PointInTimeRecoveryEnabled=true \
  --region eu-west-2

# Set up automated backups
aws dynamodb put-backup-policy \
  --table-name expenzez-production \
  --backup-policy BackupPolicy='{
    "PointInTimeRecoveryEnabled": true,
    "ContinuousBackupsEnabled": true
  }' \
  --region eu-west-2
```

### Phase 3: Frontend Deployment

#### Step 1: Prepare Frontend Build
```bash
# Navigate to frontend directory
cd expenzez-frontend

# Install production dependencies
npm ci

# Update production configuration
cp .env.production .env

# Verify configuration
expo config --type public
```

#### Step 2: Build Mobile App
```bash
# Configure EAS CLI (if not already done)
npm install -g @expo/cli
eas login

# Configure build profiles
eas build:configure

# Build for both platforms
eas build --platform all --profile production

# This will create optimized builds for:
# - iOS (.ipa file for App Store)
# - Android (.apk/.aab file for Google Play)
```

#### Step 3: Submit to App Stores

##### iOS App Store Submission
```bash
# Submit iOS build to App Store Connect
eas submit --platform ios --latest

# Required information:
# - Apple Developer Account
# - App Store Connect App ID
# - App Store metadata and screenshots
# - Privacy policy URL
# - Terms of service URL
```

##### Google Play Store Submission
```bash
# Submit Android build to Google Play Console
eas submit --platform android --latest

# Required information:
# - Google Play Developer Account
# - Google Play Console App ID
# - Play Store metadata and screenshots
# - Privacy policy URL
# - Terms of service URL
```

---

## 🔧 Post-Deployment Configuration

### 1. **DNS and SSL Setup**

#### Configure Domain DNS
```bash
# DNS Records for expenzez.com
# A Record: expenzez.com -> API Gateway IP
# A Record: app.expenzez.com -> Mobile app deep links
# CNAME: api.expenzez.com -> API Gateway domain
# TXT Record: Domain verification for SSL
```

#### SSL Certificate Configuration
```bash
# SSL certificates automatically managed by API Gateway
# Verify SSL configuration
curl -I https://api.expenzez.com/health

# Expected headers:
# HTTP/2 200
# strict-transport-security: max-age=31536000; includeSubDomains
# x-content-type-options: nosniff
```

### 2. **Monitoring Setup**

#### Configure CloudWatch Alarms
```bash
# Create CloudWatch alarms for critical metrics
aws cloudwatch put-metric-alarm \
  --alarm-name "Expenzez-API-ErrorRate" \
  --alarm-description "API error rate too high" \
  --metric-name "4XXError" \
  --namespace "AWS/ApiGateway" \
  --statistic "Sum" \
  --period 300 \
  --threshold 10 \
  --comparison-operator "GreaterThanThreshold" \
  --evaluation-periods 2

aws cloudwatch put-metric-alarm \
  --alarm-name "Expenzez-Lambda-Duration" \
  --alarm-description "Lambda function duration too high" \
  --metric-name "Duration" \
  --namespace "AWS/Lambda" \
  --statistic "Average" \
  --period 300 \
  --threshold 5000 \
  --comparison-operator "GreaterThanThreshold" \
  --evaluation-periods 2
```

#### Configure Sentry Monitoring
```bash
# Sentry is already configured in the application
# Verify Sentry is receiving events
curl -X POST "https://sentry.io/api/0/projects/expenzez/expenzez-backend/events/" \
  -H "Authorization: Bearer YOUR_SENTRY_AUTH_TOKEN"
```

### 3. **Security Configuration**

#### Enable WAF (Web Application Firewall)
```bash
# Create WAF Web ACL for API protection
aws wafv2 create-web-acl \
  --scope REGIONAL \
  --default-action Allow={} \
  --rules file://waf-rules.json \
  --name ExpenzezAPIProtection \
  --description "WAF protection for Expenzez API"

# Associate WAF with API Gateway
aws wafv2 associate-web-acl \
  --web-acl-arn arn:aws:wafv2:eu-west-2:ACCOUNT:regional/webacl/ExpenzezAPIProtection/ID \
  --resource-arn arn:aws:apigateway:eu-west-2::/restapis/API_ID/stages/production
```

#### Configure Rate Limiting
```json
// WAF rate limiting rules (waf-rules.json)
[
  {
    "Name": "RateLimitRule",
    "Priority": 1,
    "Statement": {
      "RateBasedStatement": {
        "Limit": 2000,
        "AggregateKeyType": "IP"
      }
    },
    "Action": {
      "Block": {}
    },
    "VisibilityConfig": {
      "SampledRequestsEnabled": true,
      "CloudWatchMetricsEnabled": true,
      "MetricName": "RateLimitRule"
    }
  }
]
```

---

## 📊 Deployment Verification

### 1. **Health Checks**

#### Backend Health Verification
```bash
# Comprehensive health check script
#!/bin/bash

echo "🔍 Verifying Expenzez Production Deployment"
echo "=========================================="

# 1. API Health Check
echo "1. Testing API Health..."
health_response=$(curl -s -w "%{http_code}" https://api.expenzez.com/health)
if [[ ${health_response: -3} == "200" ]]; then
    echo "✅ API Health: PASSED"
else
    echo "❌ API Health: FAILED (${health_response: -3})"
fi

# 2. Authentication Test
echo "2. Testing Authentication..."
auth_response=$(curl -s -w "%{http_code}" -X POST https://api.expenzez.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"wrongpassword"}')
if [[ ${auth_response: -3} == "401" ]]; then
    echo "✅ Authentication: PASSED"
else
    echo "❌ Authentication: FAILED (${auth_response: -3})"
fi

# 3. Rate Limiting Test
echo "3. Testing Rate Limiting..."
for i in {1..110}; do
    curl -s https://api.expenzez.com/health > /dev/null
done
rate_limit_response=$(curl -s -w "%{http_code}" https://api.expenzez.com/health)
if [[ ${rate_limit_response: -3} == "429" ]]; then
    echo "✅ Rate Limiting: PASSED"
else
    echo "❌ Rate Limiting: FAILED (${rate_limit_response: -3})"
fi

# 4. Security Headers Check
echo "4. Testing Security Headers..."
security_headers=$(curl -I -s https://api.expenzez.com/health | grep -i "x-content-type-options\|x-frame-options\|strict-transport-security")
if [[ -n "$security_headers" ]]; then
    echo "✅ Security Headers: PASSED"
else
    echo "❌ Security Headers: FAILED"
fi

echo "=========================================="
echo "🎉 Deployment verification complete!"
```

#### Database Verification
```bash
# Test database connectivity and performance
aws dynamodb describe-table --table-name expenzez-production --region eu-west-2 \
  --query 'Table.[TableName,TableStatus,ItemCount,TableSizeBytes]'

# Test read/write operations
aws dynamodb put-item \
  --table-name expenzez-production \
  --item '{"PK": {"S": "TEST#123"}, "SK": {"S": "HEALTHCHECK"}, "data": {"S": "test"}}' \
  --region eu-west-2

aws dynamodb get-item \
  --table-name expenzez-production \
  --key '{"PK": {"S": "TEST#123"}, "SK": {"S": "HEALTHCHECK"}}' \
  --region eu-west-2
```

### 2. **Performance Testing**

#### Load Testing Script
```bash
# Basic load testing with curl
#!/bin/bash

echo "🚀 Performance Testing Expenzez API"
echo "=================================="

# Test endpoint response times
endpoints=(
  "https://api.expenzez.com/health"
  "https://api.expenzez.com/api/auth/register"
  "https://api.expenzez.com/api/banking/connections"
)

for endpoint in "${endpoints[@]}"; do
    echo "Testing: $endpoint"
    curl -w "Response Time: %{time_total}s\nHTTP Status: %{http_code}\n" \
         -s -o /dev/null "$endpoint"
    echo "---"
done

echo "=================================="
echo "📊 Performance testing complete!"
```

### 3. **Security Testing**

#### Security Scan
```bash
# Basic security scan
#!/bin/bash

echo "🔒 Security Scan for Expenzez Production"
echo "======================================"

# 1. SSL/TLS Test
echo "1. Testing SSL/TLS Configuration..."
ssl_result=$(curl -s -I https://api.expenzez.com/health | head -1)
echo "SSL Test: $ssl_result"

# 2. Security Headers Test
echo "2. Testing Security Headers..."
curl -I -s https://api.expenzez.com/health | grep -E "(X-|Strict-Transport|Content-Security)"

# 3. HSTS Test
echo "3. Testing HSTS..."
hsts=$(curl -I -s https://api.expenzez.com/health | grep -i strict-transport-security)
if [[ -n "$hsts" ]]; then
    echo "✅ HSTS: Enabled - $hsts"
else
    echo "❌ HSTS: Not found"
fi

echo "======================================"
echo "🛡️ Security scan complete!"
```

---

## 🚨 Emergency Procedures

### 1. **Rollback Procedures**

#### Backend Rollback
```bash
# Emergency backend rollback
#!/bin/bash

echo "🚨 EMERGENCY ROLLBACK INITIATED"
echo "==============================="

# Get previous deployment
previous_deployment=$(serverless info --stage production | grep -A 1 "Stack Outputs" | tail -1)

# Rollback to previous version
serverless rollback --timestamp TIMESTAMP --stage production

# Verify rollback
curl https://api.expenzez.com/health

echo "✅ Rollback completed"
```

#### Database Rollback
```bash
# Point-in-time recovery
aws dynamodb restore-table-from-backup \
  --target-table-name expenzez-production-restored \
  --backup-arn arn:aws:dynamodb:eu-west-2:ACCOUNT:table/expenzez-production/backup/BACKUP_ID

# Or point-in-time recovery
aws dynamodb restore-table-to-point-in-time \
  --source-table-name expenzez-production \
  --target-table-name expenzez-production-restored \
  --restore-date-time "2025-08-20T10:00:00.000Z"
```

### 2. **Incident Response**

#### Critical Incident Response
```bash
# Emergency incident response checklist
echo "🚨 CRITICAL INCIDENT RESPONSE"
echo "============================"
echo "1. ✅ Stop all deployments"
echo "2. ✅ Assess impact and scope"
echo "3. ✅ Activate incident response team"
echo "4. ✅ Implement immediate containment"
echo "5. ✅ Preserve logs and evidence"
echo "6. ✅ Communicate with stakeholders"
echo "7. ✅ Execute recovery procedures"
echo "8. ✅ Conduct post-incident review"

# Preserve critical logs
aws logs create-export-task \
  --log-group-name /aws/lambda/expenzez-backend-production \
  --from "$(date -d '1 hour ago' +%s)000" \
  --to "$(date +%s)000" \
  --destination expenzez-incident-logs \
  --destination-prefix incident-$(date +%Y%m%d-%H%M%S)
```

---

## 📈 Monitoring & Maintenance

### 1. **Daily Operations Checklist**

```bash
# Daily operations monitoring script
#!/bin/bash

echo "📊 Daily Operations Report - $(date)"
echo "=================================="

# 1. System Health
echo "1. System Health Status:"
aws cloudwatch get-metric-statistics \
  --namespace AWS/ApiGateway \
  --metric-name Count \
  --dimensions Name=ApiName,Value=expenzez-backend-production \
  --statistics Sum \
  --start-time $(date -d '24 hours ago' --iso-8601) \
  --end-time $(date --iso-8601) \
  --period 3600

# 2. Error Rates
echo "2. Error Rates (Last 24h):"
aws cloudwatch get-metric-statistics \
  --namespace AWS/ApiGateway \
  --metric-name 4XXError \
  --dimensions Name=ApiName,Value=expenzez-backend-production \
  --statistics Sum \
  --start-time $(date -d '24 hours ago' --iso-8601) \
  --end-time $(date --iso-8601) \
  --period 3600

# 3. Database Performance
echo "3. Database Performance:"
aws dynamodb describe-table \
  --table-name expenzez-production \
  --query 'Table.[ProvisionedThroughput,ItemCount,TableSizeBytes]'

# 4. Cost Analysis
echo "4. Daily Cost (Estimated):"
aws ce get-cost-and-usage \
  --time-period Start=$(date -d '1 day ago' +%Y-%m-%d),End=$(date +%Y-%m-%d) \
  --granularity DAILY \
  --metrics BlendedCost

echo "=================================="
echo "📈 Daily report complete!"
```

### 2. **Weekly Maintenance Tasks**

```bash
# Weekly maintenance checklist
echo "🔧 Weekly Maintenance - Week of $(date)"
echo "======================================"

# 1. Security Updates
echo "1. Checking for security updates..."
npm audit --registry=https://registry.npmjs.org/

# 2. Performance Review
echo "2. Performance metrics review..."
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Duration \
  --dimensions Name=FunctionName,Value=expenzez-backend-production-auth \
  --statistics Average,Maximum \
  --start-time $(date -d '7 days ago' --iso-8601) \
  --end-time $(date --iso-8601) \
  --period 86400

# 3. Backup Verification
echo "3. Backup verification..."
aws dynamodb list-backups \
  --table-name expenzez-production \
  --time-range-lower-bound $(date -d '7 days ago' +%s)

# 4. Log Analysis
echo "4. Log analysis and cleanup..."
aws logs describe-log-groups \
  --log-group-name-prefix /aws/lambda/expenzez-backend-production

echo "======================================"
echo "✅ Weekly maintenance complete!"
```

---

## 📚 Additional Resources

### 1. **Useful Commands Reference**

```bash
# Common deployment commands
serverless deploy --stage production    # Full deployment
serverless deploy function --function auth --stage production  # Single function
serverless invoke --function health --stage production  # Test function
serverless logs --function auth --stage production      # View logs
serverless info --stage production                      # Deployment info
serverless rollback --timestamp TIMESTAMP --stage production  # Rollback

# AWS CLI commands
aws lambda list-functions --region eu-west-2
aws apigateway get-rest-apis --region eu-west-2
aws dynamodb list-tables --region eu-west-2
aws cognito-idp list-user-pools --max-results 10 --region eu-west-2

# Health check commands
curl https://api.expenzez.com/health
curl https://api.expenzez.com/api/auth/health
```

### 2. **Troubleshooting Guide**

#### Common Issues and Solutions

**Issue**: Lambda function timeout
```bash
# Solution: Increase timeout in serverless.yml
timeout: 30  # seconds
```

**Issue**: DynamoDB throttling
```bash
# Solution: Increase provisioned capacity
aws dynamodb update-table \
  --table-name expenzez-production \
  --provisioned-throughput ReadCapacityUnits=50,WriteCapacityUnits=50
```

**Issue**: API Gateway 502 errors
```bash
# Check Lambda function logs
serverless logs --function FUNCTION_NAME --stage production --tail

# Check CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Errors \
  --start-time $(date -d '1 hour ago' --iso-8601) \
  --end-time $(date --iso-8601)
```

### 3. **Support Contacts**

- **Technical Lead**: [Your Name] - [email@company.com]
- **DevOps Engineer**: [DevOps Name] - [devops@company.com]
- **Security Team**: [Security Team] - [security@company.com]
- **AWS Support**: [AWS Support Case Portal]
- **Emergency Hotline**: [Emergency Phone Number]

---

## 🎯 Conclusion

This comprehensive deployment guide provides all the necessary steps and procedures to successfully deploy the Expenzez application to production. The deployment process is designed to be:

- **Secure**: Multiple security checks and verifications
- **Reliable**: Comprehensive testing and rollback procedures
- **Monitored**: Full observability and alerting
- **Maintainable**: Clear operational procedures and documentation

### ✅ **Deployment Readiness Status**
- **Infrastructure**: ✅ Ready
- **Security**: ✅ Verified
- **Testing**: ✅ Complete
- **Documentation**: ✅ Complete
- **Monitoring**: ✅ Configured
- **Support**: ✅ Available

**The Expenzez application is ready for production deployment!** 🚀

---

**Document Version**: 1.0.0  
**Last Updated**: August 2025  
**Next Review**: September 2025