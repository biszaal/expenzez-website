# 🧪 Sandbox Testing Guide for Apple App Store

## 🎯 **Purpose**

Test the fixed purchase flow and restore functionality before resubmitting to Apple.

## 📱 **Setup Sandbox Testing**

### **1. Create Sandbox Test Accounts**

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Navigate to **Users and Access** → **Sandbox Testers**
3. Create test accounts:

   ```
   Test Account 1:
   - Email: test1@expenzez.com
   - Password: TestPassword123!
   - Country: United Kingdom

   Test Account 2:
   - Email: test2@expenzez.com
   - Password: TestPassword123!
   - Country: United States
   ```

### **2. Configure In-App Purchase Products**

1. Go to **My Apps** → **Expenzez** → **Features** → **In-App Purchases**
2. Create subscription products:

   **Monthly Subscription:**

   - Product ID: `expenzez_premium_monthly`
   - Type: Auto-Renewable Subscription
   - Price: £4.99/month
   - Free Trial: 14 days
   - Subscription Group: "Expenzez Premium"

   **Annual Subscription:**

   - Product ID: `expenzez_premium_annual`
   - Type: Auto-Renewable Subscription
   - Price: £49.99/year
   - Free Trial: 14 days
   - Subscription Group: "Expenzez Premium"

### **3. Update RevenueCat Dashboard**

1. Go to [RevenueCat Dashboard](https://app.revenuecat.com)
2. Navigate to **Products** → **Packages**
3. Create/Update packages:

   ```
   Package 1:
   - Identifier: expenzez_premium_monthly
   - App Store Product ID: expenzez_premium_monthly
   - Type: Monthly

   Package 2:
   - Identifier: expenzez_premium_annual
   - App Store Product ID: expenzez_premium_annual
   - Type: Annual
   ```

## 🧪 **Testing Checklist**

### **✅ Test 1: Purchase Flow**

1. **Open app on test device**
2. **Navigate to subscription page**
3. **Verify UI elements:**

   - [ ] Terms of Use link is visible and clickable
   - [ ] Privacy Policy link is visible and clickable
   - [ ] Restore Purchases button is visible
   - [ ] Pricing is displayed correctly
   - [ ] Free trial information is shown

4. **Test purchase flow:**
   - [ ] Tap "Start 14-Day Free Trial" button
   - [ ] Apple's payment sheet appears
   - [ ] Complete purchase with sandbox account
   - [ ] Verify subscription is activated
   - [ ] Check that premium features are unlocked

### **✅ Test 2: Restore Purchases**

1. **Delete and reinstall app**
2. **Sign in with same sandbox account**
3. **Navigate to subscription page**
4. **Tap "Restore Purchases" button**
5. **Verify:**
   - [ ] Restore process completes successfully
   - [ ] Previous subscription is restored
   - [ ] Premium features are unlocked
   - [ ] Success message is shown

### **✅ Test 3: Legal Links**

1. **Test Terms of Use link:**

   - [ ] Tap Terms of Use link
   - [ ] Browser opens with correct URL
   - [ ] Page loads successfully
   - [ ] Content is accessible

2. **Test Privacy Policy link:**
   - [ ] Tap Privacy Policy link
   - [ ] Browser opens with correct URL
   - [ ] Page loads successfully
   - [ ] Content is accessible

### **✅ Test 4: Subscription Information**

1. **Verify pricing display:**

   - [ ] Monthly price: £4.99/month
   - [ ] Annual price: £49.99/year
   - [ ] Savings information shown
   - [ ] Free trial period mentioned

2. **Check auto-renewal disclosure:**
   - [ ] "Free for 14 days" text visible
   - [ ] "Auto-renews" information shown
   - [ ] "Cancel anytime" mentioned
   - [ ] "Cancel in Settings" instruction provided

## 🐛 **Common Issues & Solutions**

### **Issue: Purchase Button Doesn't Work**

**Symptoms:** Button unlocks premium without going through Apple's payment
**Solution:**

- Check RevenueCat configuration
- Verify package identifiers match App Store Connect
- Ensure sandbox products are created

### **Issue: "No Products Available" Error**

**Symptoms:** RevenueCat returns no offerings
**Solution:**

- Verify App Store Connect products are created
- Check RevenueCat package configuration
- Ensure products are in "Ready to Submit" status

### **Issue: Restore Purchases Fails**

**Symptoms:** Restore button doesn't work or shows error
**Solution:**

- Verify sandbox account has active subscription
- Check RevenueCat restore implementation
- Test with different sandbox account

### **Issue: Links Don't Open**

**Symptoms:** Terms/Privacy links don't work
**Solution:**

- Verify URLs are correct and accessible
- Test links in browser first
- Check network connectivity

## 📊 **Testing Results Template**

```
SANDBOX TESTING RESULTS
Date: [DATE]
Tester: [NAME]
Device: [DEVICE MODEL]
iOS Version: [VERSION]

✅ PURCHASE FLOW TEST:
- Monthly subscription: [PASS/FAIL]
- Annual subscription: [PASS/FAIL]
- Free trial activation: [PASS/FAIL]
- Premium features unlock: [PASS/FAIL]

✅ RESTORE PURCHASES TEST:
- Restore functionality: [PASS/FAIL]
- Previous subscription restored: [PASS/FAIL]
- Success message shown: [PASS/FAIL]

✅ LEGAL LINKS TEST:
- Terms of Use link: [PASS/FAIL]
- Privacy Policy link: [PASS/FAIL]

✅ UI ELEMENTS TEST:
- Pricing display: [PASS/FAIL]
- Free trial information: [PASS/FAIL]
- Auto-renewal disclosure: [PASS/FAIL]
- Restore button visible: [PASS/FAIL]

ISSUES FOUND:
[List any issues encountered]

RECOMMENDATIONS:
[Any recommendations for fixes]
```

## 🚀 **Pre-Submission Checklist**

Before resubmitting to Apple:

- [ ] All sandbox tests pass
- [ ] Purchase flow works through Apple's system
- [ ] Restore purchases functions correctly
- [ ] Legal links are accessible
- [ ] Subscription information is accurate
- [ ] No local trial bypass remains
- [ ] RevenueCat configuration is correct
- [ ] App Store Connect products are created
- [ ] Testing notes are prepared for reviewers

## 📝 **Submission Notes for Apple**

Include this in your App Store Connect submission:

```
APPLE REVIEW TESTING NOTES:

FIXES IMPLEMENTED:
✅ Removed local trial bypass - now uses proper Apple payment flow
✅ Added Terms of Use and Privacy Policy links to subscription page
✅ Added Restore Purchases button
✅ Updated subscription information display

TESTING INSTRUCTIONS:
1. Use sandbox account: [your-sandbox-email]
2. Navigate to subscription page
3. Tap "Start 14-Day Free Trial" button
4. Complete purchase through Apple's payment system
5. Test "Restore Purchases" functionality
6. Verify Terms of Use and Privacy Policy links work

All Apple requirements for auto-renewable subscriptions have been implemented.
```

## ⚠️ **Important Reminders**

1. **Always test in sandbox first** before submitting
2. **Use real sandbox accounts** for testing
3. **Verify all links are accessible** from external browsers
4. **Test on multiple devices** if possible
5. **Document any issues** found during testing
6. **Include detailed testing notes** for Apple reviewers

---

**Last Updated**: January 2025  
**Status**: Ready for Testing  
**Priority**: CRITICAL - Required before resubmission
