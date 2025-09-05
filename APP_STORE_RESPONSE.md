# App Store Review Response - Expenzez

## Response to App Review Questions

### Regarding Guideline 4.8 - Login Services
**Issue**: The app uses a third-party login service, but does not appear to offer as an equivalent login option another login service with all of the following features.

**Resolution**: We have **removed the Google Sign In option** from our app. Expenzez now uses **only email/password authentication** managed through AWS Cognito. Users create accounts directly within the app using their email address and a secure password. There are no third-party login services in the current version.

The app authentication is handled entirely by:
- User registration with email/password
- Email verification for account security
- AWS Cognito for secure authentication management
- No social login options present

---

### Regarding Guideline 2.1 - Business Model Information

**App Business Model**: Expenzez is a **completely free personal finance management app** with no paid features, subscriptions, or in-app purchases.

#### Responses to Specific Questions:

**1. Who are the users that will use the paid content in the app?**
- There are **no paid content or features** in Expenzez. All functionality is free for all users.

**2. Where can users purchase the content that can be accessed in the app?**
- There is **no purchasable content**. Users cannot buy anything within or outside the app.

**3. What specific types of previously purchased content can a user access in the app?**
- **No previously purchased content** exists. All features are available to all users at no cost.

**4. What paid content, subscriptions, or features are unlocked within your app that do not use in-app purchase?**
- **No paid content, subscriptions, or premium features** exist in Expenzez.

#### What Expenzez Actually Does:
Expenzez is a **read-only financial viewing app** that helps users:
- Connect their existing UK bank accounts securely via TrueLayer API
- View account balances and transaction history in one place
- Get AI-powered insights about their spending patterns
- Track expenses and categorize transactions
- Set budgets and savings goals

**No money changes hands through the app** - it simply provides a secure way to view existing bank data, similar to other budgeting apps like Mint or YNAB's bank viewing features.

**Data Access**: The app uses TrueLayer (an FCA-regulated Open Banking provider) for secure, read-only access to users' bank accounts. This is the same technology used by major financial apps and complies with UK Open Banking regulations.

---

### App Completeness and Image Picker
**Issue**: The image picker is not working.

**Status**: We are currently fixing the image picker functionality and will include the fix in our resubmission. This feature is used for profile pictures and receipt uploads, and we are ensuring proper iOS permissions and error handling.

---

### Account Deletion Requirements
**Issue**: The app supports account creation but does not include an option to initiate account deletion.

**Status**: We are implementing a complete account deletion feature that will:
- Be accessible from the app's Settings menu
- Permanently delete all user data (profile, bank connections, transaction history, AI chat history)
- Include confirmation steps to prevent accidental deletion
- Immediately log out the user after successful deletion

This will be included in our resubmission.

---

## Summary

Expenzez is a free, privacy-focused personal finance app that:
- Uses only email/password authentication (no third-party login)
- Has no paid features, subscriptions, or in-app purchases
- Provides read-only access to users' existing bank accounts
- Helps users better understand their financial data
- Will include complete account deletion functionality

We appreciate the review feedback and are committed to meeting all App Store guidelines.