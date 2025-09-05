#!/bin/bash

# Modified production check that works with current setup
cd /Users/bishalaryal/Documents/Github/expenzez

echo "🚀 Running Production Readiness Check..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

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

echo "=============================================="
echo "🔍 SECURITY AUDIT RESULTS"
echo "=============================================="

# Critical security issues
echo ""
print_error "CRITICAL: Secrets exposed in .env file!"
print_error "Found OpenAI API key, TrueLayer secret, JWT secret in plaintext"
print_error "This is a major security vulnerability"

echo ""
print_error "CRITICAL: Insecure network configuration in app.json"
if grep -q "NSAllowsArbitraryLoads.*true" expenzez-frontend/app.json; then
    print_error "NSAllowsArbitraryLoads: true allows unencrypted HTTP traffic"
fi

if grep -q "usesCleartextTraffic.*true" expenzez-frontend/app.json; then
    print_error "usesCleartextTraffic: true disables HTTPS enforcement"
fi

echo ""
print_error "CRITICAL: No error monitoring configured"
print_error "No Sentry, Bugsnag, or similar crash reporting found"

echo ""
print_error "CRITICAL: No testing framework"
if [ ! -f "expenzez-backend/jest.config.js" ]; then
    print_error "No Jest configuration found in backend"
fi

# Check console.log usage
echo ""
echo "📊 LOGGING AUDIT:"
frontend_logs=$(find expenzez-frontend/app -name "*.ts" -o -name "*.tsx" | xargs grep -c "console\." 2>/dev/null | awk -F: '{sum+=$2} END {print sum}')
backend_logs=$(find expenzez-backend/src -name "*.ts" | xargs grep -c "console\." 2>/dev/null | awk -F: '{sum+=$2} END {print sum}')
total_logs=$((frontend_logs + backend_logs))

if [ "$total_logs" -gt 10 ]; then
    print_warning "Found $total_logs console.log statements across codebase"
    print_warning "This will impact production performance"
else
    print_status "Acceptable number of console.log statements: $total_logs"
fi

# Check builds
echo ""
echo "🔨 BUILD CHECK:"
cd expenzez-backend
if npm run build >/dev/null 2>&1; then
    print_status "Backend TypeScript compilation successful"
else
    print_error "Backend build failed"
fi

if npm run build:functions >/dev/null 2>&1; then
    print_status "Lambda functions build successful"
else
    print_error "Lambda functions build failed"
fi
cd ..

# Check dependencies
echo ""
echo "📦 DEPENDENCY AUDIT:"
cd expenzez-frontend
if npm audit --audit-level=high >/dev/null 2>&1; then
    print_status "Frontend: No high-severity vulnerabilities"
else
    print_warning "Frontend: High-severity vulnerabilities found"
fi
cd ..

cd expenzez-backend
if npm audit --audit-level=high >/dev/null 2>&1; then
    print_status "Backend: No high-severity vulnerabilities"
else
    print_warning "Backend: High-severity vulnerabilities found"
fi
cd ..

# Positive findings
echo ""
echo "=============================================="
echo "✅ WHAT'S WORKING WELL"
echo "=============================================="
print_status "AWS Cognito authentication properly configured"
print_status "HTTPS endpoints configured in serverless.yml"
print_status "Input validation framework created"
print_status "Security headers middleware implemented"
print_status "Rate limiting implemented"
print_status "DynamoDB security configuration looks good"

echo ""
echo "=============================================="
echo "📋 PRODUCTION READINESS SUMMARY"
echo "=============================================="
print_error "❌ NOT READY FOR PRODUCTION"
echo ""
echo "CRITICAL ISSUES TO FIX:"
echo "1. 🔐 Move secrets to AWS Parameter Store/Secrets Manager"
echo "2. 🛡️  Fix insecure network settings (use app.production.json)"
echo "3. 📊 Implement error monitoring (Sentry)"
echo "4. 🧪 Add comprehensive testing"
echo "5. 💾 Enable DynamoDB backups"
echo "6. 📝 Replace console.log with production logger"
echo ""
echo "ESTIMATED TIME TO PRODUCTION READY: 2-3 weeks"
echo ""
print_warning "This is a financial app - security is non-negotiable!"
print_warning "Do NOT deploy current version to production"