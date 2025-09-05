# 🗄️ Expenzez Database Schema Documentation

**Version**: 1.0.0  
**Database**: AWS DynamoDB  
**Design Pattern**: Single Table Design  
**Date**: August 2025  

---

## 📊 Database Overview

### Design Philosophy
The Expenzez application uses a **Single Table Design** pattern in DynamoDB, optimized for performance and cost efficiency. This approach stores all related entities in a single table with composite keys and strategic Global Secondary Indexes (GSIs) for efficient querying.

### Table Configuration
```yaml
Table Name: expenzez-production
Billing Mode: On-Demand (Pay-per-request)
Encryption: AWS KMS encryption enabled
Point-in-Time Recovery: Enabled
Backup: Daily automated backups
TTL Attribute: TTL (for temporary data)
```

---

## 🗝️ Primary Table Structure

### Key Schema
```typescript
interface PrimaryKey {
  PK: string;    // Partition Key - Entity identifier
  SK: string;    // Sort Key - Entity type and identifier
}
```

### Access Patterns
| Access Pattern | PK | SK | GSI |
|---|---|---|---|
| Get user profile | USER#123 | PROFILE | None |
| Get user transactions | USER#123 | TRANSACTION#* | None |
| Get user by email | email | - | GSI-1 |
| Get transactions by date | USER#123 | timestamp | GSI-2 |
| Get spending by category | USER#123 | category | GSI-3 |

---

## 👤 User Management Entities

### 1. User Profile
```typescript
interface UserProfile {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "PROFILE"
  
  // Identity
  userId: string;                // UUID v4
  email: string;                 // Unique email address
  name: string;                  // Full name
  
  // Timestamps
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
  lastLoginAt?: string;          // ISO 8601 timestamp
  
  // User Preferences
  preferences: {
    theme: 'light' | 'dark';
    currency: string;            // Default currency (GBP, EUR, USD)
    notifications: {
      transactions: boolean;
      budgets: boolean;
      security: boolean;
      marketing: boolean;
    };
    privacy: {
      shareAnalytics: boolean;
      biometricEnabled: boolean;
      pinEnabled: boolean;
    };
    language: string;            // Language code (en, es, fr)
    timezone: string;            // IANA timezone
  };
  
  // Profile Status
  status: 'active' | 'suspended' | 'pending';
  emailVerified: boolean;
  phoneVerified?: boolean;
  
  // KYC Information
  kyc?: {
    status: 'pending' | 'approved' | 'rejected';
    submittedAt?: string;
    reviewedAt?: string;
    documents?: string[];
  };
  
  // Metadata
  platform: 'ios' | 'android';
  appVersion: string;
  deviceId?: string;
}
```

**Example Record:**
```json
{
  "PK": "USER#550e8400-e29b-41d4-a716-446655440000",
  "SK": "PROFILE",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-08-20T10:00:00Z",
  "updatedAt": "2025-08-20T15:30:00Z",
  "preferences": {
    "theme": "dark",
    "currency": "GBP",
    "notifications": {
      "transactions": true,
      "budgets": true,
      "security": true,
      "marketing": false
    }
  },
  "status": "active",
  "emailVerified": true
}
```

---

## 🏦 Banking Entities

### 1. Bank Connection
```typescript
interface BankConnection {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "BANK#${connectionId}"
  
  // Connection Identity
  connectionId: string;          // TrueLayer connection ID
  userId: string;                // Reference to user
  
  // Bank Information
  bankName: string;              // "Barclays", "HSBC", etc.
  bankLogo?: string;             // Bank logo URL
  bic?: string;                  // Bank Identifier Code
  
  // Connection Details
  connectionType: 'oauth' | 'open_banking';
  provider: 'truelayer' | 'plaid' | 'yapily';
  
  // Status & Health
  status: 'active' | 'expired' | 'error' | 'reconnect_required';
  lastSync: string;              // ISO 8601 timestamp
  nextSync?: string;             // Scheduled next sync
  
  // OAuth Tokens (Encrypted)
  accessToken?: string;          // Encrypted access token
  refreshToken?: string;         // Encrypted refresh token
  tokenExpiry?: string;          // Token expiration time
  
  // Error Information
  lastError?: {
    code: string;
    message: string;
    timestamp: string;
    retryCount: number;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  
  // Consent Information
  consent: {
    grantedAt: string;
    expiresAt?: string;
    permissions: string[];       // ['accounts', 'transactions', 'balance']
    institutionConsent?: string; // Institution-specific consent ID
  };
  
  // Connection Statistics
  stats: {
    totalAccounts: number;
    lastSuccessfulSync: string;
    syncCount: number;
    errorCount: number;
  };
}
```

