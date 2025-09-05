#!/bin/bash

# Script to securely store secrets in AWS Parameter Store
# Run this once to move secrets from .env to AWS

set -e

echo "🔐 Setting up AWS Parameter Store secrets..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed${NC}"
    echo "Please install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity >/dev/null 2>&1; then
    echo -e "${RED}❌ AWS credentials not configured${NC}"
    echo "Please run: aws configure"
    exit 1
fi

# Load current .env file
if [ ! -f "expenzez-backend/.env" ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    exit 1
fi

# Read values from .env
source expenzez-backend/.env

echo "Creating AWS Parameter Store parameters..."

# Function to create secure parameter
create_parameter() {
    local param_name=$1
    local param_value=$2
    local description=$3
    
    if [ -n "$param_value" ]; then
        aws ssm put-parameter \
            --name "$param_name" \
            --value "$param_value" \
            --type "SecureString" \
            --description "$description" \
            --overwrite \
            --region "$AWS_REGION" >/dev/null 2>&1
        
        echo -e "${GREEN}✅ Created parameter: $param_name${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping empty parameter: $param_name${NC}"
    fi
}

# Create parameters
create_parameter "/expenzez/prod/cognito/user-pool-id" "$COGNITO_USER_POOL_ID" "Cognito User Pool ID"
create_parameter "/expenzez/prod/cognito/client-id" "$COGNITO_CLIENT_ID" "Cognito Client ID"
create_parameter "/expenzez/prod/truelayer/client-id" "$TRUELAYER_CLIENT_ID" "TrueLayer Client ID"
create_parameter "/expenzez/prod/truelayer/client-secret" "$TRUELAYER_CLIENT_SECRET" "TrueLayer Client Secret"
create_parameter "/expenzez/prod/jwt/secret" "$JWT_SECRET" "JWT Secret Key"
create_parameter "/expenzez/prod/openai/api-key" "$OPENAI_API_KEY" "OpenAI API Key"

echo ""
echo -e "${GREEN}✅ All secrets stored in AWS Parameter Store${NC}"
echo ""
echo "IMPORTANT: Now you should:"
echo "1. Delete the .env file or move secrets out of it"
echo "2. Add .env to .gitignore"
echo "3. Use .env.production for production deployments"
echo "4. Share .env.example with your team instead of .env"

# Create a cleaned .env file
echo ""
echo "Creating cleaned .env file..."
cat > expenzez-backend/.env.clean << EOF
# Development environment file
# Copy to .env and add your development secrets
NODE_ENV=development
PORT=3001
FRONTEND_URL=exp://192.168.1.76:8081
AWS_REGION=eu-west-2

# Add your development secrets here (DO NOT commit to git)
# COGNITO_USER_POOL_ID=
# COGNITO_CLIENT_ID=
# TRUELAYER_CLIENT_ID=
# TRUELAYER_CLIENT_SECRET=
# JWT_SECRET=
# OPENAI_API_KEY=
EOF

echo -e "${GREEN}✅ Created cleaned .env.clean file${NC}"
echo -e "${YELLOW}⚠️  Replace your .env with .env.clean after verifying secrets are in AWS${NC}"