# App Store Connect Subscription Setup Checklist

## Current Status
- ❌ Expenzez Premium Monthly - Developer Action Needed
- ❌ Expenzez Premium Annual - Developer Action Needed
- ❌ English (U.S.) Localization - Rejected

## Steps to Fix

### 1. Fix English (U.S.) Localization

Click on "English (U.S.)" in the Localization table and ensure these fields are filled:

**Required Fields:**
- ✅ Subscription Group Display Name: "Expenzez Premium"
- ✅ App Name: "Expenzez"
- ❓ Screenshot for subscription (at least 1 required)
  - Size: 1284x2778 pixels (iPhone 14 Pro Max)
  - Show the Premium Membership or Settings page with subscription info
  - Should clearly show what users get with the subscription

### 2. Complete Monthly Subscription

Click "Expenzez Premium Monthly" and verify:

**Subscription Information:**
- ✅ Product ID: expenzez_premium_monthly
- ✅ Duration: 1 month
- ❓ Subscription Prices: £4.99 (GBP)
- ❓ Free Trial: 14 days (if offering trial)

**Subscription Localization (English U.S.):**
- ❓ Display Name: "Monthly Premium"
- ❓ Description: "Access all premium features with monthly billing"
- ❓ Screenshot: Required (same as group screenshot)

**Review Information:**
- ❓ Screenshot (if different from group)
- ❓ Review Notes (optional)

### 3. Complete Annual Subscription

Click "Expenzez Premium Annual" and verify:

**Subscription Information:**
- ✅ Product ID: expenzez_premium_annual
- ✅ Duration: 1 year
- ❓ Subscription Prices: £49.99 (GBP)
- ❓ Free Trial: 14 days (if offering trial)

**Subscription Localization (English U.S.):**
- ❓ Display Name: "Annual Premium"
- ❓ Description: "Access all premium features with annual billing - save £9.89!"
- ❓ Screenshot: Required (same as group screenshot)

**Review Information:**
- ❓ Screenshot (if different from group)
- ❓ Review Notes (optional)

### 4. Link Subscriptions to App Version

IMPORTANT: After fixing the above, you MUST:

1. Go to your app version page (v1.0.0 build 68)
2. Scroll to "In-App Purchases and Subscriptions" section
3. Click the "+" button
4. Select BOTH subscriptions:
   - Expenzez Premium Monthly
   - Expenzez Premium Annual
5. Save

Without this step, subscriptions won't be reviewed with your app!

### 5. Submit Subscription Group for Review

After completing all fields:
1. Click "Submit for Review" on the subscription group page
2. Wait for Apple to approve subscriptions (usually happens alongside app review)

## Common Rejection Reasons for Localization

- Missing subscription screenshot
- Screenshot doesn't clearly show subscription benefits
- Missing display name or description
- Incorrect pricing information

## Required Screenshots

You need at least one screenshot showing your subscription offering. Options:
1. Screenshot of the Premium Membership page showing pricing
2. Screenshot of the Settings page showing subscription details
3. Custom marketing image showing premium features

**Recommended**: Use the Premium Membership page screenshot showing:
- "Unlock Premium" header
- Monthly/Annual pricing cards
- Premium features list
- "Start 14-Day Free Trial" button

## Next Steps After Fix

1. ✅ Fix localization (add screenshot)
2. ✅ Complete both subscription products
3. ✅ Link to app version 1.0.0 build 68
4. ✅ Submit subscription group for review
5. ✅ Submit app version for review

Both will be reviewed together!