### 2. Bank Account
```typescript
interface BankAccount {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "ACCOUNT#${accountId}"
  
  // Account Identity
  accountId: string;             // TrueLayer account ID
  connectionId: string;          // Reference to bank connection
  userId: string;                // Reference to user
  
  // Account Information
  accountName: string;           // "Main Current Account"
  accountType: 'checking' | 'savings' | 'credit' | 'investment' | 'loan';
  currency: string;              // ISO currency code
  
  // Account Numbers (Encrypted)
  accountNumber?: string;        // Encrypted account number
  sortCode?: string;             // UK sort code
  iban?: string;                 // International account number
  
  // Balance Information
  balance: {
    available: number;           // Available balance
    current: number;             // Current balance
    overdraft?: number;          // Overdraft limit
    currency: string;
    lastUpdated: string;         // Balance timestamp
  };
  
  // Account Status
  status: 'active' | 'closed' | 'suspended';
  isVisible: boolean;            // User visibility setting
  
  // Provider Information
  provider: {
    bankName: string;
    displayName: string;
    logo?: string;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  lastSyncAt: string;
  
  // Transaction Summary
  transactionSummary: {
    totalTransactions: number;
    lastTransactionDate?: string;
    averageMonthlySpending: number;
  };
}
```

### 3. Transaction Record
```typescript
interface Transaction {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "TRANSACTION#${transactionId}"
  
  // Transaction Identity
  transactionId: string;         // TrueLayer transaction ID
  accountId: string;             // Reference to account
  userId: string;                // Reference to user
  
  // Transaction Details
  amount: number;                // Transaction amount (negative for debits)
  currency: string;              // ISO currency code
  description: string;           // Transaction description
  reference?: string;            // Payment reference
  
  // Timing
  timestamp: string;             // Transaction date (ISO 8601)
  processingDate?: string;       // Bank processing date
  valueDate?: string;            // Value date
  
  // Categorization
  category: {
    primary: string;             // "food_and_drink", "transport", etc.
    secondary?: string;          // "restaurants", "fuel", etc.
    confidence: number;          // AI categorization confidence (0-1)
    userModified: boolean;       // User has manually changed category
  };
  
  // Merchant Information
  merchant?: {
    name: string;                // "Tesco Express"
    category?: string;           // MCC category
    logo?: string;               // Merchant logo URL
    location?: {
      city: string;
      country: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  };
  
  // Transaction Type
  transactionType: 'debit' | 'credit' | 'transfer' | 'fee' | 'interest';
  transactionCode?: string;      // Bank transaction code
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  
  // User Annotations
  userNote?: string;             // User-added note
  tags?: string[];               // User-defined tags
  isHidden: boolean;             // User visibility setting
  
  // AI Analysis
  aiInsights?: {
    isRecurring: boolean;        // Recurring payment detection
    frequency?: 'weekly' | 'monthly' | 'yearly';
    nextExpected?: string;       // Next expected occurrence
    budgetImpact: number;        // Impact on budget categories
    anomalyScore?: number;       // Unusual transaction score (0-1)
  };
  
  // Running Balance
  runningBalance?: number;       // Account balance after transaction
}
```

---

## 🤖 AI Assistant Entities

