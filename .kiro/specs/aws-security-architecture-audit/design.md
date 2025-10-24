# Design Document: AWS Backend Security & Architecture Audit

## Overview

This document provides a comprehensive analysis of the Expenzez AWS backend infrastructure, identifying critical security vulnerabilities, architectural inefficiencies, and proposing detailed solutions. The backend is a serverless application built on AWS Lambda, API Gateway, DynamoDB, Cognito, and other AWS services, currently serving a live production iOS app.

### Current State Summary

**Architecture Pattern:** Serverless microservices with Lambda functions behind API Gateway
**Authentication:** AWS Cognito User Pools with JWT tokens
**Database:** DynamoDB with PAY_PER_REQUEST billing
**Deployment:** Serverless Framework with CloudFormation
**Region:** eu-west-2 (London)
**Current Issues:** 
- CloudFormation resource limits (~500 resources)
- Exposed secrets in .env file
- Overly permissive IAM policies
- No environment separation (dev/staging/prod)
- CORS configured with wildcard origins
- Missing encryption at rest for some resources

## Architecture

### Current Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Mobile App (iOS)                         │
│                    (Live in App Store)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (HTTP API)                        │
│  - CORS: * (wildcard - SECURITY RISK)                          │
│  - JWT Authorizer (Cognito)                                     │
│  - ~60 Lambda function integrations                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Auth       │  │ Transactions │  │   AI/ML      │
    │   Lambdas    │  │   Lambdas    │  │   Lambdas    │
    │  (10 funcs)  │  │  (6 funcs)   │  │  (8 funcs)   │
    └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
           │                 │                  │
           │                 │                  │
           ▼                 ▼                  ▼
    ┌─────────────────────────────────────────────────┐
    │         AWS Cognito User Pool                    │
    │  - User authentication                           │
    │  - JWT token generation                          │
    │  - Apple Sign-In integration                     │
    └──────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────┐
    │              DynamoDB Tables                     │
    │  - 30+ tables (PAY_PER_REQUEST)                 │
    │  - NO encryption at rest configured             │
    │  - Wildcard IAM permissions (SECURITY RISK)     │
    │                                                  │
    │  Key Tables:                                     │
    │  • Users, Transactions, AIChatHistory           │
    │  • NotificationHistory, SecurityEvents          │
    │  • AIUsageTracking, ProactiveAlerts             │
    └──────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────┐
    │         External Services                        │
    │  • OpenAI API (for AI insights)                 │
    │  • AWS SES (email notifications)                │
    │  • AWS SNS (push notifications)                 │
    │  • RevenueCat (subscription management)         │
    └──────────────────────────────────────────────────┘
