# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expenzez is a full-stack expense tracking mobile application built with React Native (Expo) frontend and Node.js/TypeScript backend. The app provides banking integration, AI-powered financial insights, budget tracking, and comprehensive transaction management.

## Repository Structure

This is a monorepo containing two main applications:

- **`expenzez-frontend/`** - React Native mobile app using Expo Router
- **`expenzez-backend/`** - Express.js API server with AWS Lambda functions

## Development Commands

### Frontend (React Native/Expo)
```bash
cd expenzez-frontend
npm install
npm start                    # Start Expo development server
npm run android             # Run on Android emulator
npm run ios                 # Run on iOS simulator
npm run web                 # Run in web browser
npm run lint                # Run ESLint
npm run reset-project       # Reset to blank Expo project
```

### Backend (Express.js/Node.js)
```bash
cd expenzez-backend
npm install
npm run dev                 # Start development server with hot reload
npm run build               # Compile TypeScript to JavaScript
npm start                   # Start production server
npm run build:functions     # Build Lambda functions
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint issues automatically
npm run format              # Format code with Prettier
serverless deploy           # Deploy Lambda functions to AWS
serverless offline          # Run Lambda functions locally
```

## Architecture Overview

### Frontend Architecture
- **Framework**: React Native with Expo SDK 53
- **Routing**: Expo Router with file-based routing in `app/` directory
- **State Management**: React Context for theme, auth, notifications, and security
- **UI Framework**: Custom components with NativeWind (Tailwind CSS for React Native)
- **Navigation**: Tab-based navigation with nested stack navigators
- **API Client**: Axios with automatic token refresh and caching

### Backend Architecture
- **Dual Deployment**: Express.js server + AWS Lambda functions
- **Database**: AWS DynamoDB with 11+ tables for different data types
- **Authentication**: AWS Cognito with JWT tokens
- **Banking Integration**: TrueLayer API for UK bank connections
- **AI Features**: Custom AI service providing financial insights
- **API Design**: RESTful endpoints under `/api/` prefix

### Key Features
- **Banking**: Connect multiple UK bank accounts via TrueLayer OAuth
- **Transactions**: Automated transaction sync and categorization
- **AI Assistant**: Chat-based financial advisor with personalized insights
- **Budgets**: Create and track spending budgets with alerts
- **Credit Score**: Monitor credit score changes
- **Notifications**: Push notifications for transactions and budget alerts
- **Security**: Biometric authentication and PIN protection

## Database Schema (DynamoDB)

The application uses the following DynamoDB tables:
- `Users` - User profiles and settings
- `BankConnections` - Connected bank account details
- `Transactions` - All financial transactions
- `AIChatHistory` - AI assistant conversation history
- `NotificationTokens` - Push notification device tokens
- `NotificationPreferences` - User notification settings
- `NotificationQueue` - Pending notifications
- `NotificationHistory` - Sent notification log
- `UserBudgets` - User-defined spending budgets
- `BudgetAlerts` - Budget alert configurations
- `Cache` - API response caching

## API Endpoints

### Core API Routes (`/api/`)
- `/auth/*` - User authentication (register, login, refresh)
- `/banking/*` - Bank connections and transactions
- `/profile/*` - User profile management
- `/ai/*` - AI assistant chat functionality
- `/notifications/*` - Push notification management

### Lambda Functions (`functions/`)
- `auth/` - Cognito user management
- `banking/` - TrueLayer integration and transaction processing
- `notifications/` - Background notification processing
- `profile/` - User profile and credit score services

## Environment Configuration

### Frontend Config
- API base URL configured in `config/api.ts`
- Currently points to production AWS API Gateway
- Uses 30-second timeout for API calls

### Backend Environment Variables
Key variables required for backend operation:
- `COGNITO_USER_POOL_ID` & `COGNITO_CLIENT_ID` - AWS Cognito authentication
- `TRUELAYER_CLIENT_ID` & `TRUELAYER_CLIENT_SECRET` - Banking API access
- `OPENAI_API_KEY` - For enhanced AI features (optional)
- `AWS_REGION` - Set to `eu-west-2` (London)

## Development Workflow

### Making Changes
1. **Frontend**: Edit files in `app/`, `components/`, or `services/`
2. **Backend**: Modify `src/` for Express server or `functions/` for Lambda
3. **Database**: Update table schemas in `src/utils/dynamodbClient.ts`

### Testing Strategy
- Frontend: Use Expo Go app or simulators for rapid testing
- Backend: Local Express server on port 3001 with DynamoDB tables
- Lambda: Use `serverless offline` for local testing
- Integration: Frontend points to production API by default

### Deployment Process
- **Frontend**: Deploy via EAS Build for app stores
- **Backend Express**: Deploy to any Node.js hosting service
- **Lambda Functions**: Deploy via Serverless Framework to AWS

## Key Implementation Details

### Authentication Flow
1. Users register/login through AWS Cognito
2. JWT tokens stored in AsyncStorage
3. Automatic token refresh via API interceptors
4. Biometric/PIN protection for app access

### Banking Integration
1. OAuth flow through TrueLayer for bank consent
2. Account and transaction data synced to DynamoDB
3. Background refresh jobs maintain data freshness
4. Fallback to cached data when bank tokens expire

### AI Assistant
1. Contextual responses based on user's financial data
2. Chat history persisted in DynamoDB with TTL
3. Simple pattern matching for financial advice
4. No external AI API required (self-contained logic)

### State Management
- Theme switching (light/dark mode)
- Authentication state across app lifecycle  
- Notification preferences and tokens
- Security settings (biometric/PIN)

## Recent AI Assistant Fix

The AI assistant functionality was recently fixed and deployed. The issue was missing Lambda functions for AI endpoints:
- Created `functions/ai/` directory with 4 Lambda functions
- Added AI routes to `serverless.yml` configuration  
- Fixed DynamoDB table schema for chat history
- **Temporary fallback system**: Added client-side fallback responses when backend returns 404
- Lambda deployment may still be in progress - fallback provides basic financial advice until complete

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript errors in both frontend/backend
- **API connection**: Verify AWS Lambda deployment and DynamoDB table existence
- **Banking errors**: Check TrueLayer API credentials and consent flow
- **Push notifications**: Ensure notification tokens are properly registered
- **AI assistant "Not Found"**: Ensure AI Lambda functions are deployed (`serverless deploy`)

### Development Tips
- Use `npm run lint` to catch common issues before testing
- Backend server auto-creates missing DynamoDB tables on startup
- Frontend has extensive logging for API calls and errors
- AI assistant works offline with transaction data already synced
- Deploy changes with `npm run build:functions && serverless deploy`

Run the lint command for both projects to ensure code quality before making significant changes.