### 1. Chat Message
```typescript
interface ChatMessage {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "CHAT#${timestamp}#${messageId}"
  
  // Message Identity
  messageId: string;             // UUID v4
  conversationId?: string;       // Thread/conversation grouping
  userId: string;                // Reference to user
  
  // Message Content
  role: 'user' | 'assistant' | 'system';
  content: string;               // Message text
  contentType: 'text' | 'structured' | 'chart';
  
  // Structured Content (for charts, data, etc.)
  structuredData?: {
    type: 'chart' | 'table' | 'summary';
    data: any;                   // Chart data or structured information
    visualization?: string;      // Visualization type
  };
  
  // Timing
  timestamp: string;             // ISO 8601 timestamp
  TTL: number;                   // Auto-expire after 30 days
  
  // Context Information
  context?: {
    userQuestion: string;        // Original user question
    financialContext: {
      totalBalance: number;
      monthlySpending: number;
      topCategories: string[];
      recentTransactions: number;
      budgetStatus: string;
    };
    intent: string;              // Detected user intent
    confidence: number;          // Intent confidence score
  };
  
  // AI Processing
  processingMetadata?: {
    model: string;               // AI model used
    processingTime: number;      // Response generation time (ms)
    tokens: {
      input: number;
      output: number;
    };
    temperature: number;         // AI creativity setting
  };
  
  // User Feedback
  feedback?: {
    helpful: boolean;
    rating?: number;             // 1-5 star rating
    comment?: string;
    feedbackTime: string;
  };
  
  // Message Status
  status: 'sent' | 'delivered' | 'read' | 'error';
  error?: {
    code: string;
    message: string;
    retryCount: number;
  };
}
```

### 2. AI Analysis Cache
```typescript
interface AIAnalysisCache {
  PK: string;                    // "CACHE#AI_ANALYSIS#${userId}"
  SK: string;                    // "DATA#${analysisType}#${timeframe}"
  
  // Cache Identity
  userId: string;                // Reference to user
  analysisType: 'spending_patterns' | 'budget_recommendations' | 'insights' | 'predictions';
  timeframe: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  
  // Cached Data
  analysisData: {
    summary: string;             // Text summary
    insights: Array<{
      type: string;
      title: string;
      description: string;
      confidence: number;
      actionable: boolean;
      category?: string;
    }>;
    metrics: Record<string, number>;
    trends: Array<{
      metric: string;
      trend: 'up' | 'down' | 'stable';
      percentage: number;
    }>;
    recommendations: Array<{
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
      expectedSaving?: number;
    }>;
  };
  
  // Cache Metadata
  generatedAt: string;           // Cache creation time
  expiresAt: string;             // Cache expiry time
  TTL: number;                   // DynamoDB TTL
  
  // Data Freshness
  basedOnData: {
    transactionCount: number;
    dateRange: {
      from: string;
      to: string;
    };
    accountsIncluded: string[];
  };
  
  // Performance Metrics
  generationTime: number;        // Time to generate analysis (ms)
  dataPoints: number;            // Number of data points analyzed
  version: string;               // Analysis algorithm version
}
```

---

## 🔔 Notification System Entities

### 1. Notification Token
```typescript
interface NotificationToken {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "TOKEN#${deviceId}"
  
  // Token Information
  userId: string;                // Reference to user
  deviceId: string;              // Unique device identifier
  token: string;                 // Firebase/APNS token
  platform: 'ios' | 'android' | 'web';
  
  // Token Status
  status: 'active' | 'inactive' | 'expired';
  isValid: boolean;              // Token validity status
  
  // Device Information
  deviceInfo?: {
    model: string;               // iPhone 14, Pixel 7, etc.
    osVersion: string;           // iOS 17.1, Android 13, etc.
    appVersion: string;          // App version
    pushEnabled: boolean;        // System push permission
  };
  
  // Usage Statistics
  lastUsed: string;              // Last successful push
  totalNotificationsSent: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  
  // Metadata
  registeredAt: string;
  updatedAt: string;
  
  // Token Validation
  lastValidated: string;
  validationAttempts: number;
  invalidationReason?: string;
}
```

