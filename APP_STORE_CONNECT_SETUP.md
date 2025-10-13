# 📱 App Store Connect Setup Guide

## 🚨 **CRITICAL: Apple Rejection Fixes Required**

Your app was rejected due to missing required information for auto-renewable subscriptions. Follow this guide to fix all issues.

## ✅ **Required App Store Connect Metadata Updates**

### **1. Privacy Policy Field**

- **Location**: App Store Connect → Your App → App Information → Privacy Policy
- **Required**: Functional link to privacy policy
- **URL**: `https://expenzez.com/privacy`
- **Status**: ✅ Already implemented in app

### **2. Terms of Use (EULA) Field**

- **Location**: App Store Connect → Your App → App Information → EULA
- **Options**:
  - **Option A**: Use Apple's Standard EULA (recommended for quick approval)
  - **Option B**: Upload custom EULA document
- **If using custom EULA**: Upload PDF document with your terms
- **Status**: ✅ Links implemented in app

### **3. App Description Updates**

Add the following to your App Description in App Store Connect:

```
📱 Expenzez - Smart Personal Finance Manager

Transform your financial life with AI-powered insights, automated bill tracking, and personalized budgeting.

✨ KEY FEATURES:
• AI-Powered Spending Insights
• Automated Bill Detection & Reminders
• Smart Budget Management
• Bank-Level Security
• Real-time Transaction Tracking

💎 PREMIUM SUBSCRIPTION:
• 14-day free trial
• Monthly: £4.99/month
• Annual: £49.99/year (17% savings)
• Cancel anytime in Settings

🔒 PRIVACY & TERMS:
• Privacy Policy: https://expenzez.com/privacy
• Terms of Use: https://expenzez.com/terms

Start your free trial today and take control of your finances!
```

## 🛒 **In-App Purchase Products Setup**

### **Required Products in App Store Connect:**

1. **Monthly Subscription**

   - **Product ID**: `expenzez_premium_monthly`
   - **Type**: Auto-Renewable Subscription
   - **Price**: £4.99/month
   - **Free Trial**: 14 days
   - **Subscription Group**: Create new group "Expenzez Premium"

2. **Annual Subscription**
   - **Product ID**: `expenzez_premium_annual`
   - **Type**: Auto-Renewable Subscription
   - **Price**: £49.99/year
   - **Free Trial**: 14 days
   - **Subscription Group**: Same group as monthly

### **Subscription Group Settings:**

- **Group Name**: "Expenzez Premium"
- **Reference Name**: "Premium Subscription"
- **Subscription Duration**: Monthly & Annual
- **Free Trial**: 14 days
- **Introductory Offers**: None (using free trial)

## 🔧 **RevenueCat Configuration**

### **1. Update Package Identifiers**

Ensure your RevenueCat dashboard matches App Store Connect:

```typescript
// In your RevenueCat dashboard, create packages:
Package 1:
- Identifier: expenzez_premium_monthly
- App Store Product ID: expenzez_premium_monthly
- Type: Monthly

Package 2:
- Identifier: expenzez_premium_annual
- App Store Product ID: expenzez_premium_annual
- Type: Annual
```

### **2. Test with Sandbox**

- Create sandbox test accounts in App Store Connect
- Test purchase flow in sandbox environment
- Verify restore purchases functionality

## 📋 **Pre-Submission Checklist**

### **✅ App Binary Requirements:**

- [x] Functional purchase flow (no local trial bypass)
- [x] Terms of Use link in subscription page
- [x] Privacy Policy link in subscription page
- [x] Restore Purchases button
- [x] Subscription pricing display
- [x] Free trial information
- [x] Auto-renewal disclosure

### **✅ App Store Connect Requirements:**

- [ ] Privacy Policy URL added
- [ ] EULA configured (Standard or Custom)
- [ ] App Description updated with legal links
- [ ] In-app purchase products created
- [ ] Subscription groups configured
- [ ] Sandbox testing completed

### **✅ RevenueCat Requirements:**

- [ ] Package identifiers match App Store Connect
- [ ] Products configured in RevenueCat dashboard
- [ ] Test purchases working in sandbox
- [ ] Restore purchases working

## 🚀 **Submission Steps**

1. **Update App Store Connect Metadata**

   - Add Privacy Policy URL
   - Configure EULA (use Standard for quick approval)
   - Update App Description with legal links

2. **Create In-App Purchase Products**

   - Set up monthly subscription (£4.99/month)
   - Set up annual subscription (£49.99/year)
   - Configure 14-day free trial for both

3. **Test in Sandbox**

   - Create sandbox test accounts
   - Test purchase flow
   - Test restore purchases
   - Verify subscription activation

4. **Update RevenueCat**

   - Match package identifiers
   - Test with sandbox products

5. **Resubmit for Review**
   - Upload new binary with fixes
   - Include testing notes for reviewers
   - Mention that purchase flow now works properly

## 📝 **Testing Notes for Apple Reviewers**

Include this in your submission notes:

```
APPLE REVIEW TESTING NOTES:

✅ PURCHASE FLOW FIXED:
- Removed local trial bypass
- Now uses proper RevenueCat → Apple payment flow
- Test with sandbox account: [your-sandbox-email]

✅ REQUIRED LINKS ADDED:
- Terms of Use: Available in subscription page
- Privacy Policy: Available in subscription page
- Restore Purchases: Button added to subscription page

✅ SUBSCRIPTION INFORMATION:
- Pricing clearly displayed
- Free trial period shown (14 days)
- Auto-renewal terms disclosed
- Cancel anytime information provided

TESTING INSTRUCTIONS:
1. Navigate to subscription page
2. Tap "Start 14-Day Free Trial" button
3. Complete purchase flow through Apple's system
4. Test "Restore Purchases" functionality
5. Verify Terms of Use and Privacy Policy links work

All Apple requirements for auto-renewable subscriptions have been implemented.
```

## ⚠️ **Important Notes**

1. **Don't use local trial system** - Apple requires real purchase flow
2. **Test thoroughly in sandbox** before resubmission
3. **Ensure all links are functional** and accessible
4. **Use Standard EULA** for faster approval (can customize later)
5. **Include testing instructions** for Apple reviewers

## 🎯 **Expected Outcome**

After implementing these fixes:

- ✅ Purchase flow will work through Apple's system
- ✅ All required legal links will be present
- ✅ Restore purchases will function properly
- ✅ App will comply with Apple's subscription requirements
- ✅ Approval should be granted on next submission

---

**Last Updated**: January 2025  
**Status**: Ready for Implementation  
**Priority**: CRITICAL - Required for App Store Approval
