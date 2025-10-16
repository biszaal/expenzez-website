# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Production App Status

**🚨 THE APP IS LIVE ON THE APP STORE 🚨**

This application is currently deployed in production with real users. Exercise extreme caution when making changes, especially to the backend.

### Branch Strategy

#### Frontend Repository (`expenzez-frontend/`)
- **`main`** - 🔴 **PRODUCTION BRANCH** (Live on App Store)
  - Current features: Manual transaction entry + CSV import
  - DO NOT merge unfinished features to this branch
  - All changes must be thoroughly tested before merging

- **`finexer-integration`** - 🟡 **DEVELOPMENT BRANCH** (Active Development)
  - New feature: Finexer Open Banking API integration
  - Not yet deployed to production
  - Safe for experimental changes

#### Backend Repository (`expenzez-backend/`)
- **`main`** - 🔴 **PRODUCTION BRANCH** (Serving live app)
  - **⚠️ EXTREMELY SENSITIVE**: Changes here affect all production users immediately
  - Current features: Manual transaction entry + CSV import
  - Always test locally before deploying
  - Consider impact on live users before any Lambda deployment

- **`finexer-integration`** - 🟡 **DEVELOPMENT BRANCH** (Active Development)
  - New feature: Finexer Open Banking API integration
  - Not yet connected to production
  - Safe for experimental changes

- **`development`** - 🟢 **GENERAL DEVELOPMENT BRANCH**
  - Used for general backend development work

### Production Safety Guidelines

**BEFORE making ANY backend changes:**
1. ✅ Verify you're on the correct branch (`main` for production fixes, `finexer-integration` for new features)
2. ✅ Test changes locally using `serverless offline`
3. ✅ Consider the impact on existing production users
4. ✅ Review all Lambda function changes carefully
5. ✅ Check DynamoDB table permissions and access patterns
6. ✅ Verify environment variables are correct for each environment

**Production Bug Fixes:**
- Always fix production bugs on the `main` branch
- Test thoroughly in local environment first
- Deploy during low-usage hours when possible
- Monitor CloudWatch logs after deployment
- Keep fixes isolated and minimal

**New Features:**
- Develop new features on `finexer-integration` or feature branches
- NEVER merge incomplete features to `main`
- Thoroughly test integration before merging to production

### Current Development Status

**Production App (`main` branch):**
- ✅ Live on App Store
- ✅ Manual transaction entry
- ✅ CSV import functionality
- ✅ AI-powered insights
- ✅ Budget tracking
- ✅ Premium subscriptions (RevenueCat)
- 🐛 Currently has bug reports that need fixing

**In Development (`finexer-integration` branch):**
- 🔨 Finexer Open Banking API integration
- 🔨 Automatic bank transaction sync
- 🔨 Multi-bank connections
- 🔨 Real-time account balance updates
- ⏳ Not yet deployed to production

## Project Overview

Expenzez is a full-stack expense tracking mobile application built with React Native (Expo) frontend and Node.js/TypeScript backend. The app provides AI-powered financial insights, budget tracking, and comprehensive transaction management.

**Current Production Version:** Manual transaction entry + CSV import + AI insights
**In Development:** Open Banking integration via Finexer API

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
- **AI Features**: Custom AI service providing financial insights
- **API Design**: RESTful endpoints under `/api/` prefix

### Key Features

**Production Features (Live on App Store):**
- **Manual Transactions**: User-entered transaction entry and categorization
- **CSV Import**: Bulk transaction import from CSV files
- **AI Assistant**: Chat-based financial advisor with personalized insights
- **Budgets**: Create and track spending budgets with alerts
- **Credit Score**: Monitor credit score changes (manual entry)
- **Notifications**: Push notifications for transactions and budget alerts
- **Security**: Biometric authentication and PIN protection
- **Premium Subscriptions**: RevenueCat integration for premium features

**In Development (finexer-integration branch):**
- **Open Banking**: Finexer API integration for automatic bank connections
- **Bank Sync**: Automatic transaction synchronization from connected banks
- **Real-time Balances**: Live account balance updates
- **Multi-bank Support**: Connect multiple bank accounts simultaneously

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
- `transactions/` - Transaction processing and management
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
- `OPENAI_API_KEY` - For enhanced AI features (optional)
- `AWS_REGION` - Set to `eu-west-2` (London)

## Development Workflow

### ⚠️ CRITICAL: Production vs Development Workflow

**For Production Bug Fixes (`main` branch):**
1. ✅ Switch to `main` branch in both repositories
2. ✅ Create a feature branch from `main` (e.g., `fix/transaction-bug`)
3. ✅ Make minimal, targeted changes
4. ✅ Test thoroughly in local environment
5. ✅ Merge to `main` after testing
6. ✅ Deploy carefully during low-usage hours
7. ✅ Monitor CloudWatch logs after deployment

**For New Features (`finexer-integration` or feature branches):**
1. ✅ Work on `finexer-integration` or create new feature branch
2. ✅ Develop freely without worrying about production impact
3. ✅ Test thoroughly before merging
4. ✅ Keep branch up-to-date with `main`
5. ✅ Only merge to `main` when feature is 100% complete and tested

### Making Changes
1. **Frontend**: Edit files in `app/`, `components/`, or `services/`
2. **Backend**: Modify `src/` for Express server or `functions/` for Lambda
3. **Database**: Update table schemas in `src/utils/dynamodbClient.ts`

**⚠️ Backend Changes Checklist:**
- [ ] Verified I'm on the correct branch
- [ ] Tested locally with `serverless offline`
- [ ] Considered impact on existing users
- [ ] Reviewed all Lambda function changes
- [ ] Checked DynamoDB permissions
- [ ] Verified environment variables
- [ ] Ready to monitor CloudWatch logs after deployment