### 2. Notification Preferences
```typescript
interface NotificationPreferences {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "PREFERENCES#NOTIFICATIONS"
  
  // User Reference
  userId: string;                // Reference to user
  
  // Global Settings
  globalEnabled: boolean;        // Master notification switch
  quietHours: {
    enabled: boolean;
    startTime: string;           // "22:00"
    endTime: string;             // "08:00"
    timezone: string;
  };
  
  // Category Preferences
  categories: {
    transactions: {
      enabled: boolean;
      threshold?: number;        // Minimum amount to notify
      includeDeposits: boolean;
      includeWithdrawals: boolean;
      instantNotification: boolean;
    };
    budgets: {
      enabled: boolean;
      warningThreshold: number;  // Percentage (80 = 80%)
      exceededAlert: boolean;
      weeklyDigest: boolean;
    };
    security: {
      enabled: boolean;
      loginAlerts: boolean;
      deviceChanges: boolean;
      suspiciousActivity: boolean;
    };
    insights: {
      enabled: boolean;
      weeklyReport: boolean;
      monthlyReport: boolean;
      spendingTips: boolean;
    };
    marketing: {
      enabled: boolean;
      productUpdates: boolean;
      promotions: boolean;
      surveys: boolean;
    };
  };
  
  // Delivery Preferences
  channels: {
    push: boolean;               // Mobile push notifications
    email: boolean;              // Email notifications
    sms: boolean;                // SMS notifications (if supported)
  };
  
  // Custom Rules
  customRules?: Array<{
    id: string;
    name: string;
    condition: {
      type: 'amount' | 'category' | 'merchant' | 'frequency';
      operator: 'greater_than' | 'less_than' | 'equals' | 'contains';
      value: any;
    };
    action: 'notify' | 'dont_notify';
    priority: 'high' | 'normal' | 'low';
  }>;
  
  // Metadata
  updatedAt: string;
  lastReviewedAt?: string;
}
```

### 3. Notification History
```typescript
interface NotificationHistory {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "NOTIFICATION#${timestamp}#${notificationId}"
  
  // Notification Identity
  notificationId: string;        // UUID v4
  userId: string;                // Reference to user
  
  // Notification Content
  title: string;                 // Notification title
  body: string;                  // Notification body
  type: 'transaction' | 'budget' | 'security' | 'insight' | 'marketing';
  priority: 'high' | 'normal' | 'low';
  
  // Delivery Information
  deliveryStatus: 'pending' | 'sent' | 'delivered' | 'failed' | 'opened';
  sentAt: string;                // When notification was sent
  deliveredAt?: string;          // When notification was delivered
  openedAt?: string;             // When notification was opened
  
  // Target Information
  targetDevices: string[];       // Device IDs targeted
  channels: ('push' | 'email' | 'sms')[];
  
  // Content Details
  data?: {
    transactionId?: string;      // Related transaction
    category?: string;           // Related category
    amount?: number;             // Related amount
    deepLink?: string;           // Deep link URL
    imageUrl?: string;           // Notification image
  };
  
  // Delivery Attempts
  deliveryAttempts: Array<{
    timestamp: string;
    channel: string;
    deviceId: string;
    status: 'success' | 'failed';
    error?: string;
  }>;
  
  // User Interaction
  userActions?: Array<{
    action: 'opened' | 'dismissed' | 'clicked_action';
    timestamp: string;
    deviceId: string;
  }>;
  
  // Metadata
  TTL: number;                   // Auto-expire after 90 days
  batchId?: string;              // For bulk notifications
  templateId?: string;           // Template used
  version: string;               // Notification system version
}
```

---

## 💰 Budget & Financial Planning Entities

### 1. User Budget
```typescript
interface UserBudget {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "BUDGET#${budgetId}"
  
  // Budget Identity
  budgetId: string;              // UUID v4
  userId: string;                // Reference to user
  name: string;                  // "Monthly Groceries", "Entertainment", etc.
  
  // Budget Configuration
  category: string;              // Primary spending category
  subcategories?: string[];      // Included subcategories
  
  // Budget Amounts
  limit: number;                 // Budget limit amount
  currency: string;              // Budget currency
  spent: number;                 // Current spent amount
  remaining: number;             // Remaining amount
  percentage: number;            // Percentage used (0-100+)
  
  // Time Period
  period: {
    type: 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
    startDate: string;           // Period start date
    endDate: string;             // Period end date
    isRecurring: boolean;        // Auto-renew budget
  };
  
  // Budget Status
  status: 'active' | 'paused' | 'exceeded' | 'completed';
  isVisible: boolean;            // User visibility setting
  
  // Alert Configuration
  alerts: {
    enabled: boolean;
    thresholds: number[];        // Alert at [50, 80, 100] percent
    lastAlertSent?: string;      // Last alert timestamp
    alertCount: number;          // Number of alerts sent
  };
  
  // Historical Data
  history: Array<{
    period: string;              // Period identifier
    budgeted: number;            // Amount budgeted
    spent: number;               // Amount spent
    variance: number;            // Over/under budget
    achievement: number;         // Achievement percentage
  }>;
  
  // AI Insights
  aiRecommendations?: {
    suggestedAmount: number;     // AI suggested budget amount
    confidence: number;          // Confidence in suggestion
    reasoning: string;           // Why this amount was suggested
    lastUpdated: string;         // When recommendation was generated
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  lastCalculated: string;        // When budget was last recalculated
  
  // Performance Tracking
  performance: {
    averageMonthlySpending: number;
    trend: 'improving' | 'stable' | 'worsening';
    achievementRate: number;     // Historical success rate
    bestMonth?: string;          // Best performing month
    worstMonth?: string;         // Worst performing month
  };
}
```

