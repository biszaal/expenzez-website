# Expenzez - System Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Database Architecture](#database-architecture)
6. [AWS Infrastructure](#aws-infrastructure)
7. [Authentication & Security](#authentication--security)
8. [Data Flow](#data-flow)
9. [API Structure](#api-structure)
10. [Key Features Implementation](#key-features-implementation)

---

## Overview

**Expenzez** is a full-stack expense tracking and financial management application that provides AI-powered insights, budget tracking, and comprehensive transaction management for UK users.

### Technology Stack

**Frontend (Mobile App)**
- React Native with Expo SDK 53
- TypeScript
- Expo Router (file-based routing)
- NativeWind (Tailwind CSS for React Native)
- React Context for state management
- Axios for API communication

**Backend**
- Node.js with Express.js
- TypeScript
- AWS Lambda Functions (Serverless Framework)
- AWS DynamoDB (NoSQL Database)
- AWS Cognito (Authentication)
- AWS API Gateway (API Management)

**Website**
- React with TypeScript
- Custom CSS (no Tailwind utilities)
- React Router
- Create React App with Craco

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  React Native    │              │  React Website   │        │
│  │  Mobile App      │              │  (Marketing)     │        │
│  │  (iOS/Android)   │              │                  │        │
│  └────────┬─────────┘              └────────┬─────────┘        │
│           │                                  │                  │
└───────────┼──────────────────────────────────┼──────────────────┘
            │                                  │
            │         HTTPS/REST API           │
            │                                  │
┌───────────┼──────────────────────────────────┼──────────────────┐
│           │         API LAYER                │                  │
├───────────┴──────────────────────────────────┴──────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           AWS API Gateway (eu-west-2)                  │    │
│  └─────────────────────┬──────────────────────────────────┘    │
│                        │                                        │
│         ┌──────────────┴──────────────┐                        │
│         │                              │                        │
│  ┌──────▼────────┐            ┌───────▼────────┐              │
│  │  Express.js   │            │  AWS Lambda    │              │
│  │  REST API     │            │  Functions     │              │
│  │  (Port 3001)  │            │  (Serverless)  │              │
│  └──────┬────────┘            └───────┬────────┘              │
│         │                              │                        │
└─────────┼──────────────────────────────┼────────────────────────┘
          │                              │
          │        Business Logic        │
          │                              │
┌─────────┼──────────────────────────────┼────────────────────────┐
│         │         SERVICE LAYER        │                        │
├─────────┴──────────────────────────────┴────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐        │
│  │  AWS        │  │  AI Service  │  │  Notification  │        │
│  │  Cognito    │  │  (Custom)    │  │  Service       │        │
│  └─────────────┘  └──────────────┘  └────────────────┘        │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────┼───────────────────────────────────┐
│         DATA LAYER           │                                   │
├──────────────────────────────┴───────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              AWS DynamoDB (eu-west-2)                  │    │
│  │  ┌────────────┐ ┌──────────────┐ ┌───────────────┐   │    │
│  │  │   Users    │ │ Transactions │ │ AIChatHistory │   │    │
│  │  └────────────┘ └──────────────┘ └───────────────┘   │    │
│  │  ┌────────────┐ ┌──────────────┐ ┌───────────────┐   │    │
│  │  │  Budgets   │ │ Notifications│ │     Cache     │   │    │
│  │  └────────────┘ └──────────────┘ └───────────────┘   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Mobile App Structure (expenzez-frontend/)

```
expenzez-frontend/
├── app/                          # Expo Router - File-based routing
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Dashboard (Home)
│   │   ├── transactions.tsx     # Transactions list
│   │   ├── budgets.tsx          # Budget management
│   │   ├── ai.tsx               # AI Assistant chat
│   │   └── settings.tsx         # App settings
│   ├── auth/                     # Authentication screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── onboarding/               # First-time user flow
│   └── _layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   ├── TransactionCard.tsx
│   ├── BudgetCard.tsx
│   ├── AIMessage.tsx
│   └── charts/
├── services/                     # Business logic & API
│   ├── api.ts                   # Axios instance & interceptors
│   ├── authService.ts           # Authentication logic
│   ├── transactionService.ts    # Transaction operations
│   ├── budgetService.ts         # Budget operations
│   └── aiService.ts             # AI chat integration
├── context/                      # Global state management
│   ├── ThemeContext.tsx         # Light/Dark mode
│   ├── AuthContext.tsx          # User authentication state
│   ├── NotificationContext.tsx  # Push notifications
│   └── SecurityContext.tsx      # Biometric/PIN security
├── utils/                        # Helper functions
│   ├── formatters.ts            # Date/currency formatting
│   ├── validators.ts            # Form validation
│   └── storage.ts               # AsyncStorage helpers
└── config/
    └── api.ts                    # API base URL configuration
```

### Key Frontend Components

#### 1. **Routing (Expo Router)**
- File-based routing in `app/` directory
- Tab navigator for main screens
- Stack navigators for nested flows
- Deep linking support

#### 2. **State Management**
```typescript
// Context-based state management
- ThemeContext: Theme switching (light/dark)
- AuthContext: User session, token management
- NotificationContext: Push notification handling
- SecurityContext: Biometric/PIN authentication
```

#### 3. **API Client (Axios)**
```typescript
// services/api.ts
- Base URL: Production AWS API Gateway
- Automatic token refresh on 401
- Request/response interceptors
- 30-second timeout
- Response caching
```

#### 4. **UI Framework**
- Custom components with NativeWind
- Consistent design system
- Purple/blue gradient theme (#7c3aed, #3b82f6)
- Responsive layouts for iOS/Android

---

## Backend Architecture

### Dual Deployment Strategy

The backend uses a **hybrid architecture** with both Express.js and AWS Lambda:

1. **Express.js Server** - For development and flexible hosting
2. **AWS Lambda Functions** - For production serverless deployment

### Express.js API Structure (expenzez-backend/src/)

```
expenzez-backend/src/
├── server.ts                     # Express app entry point
├── routes/
│   ├── authRoutes.ts            # /api/auth/*
│   ├── profileRoutes.ts         # /api/profile/*
│   ├── transactionRoutes.ts     # /api/transactions/*
│   ├── bankingRoutes.ts         # /api/banking/*
│   ├── budgetRoutes.ts          # /api/budgets/*
│   ├── aiRoutes.ts              # /api/ai/*
│   └── notificationRoutes.ts    # /api/notifications/*
├── controllers/
│   ├── authController.ts        # Authentication logic
│   ├── transactionController.ts # Transaction CRUD
│   ├── budgetController.ts      # Budget management
│   ├── aiController.ts          # AI assistant logic
│   └── notificationController.ts# Push notification handling
├── middleware/
│   ├── authMiddleware.ts        # JWT verification
│   ├── errorHandler.ts          # Global error handling
│   └── validateRequest.ts       # Request validation
├── services/
│   ├── cognitoService.ts        # AWS Cognito integration
│   ├── dynamoService.ts         # DynamoDB operations
│   ├── aiService.ts             # AI insights generation
│   └── notificationService.ts   # Notification processing
└── utils/
    ├── dynamodbClient.ts        # DynamoDB client setup
    └── validators.ts            # Data validation
```

### AWS Lambda Functions (expenzez-backend/functions/)

```
functions/
├── auth/
│   ├── register.ts              # User registration
│   ├── login.ts                 # User login
│   └── refresh.ts               # Token refresh
├── transactions/
│   ├── create.ts                # Add transaction
│   ├── list.ts                  # List user transactions
│   ├── update.ts                # Update transaction
│   └── delete.ts                # Delete transaction
├── ai/
│   ├── chat.ts                  # AI chat endpoint
│   ├── insights.ts              # Financial insights
│   ├── history.ts               # Chat history
│   └── clear.ts                 # Clear chat history
├── notifications/
│   ├── register.ts              # Register device token
│   ├── send.ts                  # Send notification
│   └── preferences.ts           # Update preferences
└── profile/
    ├── get.ts                   # Get user profile
    ├── update.ts                # Update profile
    └── creditScore.ts           # Credit score tracking
```

### Serverless Configuration (serverless.yml)

```yaml
service: expenzez-backend
provider:
  name: aws
  runtime: nodejs18.x
  region: eu-west-2  # London
  environment:
    COGNITO_USER_POOL_ID: ${env:COGNITO_USER_POOL_ID}
    COGNITO_CLIENT_ID: ${env:COGNITO_CLIENT_ID}
    AWS_REGION: eu-west-2

functions:
  # Auth Functions
  authRegister:
    handler: functions/auth/register.handler
    events:
      - http:
          path: api/auth/register
          method: post
          cors: true

  # Transaction Functions
  transactionCreate:
    handler: functions/transactions/create.handler
    events:
      - http:
          path: api/transactions
          method: post
          cors: true
          authorizer:
            type: COGNITO_USER_POOLS
            authorizerId: ${env:COGNITO_AUTHORIZER_ID}

  # AI Functions
  aiChat:
    handler: functions/ai/chat.handler
    events:
      - http:
          path: api/ai/chat
          method: post
          cors: true
          authorizer:
            type: COGNITO_USER_POOLS
            authorizerId: ${env:COGNITO_AUTHORIZER_ID}
```

---

## Database Architecture

### AWS DynamoDB Tables (11 Tables)

#### 1. **Users Table**
```
Table Name: Users
Partition Key: userId (String)

Attributes:
- userId: Unique user identifier
- email: User email (unique)
- name: User full name
- phone: Phone number
- dateOfBirth: Date of birth
- address: User address
- profilePicture: S3 URL (if applicable)
- createdAt: Account creation timestamp
- updatedAt: Last update timestamp
- settings: User preferences (JSON)
- biometricEnabled: Boolean
- pinEnabled: Boolean
- themePreference: 'light' | 'dark'

GSI (Global Secondary Index):
- email-index: Query by email
```

#### 2. **BankConnections Table**
```
Table Name: BankConnections
Partition Key: userId (String)
Sort Key: connectionId (String)

Attributes:
- userId: User identifier
- connectionId: Unique connection ID
- bankName: Bank name
- accountType: 'checking' | 'savings' | 'credit'
- accountNumber: Last 4 digits
- balance: Current balance
- currency: GBP
- provider: 'truelayer' (future: 'finexer')
- accessToken: Encrypted token
- refreshToken: Encrypted token
- connectedAt: Connection timestamp
- lastSyncedAt: Last sync timestamp
- isActive: Boolean

GSI:
- userId-isActive-index: List active connections
```

#### 3. **Transactions Table**
```
Table Name: Transactions
Partition Key: userId (String)
Sort Key: transactionId (String)

Attributes:
- userId: User identifier
- transactionId: Unique transaction ID
- connectionId: Bank connection ID (null for manual)
- amount: Transaction amount (Number)
- currency: GBP
- type: 'income' | 'expense'
- category: Spending category
- description: Transaction description
- merchantName: Merchant name
- date: Transaction date
- isManual: Boolean
- createdAt: Record creation timestamp
- updatedAt: Last update timestamp

GSI:
- userId-date-index: Query by user and date range
- category-index: Query by category
```

#### 4. **AIChatHistory Table**
```
Table Name: AIChatHistory
Partition Key: userId (String)
Sort Key: messageId (String)

Attributes:
- userId: User identifier
- messageId: Unique message ID
- role: 'user' | 'assistant'
- content: Message text
- timestamp: Message timestamp
- sessionId: Chat session identifier
- ttl: Time-to-live (auto-delete after 30 days)

GSI:
- userId-timestamp-index: Retrieve chat history chronologically
```

#### 5. **NotificationTokens Table**
```
Table Name: NotificationTokens
Partition Key: userId (String)
Sort Key: deviceId (String)

Attributes:
- userId: User identifier
- deviceId: Unique device ID
- token: Expo push notification token
- platform: 'ios' | 'android'
- registeredAt: Registration timestamp
- lastUsedAt: Last notification timestamp
- isActive: Boolean
```

#### 6. **NotificationPreferences Table**
```
Table Name: NotificationPreferences
Partition Key: userId (String)

Attributes:
- userId: User identifier
- transactionAlerts: Boolean
- budgetAlerts: Boolean
- aiInsights: Boolean
- weeklyReport: Boolean
- monthlyReport: Boolean
- quietHoursStart: String (HH:mm)
- quietHoursEnd: String (HH:mm)
```

#### 7. **NotificationQueue Table**
```
Table Name: NotificationQueue
Partition Key: notificationId (String)

Attributes:
- notificationId: Unique notification ID
- userId: User identifier
- title: Notification title
- body: Notification body
- data: Additional data (JSON)
- status: 'pending' | 'sent' | 'failed'
- scheduledFor: Scheduled timestamp
- sentAt: Sent timestamp
- error: Error message (if failed)
```

#### 8. **NotificationHistory Table**
```
Table Name: NotificationHistory
Partition Key: userId (String)
Sort Key: notificationId (String)

Attributes:
- userId: User identifier
- notificationId: Unique notification ID
- title: Notification title
- body: Notification body
- sentAt: Sent timestamp
- wasRead: Boolean
- readAt: Read timestamp
- ttl: Auto-delete after 90 days
```

#### 9. **UserBudgets Table**
```
Table Name: UserBudgets
Partition Key: userId (String)
Sort Key: budgetId (String)

Attributes:
- userId: User identifier
- budgetId: Unique budget ID
- category: Budget category
- amount: Budget limit
- period: 'weekly' | 'monthly' | 'yearly'
- startDate: Period start date
- endDate: Period end date
- currentSpent: Current spending amount
- isActive: Boolean
- createdAt: Creation timestamp
- updatedAt: Last update timestamp

GSI:
- userId-isActive-index: List active budgets
```

#### 10. **BudgetAlerts Table**
```
Table Name: BudgetAlerts
Partition Key: budgetId (String)
Sort Key: alertId (String)

Attributes:
- budgetId: Budget identifier
- alertId: Unique alert ID
- threshold: Percentage threshold (50, 75, 90, 100)
- triggered: Boolean
- triggeredAt: Timestamp when triggered
- notificationSent: Boolean
```

#### 11. **Cache Table**
```
Table Name: Cache
Partition Key: cacheKey (String)

Attributes:
- cacheKey: Cache identifier
- data: Cached data (JSON)
- ttl: Expiration timestamp
- createdAt: Cache creation timestamp

Purpose: API response caching for improved performance
```

---

## AWS Infrastructure

### AWS Services Used

#### 1. **AWS Cognito (Authentication)**
```
Service: AWS Cognito User Pools
Region: eu-west-2 (London)

Configuration:
- User Pool ID: COGNITO_USER_POOL_ID
- App Client ID: COGNITO_CLIENT_ID
- Password Policy: Minimum 8 characters, uppercase, lowercase, numbers
- MFA: Optional (SMS/TOTP)
- Email Verification: Required
- Token Expiration: Access (1 hour), Refresh (30 days)

Features:
- User registration and login
- Password reset flow
- Email verification
- JWT token generation
- Token refresh mechanism
```

#### 2. **AWS DynamoDB (Database)**
```
Service: DynamoDB
Region: eu-west-2 (London)

Configuration:
- Billing Mode: On-Demand (pay per request)
- Encryption: At rest with AWS managed keys
- Point-in-time Recovery: Enabled
- Global Secondary Indexes: Multiple GSIs per table
- Time-to-Live (TTL): Enabled for chat history and notifications

Performance:
- Single-digit millisecond latency
- Automatic scaling
- Multi-AZ replication
```

#### 3. **AWS API Gateway**
```
Service: API Gateway (REST API)
Region: eu-west-2 (London)

Configuration:
- Protocol: HTTPS only
- CORS: Enabled for all origins
- Authorization: Cognito User Pools
- Throttling: 10,000 requests per second
- Caching: Enabled for GET requests
- Deployment Stage: production

Endpoints:
- Base URL: https://api.expenzez.com
- All endpoints under /api/* prefix
```

#### 4. **AWS Lambda (Serverless Functions)**
```
Service: AWS Lambda
Region: eu-west-2 (London)
Runtime: Node.js 18.x

Configuration:
- Memory: 512 MB (default)
- Timeout: 30 seconds
- Environment Variables: COGNITO_*, AWS_REGION
- VPC: None (public Lambda)
- Execution Role: Full DynamoDB and Cognito access

Deployment:
- Framework: Serverless Framework
- Package: Individual function packaging
- Versioning: Enabled
```

#### 5. **AWS IAM (Access Management)**
```
Roles:
- Lambda Execution Role: DynamoDB + Cognito access
- API Gateway Invocation Role: Lambda invocation

Policies:
- DynamoDB: PutItem, GetItem, Query, Scan, UpdateItem, DeleteItem
- Cognito: AdminCreateUser, AdminGetUser, AdminUpdateUserAttributes
- CloudWatch Logs: CreateLogGroup, CreateLogStream, PutLogEvents
```

---

## Authentication & Security

### Authentication Flow

```
┌─────────────┐
│   User      │
│ (Mobile App)│
└──────┬──────┘
       │
       │ 1. Register/Login
       ▼
┌──────────────────┐
│  AWS Cognito     │
│  User Pool       │
└──────┬───────────┘
       │
       │ 2. Return JWT Tokens
       │    - Access Token (1 hour)
       │    - Refresh Token (30 days)
       │    - ID Token
       ▼
┌──────────────────┐
│  Mobile App      │
│  (AsyncStorage)  │
└──────┬───────────┘
       │
       │ 3. API Request with Access Token
       │    Authorization: Bearer <access_token>
       ▼
┌──────────────────┐
│  API Gateway     │
│  (Cognito        │
│   Authorizer)    │
└──────┬───────────┘
       │
       │ 4. Validate Token
       │
       ▼
┌──────────────────┐
│  Lambda Function │
│  or Express API  │
└──────┬───────────┘
       │
       │ 5. Return Response
       ▼
┌──────────────────┐
│  Mobile App      │
└──────────────────┘

Token Refresh Flow (when Access Token expires):
────────────────────────────────────────────────
1. API returns 401 Unauthorized
2. App automatically calls /api/auth/refresh with Refresh Token
3. Cognito returns new Access Token
4. App retries original request with new token
```

### Security Measures

#### 1. **Data Encryption**
```
In Transit:
- All API calls over HTTPS/TLS 1.3
- Certificate pinning (future enhancement)

At Rest:
- DynamoDB encryption with AWS KMS
- Banking tokens encrypted before storage
- Sensitive data never logged
```

#### 2. **App-Level Security**
```
Biometric Authentication:
- Face ID / Touch ID (iOS)
- Fingerprint / Face Unlock (Android)

PIN Protection:
- 6-digit PIN
- 3 failed attempts = temporary lockout
- Stored securely in device keychain

Session Management:
- Auto-logout after 15 minutes of inactivity
- Forced re-authentication for sensitive actions
```

#### 3. **API Security**
```
Rate Limiting:
- API Gateway: 10,000 requests/second
- Per-user: 100 requests/minute

Input Validation:
- Request schema validation
- SQL injection prevention (N/A for DynamoDB)
- XSS prevention

Authorization:
- JWT token verification on every request
- User-specific data isolation (userId partition key)
```

---

## Data Flow

### Transaction Creation Flow

```
┌──────────────┐
│  User adds   │
│  transaction │
│  in app      │
└──────┬───────┘
       │
       │ POST /api/transactions
       │ Body: { amount, type, category, description, date }
       ▼
┌──────────────────────┐
│  API Gateway         │
│  (Validate Token)    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Lambda Function     │
│  (create.ts)         │
└──────┬───────────────┘
       │
       │ 1. Validate request data
       │ 2. Generate transactionId
       │ 3. Set isManual = true
       ▼
┌──────────────────────┐
│  DynamoDB            │
│  Transactions Table  │
└──────┬───────────────┘
       │
       │ PutItem operation
       ▼
┌──────────────────────┐
│  Lambda Function     │
└──────┬───────────────┘
       │
       │ 4. Check if transaction affects budget
       │ 5. Query UserBudgets table
       ▼
┌──────────────────────┐
│  Update budget       │
│  currentSpent        │
└──────┬───────────────┘
       │
       │ 6. Check budget thresholds (50%, 75%, 90%, 100%)
       │ 7. If threshold crossed, create notification
       ▼
┌──────────────────────┐
│  NotificationQueue   │
│  table               │
└──────┬───────────────┘
       │
       │ 8. Return success response
       ▼
┌──────────────────────┐
│  Mobile App          │
│  - Update UI         │
│  - Show confirmation │
└──────────────────────┘
```

### AI Chat Flow

```
┌──────────────┐
│  User sends  │
│  message to  │
│  AI assistant│
└──────┬───────┘
       │
       │ POST /api/ai/chat
       │ Body: { message }
       ▼
┌──────────────────────┐
│  API Gateway         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Lambda Function     │
│  (ai/chat.ts)        │
└──────┬───────────────┘
       │
       │ 1. Save user message to AIChatHistory
       ▼
┌──────────────────────┐
│  DynamoDB            │
│  AIChatHistory       │
└──────────────────────┘
       │
       │ 2. Retrieve recent transactions
       ▼
┌──────────────────────┐
│  DynamoDB            │
│  Transactions        │
└──────┬───────────────┘
       │
       │ 3. Retrieve budgets
       ▼
┌──────────────────────┐
│  DynamoDB            │
│  UserBudgets         │
└──────┬───────────────┘
       │
       │ 4. Generate AI response
       │    - Analyze user question
       │    - Pattern matching for financial advice
       │    - Calculate spending insights
       │    - Provide personalized recommendations
       ▼
┌──────────────────────┐
│  AI Service          │
│  (Custom Logic)      │
└──────┬───────────────┘
       │
       │ 5. Save AI response to AIChatHistory
       ▼
┌──────────────────────┐
│  DynamoDB            │
│  AIChatHistory       │
└──────┬───────────────┘
       │
       │ 6. Return response
       ▼
┌──────────────────────┐
│  Mobile App          │
│  - Display message   │
│  - Update chat UI    │
└──────────────────────┘
```

---

## API Structure

### Authentication Endpoints

```
POST /api/auth/register
Request: { email, password, name, phone, dateOfBirth }
Response: { userId, email, message }

POST /api/auth/login
Request: { email, password }
Response: { accessToken, refreshToken, idToken, user }

POST /api/auth/refresh
Request: { refreshToken }
Response: { accessToken }

POST /api/auth/logout
Request: { accessToken }
Response: { message }

POST /api/auth/forgot-password
Request: { email }
Response: { message }

POST /api/auth/reset-password
Request: { email, code, newPassword }
Response: { message }
```

### Transaction Endpoints

```
GET /api/transactions
Query: ?limit=50&offset=0&category=food&startDate=2024-01-01&endDate=2024-12-31
Response: { transactions: [...], total, hasMore }

POST /api/transactions
Request: { amount, type, category, description, date, merchantName }
Response: { transaction: {...}, message }

GET /api/transactions/:transactionId
Response: { transaction: {...} }

PUT /api/transactions/:transactionId
Request: { amount?, category?, description?, date? }
Response: { transaction: {...}, message }

DELETE /api/transactions/:transactionId
Response: { message }

GET /api/transactions/stats
Query: ?startDate=2024-01-01&endDate=2024-12-31
Response: { totalIncome, totalExpenses, byCategory: {...} }
```

### Budget Endpoints

```
GET /api/budgets
Response: { budgets: [...] }

POST /api/budgets
Request: { category, amount, period, startDate }
Response: { budget: {...}, message }

GET /api/budgets/:budgetId
Response: { budget: {...}, currentSpent, percentageUsed }

PUT /api/budgets/:budgetId
Request: { amount?, period?, isActive? }
Response: { budget: {...}, message }

DELETE /api/budgets/:budgetId
Response: { message }
```

### AI Endpoints

```
POST /api/ai/chat
Request: { message }
Response: { response, messageId, timestamp }

GET /api/ai/chat/history
Query: ?limit=100
Response: { messages: [...] }

DELETE /api/ai/chat/history
Response: { message }

GET /api/ai/insights
Response: { insights: [...], recommendations: [...] }
```

### Profile Endpoints

```
GET /api/profile
Response: { user: {...}, stats: {...} }

PUT /api/profile
Request: { name?, phone?, address?, profilePicture? }
Response: { user: {...}, message }

GET /api/profile/credit-score
Response: { score, trend, lastUpdated }

PUT /api/profile/settings
Request: { biometricEnabled?, pinEnabled?, themePreference? }
Response: { settings: {...}, message }
```

### Notification Endpoints

```
POST /api/notifications/register
Request: { deviceId, token, platform }
Response: { message }

POST /api/notifications/unregister
Request: { deviceId }
Response: { message }

GET /api/notifications/preferences
Response: { preferences: {...} }

PUT /api/notifications/preferences
Request: { transactionAlerts?, budgetAlerts?, weeklyReport? }
Response: { preferences: {...}, message }

GET /api/notifications/history
Query: ?limit=50
Response: { notifications: [...] }
```

---

## Key Features Implementation

### 1. Transaction Management

**Components:**
- TransactionCard.tsx - Display individual transaction
- TransactionList.tsx - List all transactions with filters
- AddTransactionModal.tsx - Form to add new transaction

**Flow:**
1. User fills transaction form
2. Frontend validates input
3. POST /api/transactions
4. Backend validates and saves to DynamoDB
5. Updates related budget if applicable
6. Returns created transaction
7. Frontend updates local state and UI

**Features:**
- Manual transaction entry
- Categorization (Food, Transport, Entertainment, etc.)
- Income vs Expense tracking
- Date selection
- Amount input with currency formatting
- Merchant name

### 2. Budget Tracking

**Components:**
- BudgetCard.tsx - Display budget progress
- BudgetList.tsx - List all budgets
- CreateBudgetModal.tsx - Form to create budget

**Flow:**
1. User creates budget for category
2. Backend saves to UserBudgets table
3. On each transaction, backend updates currentSpent
4. Backend checks thresholds (50%, 75%, 90%, 100%)
5. If threshold crossed, notification is queued
6. Frontend displays progress bars and alerts

**Features:**
- Category-based budgets
- Period selection (weekly, monthly, yearly)
- Real-time progress tracking
- Threshold alerts
- Budget recommendations from AI

### 3. AI Financial Assistant

**Components:**
- AIChat.tsx - Chat interface
- AIMessage.tsx - Individual message bubble
- AIInputBar.tsx - Message input

**Implementation:**
- Custom AI logic (no external API required)
- Pattern matching for common financial questions
- Contextual responses based on user's data
- Chat history stored with 30-day TTL
- Real-time transaction and budget analysis

**Sample Interactions:**
```
User: "How much did I spend on food this month?"
AI: "You spent £450 on food this month, which is 15% more than last month.
     Your food budget is £400, so you're £50 over budget."

User: "Should I increase my savings?"
AI: "Based on your income and expenses, you have £200 leftover each month.
     I recommend increasing your savings by £100 and keeping £100 for
     unexpected expenses."
```

### 4. Push Notifications

**Implementation:**
- Expo Push Notifications
- Device token registration on app launch
- Background notification processing
- Notification preferences management
- Quiet hours support

**Notification Types:**
1. Transaction alerts (new transaction detected)
2. Budget alerts (threshold crossed)
3. Weekly spending summary
4. Monthly financial report
5. AI insights and tips

**Flow:**
1. Event triggers notification (e.g., budget threshold)
2. Notification added to NotificationQueue
3. Background Lambda processes queue
4. Retrieves user's device tokens
5. Sends via Expo Push Notification service
6. Logs to NotificationHistory

### 5. Credit Score Tracking

**Components:**
- CreditScoreCard.tsx - Display score with trend
- CreditScoreHistory.tsx - Historical chart

**Implementation:**
- Score stored in user profile
- Monthly updates (future: API integration)
- Trend calculation (improving/declining)
- Visual representation with color coding
- Tips for improvement from AI assistant

---

## Development & Deployment

### Local Development Setup

**Frontend:**
```bash
cd expenzez-frontend
npm install
npm start  # Expo development server
```

**Backend:**
```bash
cd expenzez-backend
npm install
npm run dev  # Express server on port 3001
```

**Lambda Functions (Local Testing):**
```bash
cd expenzez-backend
npm run build:functions
serverless offline  # Test Lambda locally
```

### Production Deployment

**Frontend (Mobile App):**
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

**Backend (Lambda):**
```bash
cd expenzez-backend
npm run build:functions
serverless deploy --stage production
```

**Website:**
```bash
cd expenzez-website
npm run build
# Deploy build/ folder to hosting service (Netlify, Vercel, etc.)
```

### Environment Variables

**Frontend (.env):**
```
API_BASE_URL=https://api.expenzez.com
```

**Backend (.env):**
```
AWS_REGION=eu-west-2
COGNITO_USER_POOL_ID=eu-west-2_xxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxx  # Optional for enhanced AI
```

---

## Performance Optimization

### Caching Strategy
- API response caching in DynamoDB Cache table
- Frontend caching with AsyncStorage
- API Gateway caching for GET requests

### Database Optimization
- Global Secondary Indexes for common queries
- Efficient partition key design (userId)
- Batch operations for bulk updates
- TTL for auto-cleanup of old data

### API Optimization
- Request/response compression
- Pagination for large datasets
- Efficient Lambda function packaging
- Connection pooling (future enhancement)

---

## Monitoring & Logging

### AWS CloudWatch
- Lambda function logs
- API Gateway access logs
- Error tracking and alerts
- Performance metrics

### Application Monitoring
- Frontend error tracking (future: Sentry)
- API request/response logging
- User activity tracking
- Performance metrics

---

## Future Enhancements

1. **Banking Integration**: TrueLayer / Finexer API integration for automatic transaction sync
2. **AI Improvements**: OpenAI GPT-4 integration for more intelligent responses
3. **Investment Tracking**: Portfolio management features
4. **Bill Reminders**: Recurring payment tracking and alerts
5. **Shared Budgets**: Multi-user budget management
6. **Export Data**: PDF/CSV export of transactions and reports
7. **Web Dashboard**: Full-featured web application
8. **Android App**: Native Android version

---

**Document Version:** 1.0
**Last Updated:** 2025-10-09
**Maintained By:** Biszaal Tech Ltd.