### Testing Strategy
- **Frontend**: Use Expo Go app or simulators for rapid testing
- **Backend**: Local Express server on port 3001 with DynamoDB tables
- **Lambda**: Use `serverless offline` for local testing
- **Integration**:
  - **Production (`main`)**: Frontend points to production AWS API Gateway
  - **Development (`finexer-integration`)**: Can test with local backend or dev environment

### Deployment Process

**Production Deployment (`main` branch):**
- **Frontend**:
  1. Test thoroughly on physical devices
  2. Build with `eas build --platform ios --profile production`
  3. Submit to App Store for review
  4. Monitor user feedback after release

- **Backend**:
  1. Test with `serverless offline` locally
  2. Deploy with `serverless deploy` (goes to production AWS)
  3. **⚠️ IMMEDIATE IMPACT**: All live users affected immediately
  4. Monitor CloudWatch logs for errors
  5. Be ready to rollback if issues occur

**Development Deployment (`finexer-integration` branch):**
- **Frontend**: Test with Expo Go or development builds
- **Backend**: Deploy to separate development environment (if configured)
- No impact on production users

## Key Implementation Details

### Authentication Flow
1. Users register/login through AWS Cognito
2. JWT tokens stored in AsyncStorage
3. Automatic token refresh via API interceptors
4. Biometric/PIN protection for app access

### Transaction Management
1. Manual transaction entry by users
2. Transaction data stored in DynamoDB
3. AI-powered categorization and insights
4. Real-time balance calculation

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

## Recent Changes & Updates

### Finexer Open Banking Integration (In Development)
The Finexer Open Banking API integration is currently being developed on the `finexer-integration` branch:
- Complete OAuth2 authorization flow implemented
- Bank account retrieval and management system built
- Transaction synchronization system for automatic data import
- Separate CloudFormation stack for banking functions deployed
- Complete backend isolation from production environment
- Mock data fallback system for development testing

**Status**: ✅ Backend deployed and working, ⏳ Frontend integration in progress

### Known Production Bugs

**✅ FIXED - Google Maps API Not Working in Production (Fixed: Oct 15, 2025)**
- **Problem**: Google Maps address autocomplete worked in Expo development but failed in production App Store builds
- **Root Cause**: `.env.production` was missing `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Fix**: Added Google Maps API key to both `.env.production` and `eas.json` production build config
- **Commit**: a122325 "Fix Google Maps API not working in production builds"
- **Next Steps**: Build new production version with `eas build --platform ios --profile production`
- **Affected Features**:
  - Personal info address search
  - Registration step 4 address lookup
  - Any address autocomplete functionality

**✅ FIXED - Registration Failing with "phone_number is not allowed to be empty" (Fixed: Oct 15, 2025)**
- **Problem**: User registration was failing even after entering valid phone number
- **Error**: "Registration validation failed: \"phone_number\" is not allowed to be empty"
- **Root Cause**: Frontend used field name `phone` but backend expected `phone_number` (with underscore)
- **Fix**: Updated all registration components to use `phone_number` consistently
- **Commit**: 3e56054 "Fix registration phone field name mismatch"
- **Affected Files**:
  - `app/auth/Register.tsx`: Changed initial state and all references
  - `app/auth/RegisterStep5.tsx`: Changed field name in form submission
- **Impact**: Registration now works correctly end-to-end

**✅ FIXED - Registration Errors Redirect to Login and Lose All User Data (Fixed: Oct 15, 2025)**
- **Problem**: When registration errors occurred (duplicate email/phone), app automatically redirected to login, losing ALL user input from 5-step form
- **User Impact**: Extremely frustrating - users had to refill entire registration form after errors
- **Fix**: Removed all automatic redirects - now shows error messages on registration page and keeps user data intact
- **Commit**: 371f3cc "Fix registration error handling - keep user data on errors"
- **New Behavior**:
  - Shows clear error message: "An account with this email already exists. If this is your account, please go to login page."
  - Keeps all user input data intact
  - Users can manually navigate to login if desired
  - Users can fix errors (e.g., try different username) without losing progress

**⚠️ Other Reported Bugs:**
- (User to provide additional bug reports if any)

**Important**: All production bug fixes should be made on the `main` branch, NOT on `finexer-integration`.

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript errors in both frontend/backend
- **API connection**: Verify AWS Lambda deployment and DynamoDB table existence
- **Transaction errors**: Check transaction validation and processing
- **Push notifications**: Ensure notification tokens are properly registered
- **AI assistant "Not Found"**: Ensure AI Lambda functions are deployed (`serverless deploy`)

### Development Tips
- Use `npm run lint` to catch common issues before testing
- Backend server auto-creates missing DynamoDB tables on startup
- Frontend has extensive logging for API calls and errors
- AI assistant works offline with transaction data already synced
- Deploy changes with `npm run build:functions && serverless deploy`

Run the lint command for both projects to ensure code quality before making significant changes.

## Important Notes

### Subscription Status Clarification
**⚠️ Note**: There is conflicting information about subscription status:
- Production app currently uses RevenueCat for subscription management
- cursor-updates.md mentions "Subscription Model Removal" in Phase 13
- Need to clarify current subscription implementation status

### Working with Git Submodules
This is a monorepo structure with separate repositories:
- Frontend: `expenzez-frontend/` (separate git repository)
- Backend: `expenzez-backend/` (separate git repository)

When making changes:
1. Always check which repository you're working in
2. Commit and push to the correct repository
3. Ensure both repositories are on the correct branch
4. Keep submodule references updated in the parent repository

### Production Monitoring
After any production deployment:
- Monitor AWS CloudWatch logs for errors
- Check error rates in CloudWatch metrics
- Watch for user-reported issues
- Be ready to rollback if critical issues occur
- Keep backup of previous working version