### 2. Budget Alert
```typescript
interface BudgetAlert {
  PK: string;                    // "USER#${userId}"
  SK: string;                    // "ALERT#${alertId}"
  
  // Alert Identity
  alertId: string;               // UUID v4
  budgetId: string;              // Reference to budget
  userId: string;                // Reference to user
  
  // Alert Configuration
  alertType: 'threshold' | 'exceeded' | 'period_end' | 'custom';
  threshold: number;             // Alert threshold percentage
  isActive: boolean;             // Alert is active
  
  // Alert Status
  lastTriggered?: string;        // Last time alert was triggered
  triggerCount: number;          // Number of times triggered
  acknowledgedAt?: string;       // User acknowledged alert
  
  // Alert Delivery
  deliveryMethods: ('push' | 'email' | 'sms')[];
  priority: 'high' | 'medium' | 'low';
  
  // Custom Alert Rules
  conditions?: {
    timeOfDay?: string;          // Only alert at specific time
    daysOfWeek?: number[];       // Only alert on specific days
    minimumAmount?: number;      // Only alert if amount exceeds minimum
    consecutiveDays?: number;    // Only alert after N days of overspending
  };
  
  // Alert Content Template
  template: {
    title: string;
    message: string;
    actionText?: string;
    deepLink?: string;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  TTL?: number;                  // Auto-expire inactive alerts
}
```

---

## 🔍 Cache & Performance Entities

### 1. API Response Cache
```typescript
interface APICache {
  PK: string;                    // "CACHE#${endpoint}#${userId}"
  SK: string;                    // "DATA#${queryHash}"
  
  // Cache Identity
  endpoint: string;              // API endpoint cached
  userId?: string;               // User-specific cache
  queryHash: string;             // Hash of query parameters
  
  // Cached Data
  responseData: any;             // Cached response payload
  statusCode: number;            // HTTP status code
  headers?: Record<string, string>;
  
  // Cache Metadata
  cachedAt: string;              // When data was cached
  expiresAt: string;             // Cache expiry time
  TTL: number;                   // DynamoDB TTL
  version: string;               // API version
  
  // Cache Statistics
  hitCount: number;              // Number of cache hits
  lastAccessed: string;          // Last access time
  
  // Data Freshness
  dataSignature: string;         // Hash of source data
  refreshRequiredAt?: string;    // When refresh is required
  
  // Performance Metrics
  originalResponseTime: number;  // Original API response time
  cacheGenerationTime: number;   // Time to generate cache
  compressionRatio?: number;     // If data is compressed
}
```

### 2. System Configuration
```typescript
interface SystemConfig {
  PK: string;                    // "CONFIG#SYSTEM"
  SK: string;                    // "SETTING#${settingName}"
  
  // Configuration Identity
  settingName: string;           // Configuration setting name
  category: 'api' | 'ui' | 'security' | 'performance' | 'feature_flags';
  
  // Configuration Value
  value: any;                    // Configuration value
  dataType: 'string' | 'number' | 'boolean' | 'object' | 'array';
  
  // Metadata
  description: string;           // Setting description
  defaultValue: any;             // Default value
  isUserConfigurable: boolean;   // Can users modify this
  requiresRestart: boolean;      // Requires app restart
  
  // Versioning
  version: string;               // Configuration version
  updatedAt: string;             // Last update time
  updatedBy: string;             // Who updated it
  
  // Validation
  validation?: {
    type: string;                // Validation type
    rules: any;                  // Validation rules
    errorMessage: string;        // Validation error message
  };
  
  // Environment
  environment: 'development' | 'staging' | 'production';
  isActive: boolean;             // Is this setting active
  
  // Rollback Information
  previousValue?: any;           // Previous value for rollback
  changeReason?: string;         // Why was this changed
  
  TTL?: number;                  // Auto-expire temporary settings
}
```

