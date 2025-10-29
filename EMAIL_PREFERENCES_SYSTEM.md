# Email Preferences System - Implementation Plan

## Overview

A comprehensive email preference system that categorizes emails into different types and allows users to control which emails they receive. This system ensures legal compliance (GDPR, CAN-SPAM) while providing granular control over email communications.

## Email Categories

### 1. Security Emails (Always Enabled)

- **Purpose**: Critical security notifications
- **Examples**: Login alerts, password changes, security updates, suspicious activity
- **User Control**: Cannot be disabled (always sent to all users)
- **Priority**: High
- **Color Theme**: Red (#EF4444)
- **Icon**: 🔒

### 2. Transactional Emails (Always Enabled)

- **Purpose**: Account-related notifications
- **Examples**: Receipts, account confirmations, payment notifications, password resets
- **User Control**: Cannot be disabled (always sent to all users)
- **Priority**: High
- **Color Theme**: Green (#10B981)
- **Icon**: 📧

### 3. Marketing Emails (User Choice)

- **Purpose**: Promotional content and new features
- **Examples**: New feature announcements, general promotions, app updates
- **User Control**: Can be enabled/disabled by user
- **Priority**: Medium
- **Color Theme**: Purple (#7C3AED)
- **Icon**: 📢

### 4. Special Offers (User Choice)

- **Purpose**: Discounts and limited-time deals
- **Examples**: 50% off promotions, exclusive offers, limited-time deals
- **User Control**: Can be enabled/disabled by user
- **Priority**: High
- **Color Theme**: Orange (#F59E0B)
- **Icon**: 🎁

### 5. Newsletter (User Choice)

- **Purpose**: Regular content and insights
- **Examples**: Weekly tips, financial insights, app news, educational content
- **User Control**: Can be enabled/disabled by user
- **Priority**: Low
- **Color Theme**: Violet (#8B5CF6)
- **Icon**: 📰

### 6. App Updates (User Choice)

- **Purpose**: Technical and feature updates
- **Examples**: New features, maintenance notifications, version updates
- **User Control**: Can be enabled/disabled by user (default enabled)
- **Priority**: Medium
- **Color Theme**: Blue (#3B82F6)
- **Icon**: 🔄

## Database Schema

### Users Table Updates

```typescript
interface UserData {
  userId: string;
  email: string;
  emailPreferences: {
    marketing: boolean; // User can toggle
    security: boolean; // Always true (can't disable)
    offers: boolean; // User can toggle
    transactional: boolean; // Always true (can't disable)
    updates: boolean; // User can toggle (default true)
    newsletter: boolean; // User can toggle
  };
  emailPreferencesUpdated: string; // ISO timestamp
  emailConsentDate?: string; // When user first consented
  emailConsentSource?: string; // 'registration', 'profile', 'email'
  // ... other existing fields
}
```

### Default Preferences

```typescript
const defaultEmailPreferences: EmailPreferences = {
  marketing: false, // Opt-in required
  security: true, // Always enabled
  offers: false, // Opt-in required
  transactional: true, // Always enabled
  updates: true, // Default enabled (can disable)
  newsletter: false, // Opt-in required
};
```

## Frontend Implementation

### 1. Registration Form Updates

- Add email consent checkbox during registration
- Default to marketing/offers/newsletter disabled
- Security and transactional always enabled

### 2. Profile Settings Interface

- New "Email Preferences" section in personal information page
- Toggle switches for each category
- Clear descriptions for each email type
- Visual indicators for required vs optional categories

### 3. UI Components

```typescript
// Email preference row component
<View style={styles.preferenceRow}>
  <View style={styles.preferenceInfo}>
    <Text style={styles.preferenceLabel}>Category Name</Text>
    <Text style={styles.preferenceDescription}>Description</Text>
  </View>
  <Switch
    value={emailPreferences.category}
    onValueChange={(value) => handleEmailPreferenceChange("category", value)}
    disabled={category === "security" || category === "transactional"}
  />
</View>
```

## Backend Implementation

### 1. API Endpoints

- `PUT /api/profile/email-preferences` - Update user email preferences
- `GET /api/profile/email-preferences` - Get user email preferences
- `POST /api/email/send-categorized` - Send emails by category
- `POST /api/email/unsubscribe` - Handle unsubscribe requests

### 2. Email Sending Logic

```typescript
// Send emails based on category and user preferences
const sendCategorizedEmail = async (campaign: EmailCampaign) => {
  // Build filter based on email category
  let filterExpression = "emailPreferences.#category = :enabled";

  // Security and transactional emails go to all users
  if (
    campaign.category === "security" ||
    campaign.category === "transactional"
  ) {
    filterExpression = "attribute_exists(email)";
  }

  // Query users with appropriate preferences
  const users = await dynamoClient.send(
    new ScanCommand({
      TableName: "Users",
      FilterExpression: filterExpression,
      // ... other parameters
    })
  );

  // Send emails to filtered users
  await Promise.all(emailPromises);
};
```

### 3. Email Templates

- Category-specific styling and colors
- Consistent branding across all email types
- Unsubscribe links in all emails
- Mobile-responsive design

## Legal Compliance Features

### 1. Consent Management

- Explicit consent required for marketing emails
- Clear opt-in/opt-out mechanisms
- Consent tracking and audit trail
- Easy unsubscribe process

### 2. Unsubscribe System

- Unique unsubscribe tokens for each user
- One-click unsubscribe from any email
- Immediate effect (no more emails after unsubscribe)
- Confirmation of unsubscribe action

### 3. Double Opt-in (Optional)

- Confirmation email after consent changes
- Verify email address ownership
- Reduce spam complaints

## Email Campaign Examples

### Marketing Campaign

```typescript
const marketingCampaign: EmailCampaign = {
  category: "marketing",
  subject: "🎉 New Feature: AI-Powered Budget Insights!",
  content: "New AI feature announcement...",
  priority: "medium",
};
```

### Security Alert

```typescript
const securityCampaign: EmailCampaign = {
  category: "security",
  subject: "🔒 Security Alert: New Login Detected",
  content: "Security notification...",
  priority: "high",
};
```

### Special Offer

```typescript
const offersCampaign: EmailCampaign = {
  category: "offers",
  subject: "🎁 Limited Time: 50% Off Premium Features!",
  content: "Special offer details...",
  priority: "high",
};
```

## Implementation Phases

### Phase 1: Database & Backend

1. Update Users table schema
2. Create email preference API endpoints
3. Implement categorized email sending logic
4. Add email templates

### Phase 2: Frontend UI

1. Add email preferences to registration form
2. Create email preferences section in profile
3. Implement toggle switches and validation
4. Add consent management

### Phase 3: Email System

1. Set up AWS SES for different email types
2. Create email templates for each category
3. Implement unsubscribe system
4. Add email analytics and tracking

### Phase 4: Testing & Compliance

1. Test all email categories
2. Verify legal compliance
3. Test unsubscribe functionality
4. User acceptance testing

## Benefits

### User Experience

- ✅ Granular control over email preferences
- ✅ Clear understanding of email types
- ✅ Easy to manage preferences
- ✅ Respectful communication

### Business Benefits

- ✅ Higher email engagement rates
- ✅ Legal compliance (GDPR, CAN-SPAM)
- ✅ Better deliverability
- ✅ Improved user trust

### Technical Benefits

- ✅ Scalable email system
- ✅ Easy to add new categories
- ✅ Analytics and tracking
- ✅ Automated preference management

## Future Enhancements

### Advanced Features

- Email frequency preferences (daily, weekly, monthly)
- Time zone-based sending
- A/B testing for email content
- Advanced segmentation

### Analytics

- Open rates by category
- Click-through rates
- Unsubscribe rates
- User engagement metrics

### Integration

- Marketing automation tools
- CRM integration
- Advanced personalization
- Behavioral triggers

## Technical Requirements

### AWS Services

- SES for email sending
- DynamoDB for user preferences
- Lambda for email processing
- CloudWatch for monitoring

### Frontend Dependencies

- React Native Switch component
- Form validation
- State management
- API integration

### Backend Dependencies

- AWS SDK for SES and DynamoDB
- Email template engine
- Input validation
- Error handling

## Security Considerations

### Data Protection

- Encrypt email preferences in database
- Secure API endpoints
- Rate limiting for email sending
- Input validation and sanitization

### Privacy Compliance

- GDPR compliance for EU users
- CAN-SPAM compliance for US users
- Clear privacy policy
- Data retention policies

## Monitoring & Maintenance

### Key Metrics

- Email delivery rates
- Open and click rates
- Unsubscribe rates
- User preference changes

### Maintenance Tasks

- Regular template updates
- Preference cleanup
- Performance monitoring
- Security audits

---

**Created**: January 2024  
**Status**: Planning Phase  
**Priority**: Medium  
**Estimated Effort**: 2-3 weeks  
**Dependencies**: AWS SES setup, User profile system
