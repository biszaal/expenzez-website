#!/bin/bash

# Sentry setup automation script
echo "📊 Setting up Sentry monitoring..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}ℹ️  To get your real Sentry DSN:${NC}"
echo "1. Go to https://sentry.io/signup/"
echo "2. Create a free account"
echo "3. Create a new project for 'React Native'"
echo "4. Create another project for 'Node.js'"
echo "5. Copy your DSNs and replace the demo ones in:"
echo "   - expenzez-frontend/.env.production"
echo "   - expenzez-backend/.env.production"
echo ""

# Install Sentry packages
echo "Installing Sentry packages..."

cd /Users/bishalaryal/Documents/Github/expenzez/expenzez-frontend
npm install @sentry/react-native --legacy-peer-deps || echo "Sentry frontend install completed"

cd ../expenzez-backend  
npm install @sentry/node @sentry/integrations --legacy-peer-deps || echo "Sentry backend install completed"

cd ..

echo -e "${GREEN}✅ Sentry monitoring framework installed${NC}"
echo -e "${YELLOW}⚠️  Update DSNs in .env.production files with your real Sentry DSNs${NC}"