---

## 🔗 Global Secondary Indexes (GSI)

### GSI-1: Email Lookup Index
```typescript
interface EmailLookupGSI {
  // Primary Key
  GSI1PK: string;                // email address
  GSI1SK: string;                // "USER"
  
  // Projected Attributes
  userId: string;
  name: string;
  status: string;
  createdAt: string;
  
  // Use Cases
  // - User authentication by email
  // - Duplicate email checking
  // - Password reset flows
}
```

### GSI-2: Timestamp Index
```typescript
interface TimestampGSI {
  // Primary Key
  GSI2PK: string;                // "USER#${userId}"
  GSI2SK: string;                // timestamp (sortable)
  
  // Projected Attributes
  entityType: string;            // "TRANSACTION", "CHAT", etc.
  amount?: number;
  category?: string;
  
  // Use Cases
  // - Time-range queries
  // - Recent activity feeds
  // - Date-based analytics
  // - Transaction history by date
}
```

### GSI-3: Category Index
```typescript
interface CategoryGSI {
  // Primary Key
  GSI3PK: string;                // "USER#${userId}"
  GSI3SK: string;                // "CATEGORY#${category}"
  
  // Projected Attributes
  entityId: string;
  amount?: number;
  timestamp: string;
  
  // Use Cases
  // - Spending by category
  // - Category-based budget tracking
  // - Financial analytics
  // - Budget alerts
}
```

---

## 📈 Data Relationships & Integrity

### Entity Relationships
```
USER (1) → (N) BANK_CONNECTIONS
BANK_CONNECTION (1) → (N) BANK_ACCOUNTS  
BANK_ACCOUNT (1) → (N) TRANSACTIONS
USER (1) → (N) CHAT_MESSAGES
USER (1) → (N) BUDGETS
BUDGET (1) → (N) BUDGET_ALERTS
USER (1) → (N) NOTIFICATION_TOKENS
USER (1) → (N) NOTIFICATION_HISTORY
```

### Data Consistency Patterns
1. **Eventually Consistent Reads**: Most queries use eventually consistent reads for better performance
2. **Strongly Consistent Reads**: Used for critical operations like balance checks
3. **Atomic Transactions**: Used for related updates (e.g., transaction + balance update)
4. **Optimistic Locking**: Version fields prevent concurrent update conflicts

### Data Validation Rules
1. **Required Fields**: All entities have required fields validation
2. **Data Types**: Strong typing enforced at application layer  
3. **Foreign Key Integrity**: References validated before writes
4. **Business Logic**: Custom validation for financial rules
5. **Duplicate Prevention**: Unique constraints where needed

---

## 🔧 Performance Optimization

### Query Optimization Strategies
1. **Single Query Pattern**: Minimize number of DynamoDB queries
2. **Batch Operations**: Use batch get/write for multiple items
3. **Projection**: Only request needed attributes
4. **Parallel Queries**: Execute independent queries in parallel
5. **Connection Reuse**: Reuse DynamoDB connections

### Caching Strategy
```typescript
// Multi-layer caching approach
interface CacheStrategy {
  // Layer 1: Application Memory Cache (5 minutes)
  applicationCache: {
    userProfiles: Map<string, UserProfile>;
    bankConnections: Map<string, BankConnection[]>;
    recentTransactions: Map<string, Transaction[]>;
  };
  
  // Layer 2: DynamoDB Cache Table (30 minutes)
  databaseCache: {
    apiResponses: APICache[];
    computedAnalytics: AIAnalysisCache[];
  };
  
  // Layer 3: CDN Cache (24 hours)
  cdnCache: {
    staticAssets: string[];
    publicConfiguration: SystemConfig[];
  };
}
```

