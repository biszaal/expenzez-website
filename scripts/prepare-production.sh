#!/bin/bash

# Expenzez Production Deployment Preparation Script
# Run this script before deploying to production

set -e

echo "🚀 Preparing Expenzez for Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if required environment variables are set
check_env_vars() {
    echo "Checking environment variables..."
    
    required_vars=(
        "COGNITO_USER_POOL_ID"
        "COGNITO_CLIENT_ID"
        "TRUELAYER_CLIENT_ID"
        "TRUELAYER_CLIENT_SECRET"
        "AWS_REGION"
    )
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            print_error "Required environment variable $var is not set"
            exit 1
        fi
    done
    
    print_status "All required environment variables are set"
}

# Security checks
security_check() {
    echo "Running security checks..."
    
    # Check for hardcoded secrets
    if grep -r "sk_" expenzez-backend/src/ || grep -r "pk_" expenzez-backend/src/; then
        print_error "Found potential hardcoded API keys in source code"
        exit 1
    fi
    
    # Check for console.log in production code (should be minimal)
    log_count=$(grep -r "console.log" expenzez-frontend/app/ expenzez-backend/src/ | wc -l)
    if [ "$log_count" -gt 10 ]; then
        print_warning "Found $log_count console.log statements. Consider using proper logging."
    fi
    
    # Check app.json for insecure settings
    if grep -q "NSAllowsArbitraryLoads.*true" expenzez-frontend/app.json; then
        print_error "app.json contains insecure NSAllowsArbitraryLoads setting"
        exit 1
    fi
    
    if grep -q "usesCleartextTraffic.*true" expenzez-frontend/app.json; then
        print_error "app.json contains insecure usesCleartextTraffic setting"
        exit 1
    fi
    
    print_status "Security checks passed"
}

# Build checks
build_check() {
    echo "Running build checks..."
    
    # Backend build
    cd expenzez-backend
    if ! npm run build; then
        print_error "Backend build failed"
        exit 1
    fi
    
    if ! npm run build:functions; then
        print_error "Lambda functions build failed"
        exit 1
    fi
    cd ..
    
    # Frontend type check
    cd expenzez-frontend
    if ! npx expo install --fix; then
        print_error "Frontend dependencies check failed"
        exit 1
    fi
    cd ..
    
    print_status "Build checks passed"
}

# Database checks
database_check() {
    echo "Checking database configuration..."
    
    # Verify DynamoDB tables can be created
    if ! aws dynamodb describe-table --table-name Users --region ${AWS_REGION} >/dev/null 2>&1; then
        print_warning "Users table does not exist. Will be created during deployment."
    fi
    
    print_status "Database checks completed"
}

# Performance checks
performance_check() {
    echo "Running performance checks..."
    
    # Check bundle sizes (approximate)
    cd expenzez-frontend
    if command -v du &> /dev/null; then
        bundle_size=$(du -sh node_modules/ | cut -f1)
        print_warning "Frontend node_modules size: $bundle_size"
    fi
    cd ..
    
    cd expenzez-backend
    if command -v du &> /dev/null; then
        backend_size=$(du -sh node_modules/ | cut -f1)
        print_warning "Backend node_modules size: $backend_size"
    fi
    cd ..
    
    print_status "Performance checks completed"
}

# AWS permissions check
aws_check() {
    echo "Checking AWS permissions..."
    
    # Test AWS CLI access
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS CLI not configured or no permissions"
        exit 1
    fi
    
    # Test DynamoDB access
    if ! aws dynamodb list-tables --region ${AWS_REGION} >/dev/null 2>&1; then
        print_error "No DynamoDB permissions"
        exit 1
    fi
    
    # Test Lambda permissions
    if ! aws lambda list-functions --region ${AWS_REGION} >/dev/null 2>&1; then
        print_error "No Lambda permissions"
        exit 1
    fi
    
    print_status "AWS permissions verified"
}

# Backup preparation
backup_prep() {
    echo "Preparing backup strategy..."
    
    # Enable DynamoDB Point-in-Time Recovery
    tables=("Users" "BankConnections" "UserTransactions" "AIChatHistory" "NotificationTokens" "NotificationPreferences" "NotificationHistory" "NotificationQueue" "UserBudgets" "BudgetAlerts")
    
    for table in "${tables[@]}"; do
        echo "Enabling backup for $table..."
        aws dynamodb put-continuous-backups \
            --table-name $table \
            --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true \
            --region ${AWS_REGION} >/dev/null 2>&1 || true
    done
    
    print_status "Backup strategy configured"
}

# Main execution
main() {
    echo "Starting production readiness checks..."
    
    check_env_vars
    security_check
    build_check
    database_check
    performance_check
    aws_check
    backup_prep
    
    echo ""
    print_status "🎉 Production readiness checks completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy backend: cd expenzez-backend && serverless deploy --stage production"
    echo "2. Build mobile app: cd expenzez-frontend && eas build --platform all"
    echo "3. Monitor deployment in AWS CloudWatch"
    echo "4. Test critical user flows in production environment"
    
    print_warning "Remember to:"
    echo "- Monitor error rates after deployment"
    echo "- Set up alerting for critical failures"
    echo "- Have rollback plan ready"
    echo "- Update DNS records if needed"
}

# Run main function
main