```

### Proposed Secure Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Mobile App (iOS)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS/TLS 1.3
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS WAF (NEW)                                 │
│  - Rate limiting                                                 │
│  - SQL injection protection                                      │
│  - XSS protection                                                │
│  - Geo-blocking (optional)                                       │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (HTTP API)                        │
│  - CORS: Specific origins only                                  │
│  - JWT Authorizer (Cognito)                                     │
│  - Request validation                                            │
│  - CloudWatch Logs enabled                                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Lambda     │  │   Lambda     │  │   Lambda     │
    │   (VPC)      │  │   (VPC)      │  │   (VPC)      │
    │              │  │              │  │              │
    │ - X-Ray      │  │ - X-Ray      │  │ - X-Ray      │
    │ - Secrets    │  │ - Secrets    │  │ - Secrets    │
    │   from SSM   │  │   from SSM   │  │   from SSM   │
    └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
           │                 │                  │
           └─────────────────┼──────────────────┘
                             ▼
    ┌─────────────────────────────────────────────────┐
    │         VPC Endpoints (PrivateLink)              │
    │  - DynamoDB endpoint                             │
    │  - Secrets Manager endpoint                      │
    │  - CloudWatch Logs endpoint                      │
    └──────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────┐
    │              DynamoDB Tables                     │
    │  - KMS encryption at rest (NEW)                 │
    │  - Point-in-time recovery enabled               │
    │  - Backup enabled                                │
    │  - Least-privilege IAM policies                 │
    └──────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Security Layer Components

#### 1.1 AWS Secrets Manager Integration
**Purpose:** Securely store and retrieve sensitive configuration
**Current State:** Secrets in .env file (CRITICAL VULNERABILITY)
**Proposed Solution:**

```typescript
// Secrets structure in AWS Secrets Manager
{
  "expenzez/prod/jwt": {
    "JWT_SECRET": "..."
  },
  "expenzez/prod/openai": {
    "OPENAI_API_KEY": "..."
  },
  "expenzez/prod/apple": {
    "APPLE_TEAM_ID": "...",
    "APPLE_KEY_ID": "...",
    "APPLE_PRIVATE_KEY": "...",
    "APPLE_CLIENT_ID": "...",
    "APPLE_SERVICE_ID": "..."
  },
  "expenzez/prod/revenuecat": {
    "REVENUECAT_SECRET_KEY": "...",
    "IOS_API_KEY": "...",
    "ANDROID_API_KEY": "..."
  }
}
```

**Implementation:**
- Use AWS SDK to retrieve secrets at Lambda cold start
- Cache secrets in memory for warm invocations
- Enable automatic rotation for JWT_SECRET
- Use IAM policies to restrict secret access per function

#### 1.2 IAM Policy Refinement
**Current Issue:** Wildcard permissions on DynamoDB tables
**Risk:** Any compromised Lambda can access all tables

**Current Policy (INSECURE):**
```yaml
- Effect: Allow
  Action:
    - dynamodb:*
  Resource:
    - arn:aws:dynamodb:eu-west-2:*:table/*
```

**Proposed Policy (SECURE):**
```yaml
# Auth Lambda Role
- Effect: Allow
  Action:
    - dynamodb:GetItem
    - dynamodb:PutItem
    - dynamodb:UpdateItem
  Resource:
    - arn:aws:dynamodb:eu-west-2:${AWS::AccountId}:table/Users
    - arn:aws:dynamodb:eu-west-2:${AWS::AccountId}:table/SecurityEvents
    - arn:aws:dynamodb:eu-west-2:${AWS::AccountId}:table/LoginAttempts

# Transaction Lambda Role
- Effect: Allow
  Action:
    - dynamodb:GetItem
    - dynamodb:PutItem
    - dynamodb:UpdateItem
    - dynamodb:Query
  Resource:
    - arn:aws:dynamodb:eu-west-2:${AWS::AccountId}:table/Transactions
    - arn:aws:dynamodb:eu-west-2:${AWS::AccountId}:table/Users
```

#### 1.3 CORS Configuration
**Current Issue:** Wildcard origin `*` allows any domain
**Risk:** CSRF attacks, unauthorized API access

**Current (INSECURE):**
```yaml
cors:
  allowedOrigins:
    - "*"
```

**Proposed (SECURE):**
```yaml
cors:
  allowedOrigins:
    - "https://expenzez.com"
    - "https://www.expenzez.com"
    - "https://app.expenzez.com"
    # For mobile app (if using web views)
    - "capacitor://localhost"
    - "ionic://localhost"
  allowCredentials: true
  maxAge: 300
```

### 2. Authentication & Authorization Components

#### 2.1 JWT Token Validation
**Current Implementation:** Good - using Cognito JWKS
**Enhancement Needed:** Add token revocation list

**Proposed Token Revocation Service:**
```typescript
// Store revoked tokens in DynamoDB with TTL
interface RevokedToken {
  jti: string;           // JWT ID
  userId: string;
  revokedAt: number;
  expiresAt: number;     // TTL for auto-cleanup
  reason: string;
}

// Check before processing requests
async function isTokenRevoked(jti: string): Promise<boolean> {
  const result = await ddb.get({
    TableName: 'RevokedTokens',
    Key: { jti }
  });
  return !!result.Item;
}
```

#### 2.2 Rate Limiting Enhancement
**Current State:** Basic rate limiting in code
**Issue:** No distributed rate limiting across Lambda instances

**Proposed Solution:** Use DynamoDB with conditional writes
```typescript
// Enhanced rate limiter with distributed locking
class DistributedRateLimiter {
  async checkLimit(userId: string, endpoint: string): Promise<boolean> {
    const key = `${userId}:${endpoint}:${getCurrentWindow()}`;
    
    try {
      await ddb.update({
        TableName: 'RateLimits',
        Key: { id: key },
        UpdateExpression: 'ADD requestCount :inc SET #ttl = :ttl',
        ConditionExpression: 'requestCount < :limit OR attribute_not_exists(requestCount)',
        ExpressionAttributeValues: {
          ':inc': 1,
          ':limit': RATE_LIMITS[endpoint],
          ':ttl': Math.floor(Date.now() / 1000) + 3600
        }
      });
      return true;
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') {
        return false; // Rate limit exceeded
      }
      throw error;
    }
  }
}
```

### 3. Data Storage Components

#### 3.1 DynamoDB Encryption
**Current State:** No encryption at rest configured
**Risk:** Data breach if AWS account compromised

**Proposed Configuration:**
```yaml
# In serverless.yml or CloudFormation
Resources:
  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: Users
      SSESpecification:
        SSEEnabled: true
        SSEType: KMS
        KMSMasterKeyId: !Ref ExpenzezKMSKey
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true
      
  ExpenzezKMSKey:
    Type: AWS::KMS::Key
    Properties:
      Description: Encryption key for Expenzez DynamoDB tables
      KeyPolicy:
        Statement:
          - Sid: Enable IAM User Permissions
            Effect: Allow
            Principal:
              AWS: !Sub 'arn:aws:iam::${AWS::AccountId}:root'
            Action: 'kms:*'
            Resource: '*'
          - Sid: Allow Lambda to use the key
            Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action:
              - 'kms:Decrypt'
              - 'kms:DescribeKey'
            Resource: '*'
```

#### 3.2 Sensitive Data Handling
**Issue:** PII stored in plaintext
**Proposed:** Field-level encryption for sensitive fields

```typescript
// Encrypt sensitive fields before storing
import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';

class FieldEncryption {
  private kms: KMSClient;
  private keyId: string;

  async encryptField(plaintext: string): Promise<string> {
    const result = await this.kms.send(new EncryptCommand({
      KeyId: this.keyId,
      Plaintext: Buffer.from(plaintext)
    }));
    return Buffer.from(result.CiphertextBlob!).toString('base64');
  }

  async decryptField(ciphertext: string): Promise<string> {
    const result = await this.kms.send(new DecryptCommand({
      CiphertextBlob: Buffer.from(ciphertext, 'base64')
    }));
    return Buffer.from(result.Plaintext!).toString('utf-8');
  }
}

// Usage in user data storage
async function saveUser(userData: UserData) {
  const encrypted = {
    ...userData,
    email: await fieldEncryption.encryptField(userData.email),
    phone_number: userData.phone_number 
      ? await fieldEncryption.encryptField(userData.phone_number)
      : undefined,
    address: userData.address
      ? await fieldEncryption.encryptField(userData.address)
      : undefined
  };
  
  await ddb.put({
    TableName: 'Users',
    Item: encrypted
  });
}
```

### 4. CloudFormation Resource Optimization

#### 4.1 Current Resource Count Analysis
**Problem:** Approaching 500 resource limit
**Breakdown:**
- Lambda Functions: ~60 functions × 2 resources (function + log group) = 120
- API Gateway Routes: ~60 routes × 2 (route + integration) = 120
- OPTIONS routes: ~30 × 2 = 60
- DynamoDB Tables: 30 tables = 30
- IAM Roles: ~10 = 10
- Other resources: ~160

**Total: ~500 resources**

#### 4.2 Optimization Strategies

**Strategy 1: Consolidate OPTIONS Handlers**
Instead of separate OPTIONS for each route, use a single catch-all:

```yaml
# Before (2 resources per endpoint)
authLogin:
  handler: functions/auth/login.handler
  events:
    - httpApi:
        path: /auth/login
        method: post
    - httpApi:
        path: /auth/login
        method: options

# After (1 resource, API Gateway handles OPTIONS)
authLogin:
  handler: functions/auth/login.handler
  events:
    - httpApi:
        path: /auth/login
        method: post
# API Gateway automatically handles OPTIONS with CORS config
```

**Savings: ~60 resources**

**Strategy 2: Split into Multiple Stacks**

```
expenzez-infrastructure/
├── stacks/
│   ├── core-stack.yml           # DynamoDB, KMS, VPC
│   ├── auth-stack.yml           # Auth Lambdas, Cognito
│   ├── transactions-stack.yml   # Transaction Lambdas
│   ├── ai-stack.yml             # AI/ML Lambdas
│   ├── notifications-stack.yml  # Notification Lambdas
│   └── api-gateway-stack.yml    # API Gateway (references other stacks)
```

**Strategy 3: Use Nested Stacks**
```yaml
Resources:
  AuthStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: !Sub 'https://s3.amazonaws.com/${DeploymentBucket}/auth-stack.yml'
      Parameters:
        Environment: !Ref Environment
        VpcId: !Ref VPC
```

**Strategy 4: Remove Commented-Out Functions**
Currently ~15 functions are commented out. Either:
- Delete permanently if not needed
- Move to separate "future-features" stack
- Deploy to dev environment only

**Estimated Final Count: ~350 resources** (within limits)

## Data Models

### Security Event Model
```typescript
interface SecurityEvent {
  eventId: string;           // PK
  userId: string;            // GSI
  eventType: 'login' | 'failed_login' | 'password_change' | 'suspicious_activity';
  timestamp: number;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
  };
  riskScore: number;         // 0-100
  actionTaken?: string;
  metadata: Record<string, any>;
  ttl: number;               // Auto-delete after 90 days
}
```

### Encrypted User Model
```typescript
interface User {
  userId: string;                    // PK
  username: string;
  email: string;                     // ENCRYPTED
  emailVerified: boolean;
  phone_number?: string;             // ENCRYPTED
  name?: string;
  given_name?: string;
  family_name?: string;
  birthdate?: string;                // ENCRYPTED
  address?: string;                  // ENCRYPTED
  gender?: string;
  createdAt: number;
  updatedAt: number;
  lastLoginAt?: number;
  securitySettings: {
    mfaEnabled: boolean;
    biometricEnabled: boolean;
    trustedDevices: string[];
  };
  subscriptionTier: 'free' | 'premium';
  dataRetentionConsent: boolean;
}
```

### Rate Limit Model
```typescript
interface RateLimit {
  id: string;                        // PK: userId:endpoint:window
  userId: string;
  endpoint: string;
  requestCount: number;
  windowStart: number;
  ttl: number;                       // Auto-cleanup
}
```

## Error Handling

### Current Issues
1. **Verbose Error Messages:** Exposing stack traces to clients
2. **Inconsistent Error Formats:** Different Lambdas return different error structures
3. **No Centralized Error Logging:** Errors scattered across CloudWatch

### Proposed Error Handling Strategy

#### 1. Standardized Error Response
```typescript
interface APIError {
  error: string;              // Error code (e.g., "INVALID_INPUT")
  message: string;            // User-friendly message
  requestId: string;          // For support tracking
  timestamp: number;
}

// Never include in production:
// - Stack traces
// - Internal error messages
// - Database query details
// - Environment variables
```

#### 2. Error Middleware
```typescript
export class ErrorHandler {
  static handle(error: Error, context: any): APIGatewayProxyResult {
    // Log full error details internally
    console.error('Error details:', {
      error: error.message,
      stack: error.stack,
      context: context
    });

    // Send to error tracking service
    Sentry.captureException(error);

    // Return sanitized error to client
    if (error instanceof ValidationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'VALIDATION_ERROR',
          message: 'Invalid input provided',
          requestId: context.requestId
        })
      };
    }

    if (error instanceof AuthenticationError) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: 'AUTHENTICATION_FAILED',
          message: 'Invalid credentials',
          requestId: context.requestId
        })
      };
    }

    // Generic error for unexpected issues
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
        requestId: context.requestId
      })
    };
  }
}
```

#### 3. Circuit Breaker Pattern
For external service calls (OpenAI, RevenueCat):

```typescript
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > 60000) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= 5) {
      this.state = 'OPEN';
    }
  }
}
```

## Testing Strategy

### Current State
- No automated tests
- Manual testing only
- No CI/CD pipeline

### Proposed Testing Strategy

#### 1. Unit Tests
```typescript
// Example: Rate limiter unit test
describe('RateLimiter', () => {
  it('should allow requests within limit', async () => {
    const limiter = new RateLimiter();
    const result = await limiter.checkLimit('user123', 'auth');
    expect(result.allowed).toBe(true);
  });

  it('should block requests exceeding limit', async () => {
    const limiter = new RateLimiter();
    // Make 6 requests (limit is 5)
    for (let i = 0; i < 5; i++) {
      await limiter.checkLimit('user123', 'auth');
    }
    const result = await limiter.checkLimit('user123', 'auth');
    expect(result.allowed).toBe(false);
  });
});
```

#### 2. Integration Tests
```typescript
// Test full authentication flow
describe('Authentication Flow', () => {
  it('should register, verify, and login user', async () => {
    // Register
    const registerResponse = await request(API_URL)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'SecurePass123!'
      });
    expect(registerResponse.status).toBe(200);

    // Verify (mock)
    const verifyResponse = await request(API_URL)
      .post('/auth/confirm-signup')
      .send({
        username: 'testuser',
        code: '123456'
      });
    expect(verifyResponse.status).toBe(200);

    // Login
    const loginResponse = await request(API_URL)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'SecurePass123!'
      });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.idToken).toBeDefined();
  });
});
```

#### 3. Security Tests
```typescript
describe('Security Tests', () => {
  it('should reject SQL injection attempts', async () => {
    const response = await request(API_URL)
      .post('/transactions')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        description: "'; DROP TABLE Users; --",
        amount: 100
      });
    expect(response.status).toBe(400);
  });

  it('should reject XSS attempts', async () => {
    const response = await request(API_URL)
      .post('/transactions')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        description: "<script>alert('xss')</script>",
        amount: 100
      });
    expect(response.status).toBe(400);
  });

  it('should enforce rate limiting', async () => {
    const requests = Array(10).fill(null).map(() =>
      request(API_URL).post('/auth/login').send({
        username: 'test',
        password: 'wrong'
      })
    );
    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status === 429);
    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
```

#### 4. Load Tests
```typescript
// Using Artillery or k6
export default function() {
  const response = http.post(`${API_URL}/transactions`, JSON.stringify({
    description: 'Test transaction',
    amount: 50,
    category: 'Food'
  }), {
    headers: {
      'Authorization': `Bearer ${__ENV.TEST_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500
  });
}
```

## CI/CD Pipeline Design

### Environment Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                         │
│                                                              │
│  Branches:                                                   │
│  • main (production)                                         │
│  • staging                                                   │
│  • develop                                                   │
│  • feature/* (feature branches)                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Actions Workflows                    │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Development  │  │   Staging    │  │  Production  │
│ Environment  │  │ Environment  │  │ Environment  │
│              │  │              │  │              │
│ Auto-deploy  │  │ Auto-deploy  │  │ Manual       │
│ on push to   │  │ on push to   │  │ approval     │
│ develop      │  │ staging      │  │ required     │
└──────────────┘  └──────────────┘  └──────────────┘
```

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [develop, staging, main]
  pull_request:
    branches: [main, staging]

env:
  AWS_REGION: eu-west-2

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm test
      
      - name: Run security scan
        run: npm audit --audit-level=moderate

  deploy-dev:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: development
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_DEV }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_DEV }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Deploy to Development
        run: |
          npm ci
          npx serverless deploy --stage dev --verbose

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_STAGING }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_STAGING }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Deploy to Staging
        run: |
          npm ci
          npx serverless deploy --stage staging --verbose
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          API_URL: ${{ secrets.STAGING_API_URL }}

  deploy-prod:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: 
      name: production
      url: https://api.expenzez.com
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_PROD }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_PROD }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Deploy to Production
        run: |
          npm ci
          npx serverless deploy --stage prod --verbose
      
      - name: Run smoke tests
        run: npm run test:smoke
        env:
          API_URL: ${{ secrets.PROD_API_URL }}
      
      - name: Notify deployment
        if: success()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment successful!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Environment-Specific Configuration

```yaml
# serverless.yml
custom:
  stages:
    dev:
      cognitoUserPoolId: ${ssm:/expenzez/dev/cognito/user-pool-id}
      apiDomain: api-dev.expenzez.com
      logLevel: DEBUG
    staging:
      cognitoUserPoolId: ${ssm:/expenzez/staging/cognito/user-pool-id}
      apiDomain: api-staging.expenzez.com
      logLevel: INFO
    prod:
      cognitoUserPoolId: ${ssm:/expenzez/prod/cognito/user-pool-id}
      apiDomain: api.expenzez.com
      logLevel: WARN

provider:
  environment:
    STAGE: ${self:provider.stage}
    LOG_LEVEL: ${self:custom.stages.${self:provider.stage}.logLevel}
    COGNITO_USER_POOL_ID: ${self:custom.stages.${self:provider.stage}.cognitoUserPoolId}
```

## Monitoring & Observability

### CloudWatch Dashboards

```typescript
// Create custom dashboard
const dashboard = {
  widgets: [
    {
      type: 'metric',
      properties: {
        metrics: [
          ['AWS/Lambda', 'Invocations', { stat: 'Sum' }],
          ['.', 'Errors', { stat: 'Sum' }],
          ['.', 'Duration', { stat: 'Average' }]
        ],
        period: 300,
        stat: 'Average',
        region: 'eu-west-2',
        title: 'Lambda Performance'
      }
    },
    {
      type: 'metric',
      properties: {
        metrics: [
          ['AWS/DynamoDB', 'UserErrors', { stat: 'Sum' }],
          ['.', 'SystemErrors', { stat: 'Sum' }],
          ['.', 'ConsumedReadCapacityUnits', { stat: 'Sum' }],
          ['.', 'ConsumedWriteCapacityUnits', { stat: 'Sum' }]
        ],
        period: 300,
        stat: 'Sum',
        region: 'eu-west-2',
        title: 'DynamoDB Metrics'
      }
    }
  ]
};
```

### CloudWatch Alarms

```yaml
Resources:
  HighErrorRateAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: expenzez-high-error-rate
      AlarmDescription: Alert when error rate exceeds 5%
      MetricName: Errors
      Namespace: AWS/Lambda
      Statistic: Sum
      Period: 300
      EvaluationPeriods: 2
      Threshold: 10
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - !Ref AlertSNSTopic

  HighLatencyAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: expenzez-high-latency
      AlarmDescription: Alert when p99 latency exceeds 3 seconds
      MetricName: Duration
      Namespace: AWS/Lambda
      ExtendedStatistic: p99
      Period: 300
      EvaluationPeriods: 2
      Threshold: 3000
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - !Ref AlertSNSTopic
```

### X-Ray Tracing

```typescript
// Enable X-Ray in serverless.yml
provider:
  tracing:
    lambda: true
    apiGateway: true

// Instrument code
import AWSXRay from 'aws-xray-sdk-core';
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

// Create subsegments for external calls
const segment = AWSXRay.getSegment();
const subsegment = segment.addNewSubsegment('OpenAI API Call');
try {
  const response = await openai.chat.completions.create({...});
  subsegment.close();
} catch (error) {
  subsegment.addError(error);
  subsegment.close();
  throw error;
}
```

## Migration Strategy

### Phase 1: Immediate Security Fixes (Week 1)
1. Move secrets to AWS Secrets Manager
2. Update CORS to specific origins
3. Enable DynamoDB encryption at rest
4. Implement least-privilege IAM policies
5. Add input validation to all endpoints

### Phase 2: Infrastructure Optimization (Week 2-3)
1. Split CloudFormation into multiple stacks
2. Remove commented-out functions
3. Consolidate OPTIONS handlers
4. Set up separate AWS accounts for dev/staging/prod

### Phase 3: CI/CD Implementation (Week 3-4)
1. Create GitHub Actions workflows
2. Set up automated testing
3. Configure deployment gates
4. Implement blue-green deployment

### Phase 4: Monitoring & Observability (Week 4-5)
1. Configure CloudWatch dashboards
2. Set up alarms and alerts
3. Enable X-Ray tracing
4. Integrate error tracking (Sentry)

### Phase 5: Advanced Security (Week 5-6)
1. Implement WAF rules
2. Enable GuardDuty
3. Configure VPC for Lambdas
4. Set up VPC endpoints

## Cost Optimization

### Current Estimated Costs
- Lambda: ~$50/month (60 functions, moderate traffic)
- DynamoDB: ~$30/month (PAY_PER_REQUEST)
- API Gateway: ~$20/month
- CloudWatch Logs: ~$10/month
- **Total: ~$110/month**

### Optimized Costs
- Lambda: ~$40/month (optimized cold starts, reduced functions)
- DynamoDB: ~$25/month (optimized queries, caching)
- API Gateway: ~$15/month (reduced OPTIONS calls)
- CloudWatch Logs: ~$5/month (log retention policies)
- KMS: ~$1/month
- Secrets Manager: ~$2/month
- **Total: ~$88/month** (20% reduction)

### Cost Optimization Strategies
1. Implement caching layer (reduce DynamoDB reads)
2. Optimize Lambda memory allocation
3. Use Lambda reserved concurrency for predictable workloads
4. Implement log retention policies (7-30 days)
5. Use S3 for large payloads instead of Lambda
6. Batch DynamoDB writes where possible

## Security Checklist

### Critical (Fix Immediately)
- [ ] Move all secrets from .env to AWS Secrets Manager
- [ ] Update CORS to specific origins only
- [ ] Enable DynamoDB encryption at rest
- [ ] Implement least-privilege IAM policies
- [ ] Add input validation to all endpoints
- [ ] Remove .env from repository history

### High Priority (Fix Within 2 Weeks)
- [ ] Implement distributed rate limiting
- [ ] Add token revocation mechanism
- [ ] Enable CloudTrail logging
- [ ] Configure CloudWatch alarms
- [ ] Implement field-level encryption for PII
- [ ] Set up separate environments (dev/staging/prod)

### Medium Priority (Fix Within 1 Month)
- [ ] Deploy Lambdas in VPC
- [ ] Configure VPC endpoints
- [ ] Implement WAF rules
- [ ] Enable GuardDuty
- [ ] Set up X-Ray tracing
- [ ] Implement circuit breakers for external services

### Low Priority (Nice to Have)
- [ ] Implement blue-green deployments
- [ ] Set up automated penetration testing
- [ ] Configure AWS Config rules
- [ ] Implement automated compliance checks
- [ ] Set up cost anomaly detection

## Conclusion

The Expenzez AWS backend has a solid foundation but requires significant security hardening and architectural improvements. The most critical issues are:

1. **Exposed secrets in .env file** - Must be migrated to Secrets Manager immediately
2. **Overly permissive IAM policies** - Implement least-privilege access
3. **No environment separation** - Risk of breaking production during development
4. **CloudFormation resource limits** - Blocking new feature deployments
5. **Missing encryption at rest** - Compliance and security risk

The proposed solutions are designed to be implemented incrementally without disrupting the live production service. By following the phased migration strategy, the system can be secured and optimized over 6 weeks while maintaining 100% uptime.