### Capacity Planning
```yaml
# Production Capacity Settings
ReadCapacity:
  BaseCapacity: 25 RCU
  AutoScaling: 
    Min: 25 RCU
    Max: 4000 RCU
    TargetUtilization: 70%

WriteCapacity:
  BaseCapacity: 25 WCU  
  AutoScaling:
    Min: 25 WCU
    Max: 4000 WCU
    TargetUtilization: 70%

# Expected Query Patterns (per second)
# - User profile lookups: 50 queries/sec
# - Transaction queries: 200 queries/sec  
# - Banking sync writes: 100 writes/sec
# - Chat message writes: 20 writes/sec
# - Notification writes: 30 writes/sec
```

---

## 🔒 Data Security & Compliance

### Encryption Strategy
1. **Encryption at Rest**: All DynamoDB data encrypted with AWS KMS
2. **Encryption in Transit**: TLS 1.2+ for all data transfers
3. **Field-Level Encryption**: Sensitive fields encrypted at application layer
4. **Key Rotation**: Automatic key rotation every 365 days

### Data Classification
```typescript
enum DataClassification {
  PUBLIC = 'public',           // No restrictions
  INTERNAL = 'internal',       // Company internal only
  CONFIDENTIAL = 'confidential', // Need-to-know basis
  RESTRICTED = 'restricted'    // Highest security level
}

// Data classification mapping
const fieldClassification = {
  // Public data
  'userId': DataClassification.PUBLIC,
  'name': DataClassification.PUBLIC,
  'preferences.theme': DataClassification.PUBLIC,
  
  // Confidential data
  'email': DataClassification.CONFIDENTIAL,
  'balance': DataClassification.CONFIDENTIAL,
  'transactionAmount': DataClassification.CONFIDENTIAL,
  
  // Restricted data
  'accountNumber': DataClassification.RESTRICTED,
  'accessToken': DataClassification.RESTRICTED,
  'sortCode': DataClassification.RESTRICTED,
};
```

### Data Retention Policy
```typescript
interface RetentionPolicy {
  entity: string;
  retentionPeriod: string;
  deletionMethod: 'soft' | 'hard';
  archiveBeforeDelete: boolean;
  
  // Examples
  policies: [
    {
      entity: 'ChatMessage',
      retentionPeriod: '30 days',
      deletionMethod: 'hard',
      archiveBeforeDelete: false
    },
    {
      entity: 'Transaction', 
      retentionPeriod: '7 years',
      deletionMethod: 'soft',
      archiveBeforeDelete: true
    },
    {
      entity: 'NotificationHistory',
      retentionPeriod: '90 days', 
      deletionMethod: 'hard',
      archiveBeforeDelete: false
    }
  ];
}
```

---

## 📊 Monitoring & Analytics

### Database Metrics
```typescript
interface DatabaseMetrics {
  performance: {
    avgResponseTime: number;     // Average response time (ms)
    p99ResponseTime: number;     // 99th percentile response time
    errorRate: number;           // Error rate percentage
    throughput: {
      reads: number;             // Reads per second
      writes: number;            // Writes per second
    };
  };
  
  capacity: {
    consumedReadCapacity: number;
    consumedWriteCapacity: number;
    throttledRequests: number;
  };
  
  storage: {
    totalSize: number;           // Total table size (bytes)
    itemCount: number;           // Total item count
    avgItemSize: number;         // Average item size (bytes)
  };
  
  cost: {
    dailyCost: number;           // Daily cost (USD)
    monthlyProjection: number;   // Monthly cost projection
    costPerRequest: number;      // Cost per request
  };
}
```

### Query Analytics
```typescript
interface QueryAnalytics {
  topQueries: Array<{
    pattern: string;             // Query pattern
    frequency: number;           // Queries per hour
    avgLatency: number;          // Average latency (ms)
    cacheHitRate: number;        // Cache hit percentage
  }>;
  
  slowQueries: Array<{
    query: string;
    latency: number;
    timestamp: string;
    optimizationSuggestion: string;
  }>;
  
  errorPatterns: Array<{
    errorType: string;
    frequency: number;
    impact: 'high' | 'medium' | 'low';
    resolution: string;
  }>;
}
```

---

This comprehensive database schema documentation provides a complete technical reference for the Expenzez application's data layer, covering all entities, relationships, performance optimizations, and security considerations.