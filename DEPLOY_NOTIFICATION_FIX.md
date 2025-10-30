# Deploy Duplicate Notification Fix

**Date:** October 30, 2025
**Issue:** Duplicate "Daily Expense Check-In" notifications
**Status:** Ready to deploy

---

## 📋 Files Changed

### Backend Changes

1. **`functions/notifications/daily-reminders.ts`** ✅ Modified
   - Added logic to use only most recent device token
   - Added `collapseId` to prevent duplicate notification stacking
   - Added logging for token count

2. **`functions/notifications/deduplicate-tokens.ts`** ✅ Created
   - New endpoint to clean up duplicate tokens
   - Groups tokens by device, keeps most recent per device

3. **`serverless.yml`** ✅ Modified
   - Added `deduplicateTokens` function configuration
   - Configured endpoint: `POST /notifications/deduplicate-tokens`

---

## 🚀 Deployment Steps

### Step 1: Build Lambda Functions

```bash
cd expenzez-backend

# Build TypeScript to JavaScript
npm run build:functions

# Verify build succeeded
ls .build/functions/notifications/daily-reminders.js
ls .build/functions/notifications/deduplicate-tokens.js
```

---

### Step 2: Deploy to AWS

```bash
# Deploy both new and updated functions
serverless deploy

# Or deploy specific functions only:
serverless deploy function -f dailyReminders
serverless deploy function -f deduplicateTokens
```

**Expected Output:**
```
✔ Service deployed to stack expenzez-backend-prod
endpoints:
  POST - https://xxx.execute-api.eu-west-2.amazonaws.com/notifications/deduplicate-tokens
functions:
  dailyReminders: expenzez-backend-prod-dailyReminders (updated)
  deduplicateTokens: expenzez-backend-prod-deduplicateTokens (created)
```

---

### Step 3: Clean Up Existing Duplicate Tokens

**Option A: Via Frontend (Recommended)**

Add a button in the app's notification settings to call the cleanup endpoint:

```typescript
// In NotificationSettingsScreen.tsx or similar
const cleanupDuplicateTokens = async () => {
  try {
    const response = await fetch(
      'https://xxx.execute-api.eu-west-2.amazonaws.com/notifications/deduplicate-tokens',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    console.log('Cleanup result:', result);
    Alert.alert('Success', result.summary);
  } catch (error) {
    console.error('Cleanup failed:', error);
    Alert.alert('Error', 'Failed to clean up tokens');
  }
};
```

**Option B: Via AWS Lambda Console**

1. Go to AWS Lambda Console
2. Find function: `expenzez-backend-prod-deduplicateTokens`
3. Create a test event with empty payload: `{}`
4. Click "Test" to execute

**Option C: Via AWS CLI**

```bash
aws lambda invoke \
  --function-name expenzez-backend-prod-deduplicateTokens \
  --region eu-west-2 \
  --payload '{}' \
  response.json

# View results
cat response.json
```

---

### Step 4: Verify the Fix

#### 4.1 Check Token Count

```bash
# Query DynamoDB to see how many tokens exist per user
aws dynamodb query \
  --table-name NotificationTokens \
  --key-condition-expression "userId = :userId" \
  --expression-attribute-values '{":userId":{"S":"YOUR_USER_ID"}}' \
  --region eu-west-2
```

**Expected:** 1 token per device (not 6+ tokens)

#### 4.2 Trigger Daily Reminder Manually

```bash
# Invoke the daily reminder Lambda manually
aws lambda invoke \
  --function-name expenzez-backend-prod-dailyReminders \
  --region eu-west-2 \
  --payload '{}' \
  response.json

# Check CloudWatch Logs
aws logs tail /aws/lambda/expenzez-backend-prod-dailyReminders --follow
```

**Look for in logs:**
```
[DailyReminder] User xxx has 6 tokens, using most recent
[DailyReminder] Already sent to user xxx today - skipping
```

#### 4.3 Test on Device

1. **Clear existing notifications** on your iPhone
2. **Wait for next scheduled run** (8 AM UTC / 9 PM UK time)
3. **Or trigger manually** using AWS CLI above
4. **Check device:** Should receive only **1 notification** (not 6)

---

### Step 5: Monitor CloudWatch Logs

```bash
# Watch logs in real-time during next scheduled run
aws logs tail /aws/lambda/expenzez-backend-prod-dailyReminders \
  --follow \
  --region eu-west-2

# Or view recent logs
aws logs tail /aws/lambda/expenzez-backend-prod-dailyReminders \
  --since 1h \
  --region eu-west-2
```

**What to look for:**
- ✅ `User xxx has 6 tokens, using most recent` → Fix working
- ✅ `Already sent to user xxx today - skipping` → Deduplication working
- ✅ No duplicate push notification sends
- ❌ Multiple `Sending SNS push notification` for same user → Issue persists

---

## 🧪 Testing Checklist

After deployment:

- [ ] **Build:** `npm run build:functions` succeeds
- [ ] **Deploy:** `serverless deploy` succeeds
- [ ] **Endpoint:** `POST /notifications/deduplicate-tokens` is accessible
- [ ] **Cleanup:** Run token cleanup endpoint successfully
- [ ] **Verify:** Check DynamoDB - only 1 token per device
- [ ] **Test:** Trigger daily reminder manually
- [ ] **Confirm:** Receive only 1 notification on device
- [ ] **Wait:** Check next scheduled run (9 PM UK time)
- [ ] **Monitor:** CloudWatch logs show correct behavior

---

## 🔍 Troubleshooting

### Issue: Still receiving duplicates

**Cause:** Old tokens not cleaned up yet

**Fix:**
```bash
# Run cleanup endpoint again
POST /notifications/deduplicate-tokens

# Or manually delete old tokens from DynamoDB
aws dynamodb scan --table-name NotificationTokens
# Find old tokens and delete them
```

---

### Issue: No notifications at all

**Cause:** Accidentally deleted all tokens

**Fix:**
1. Re-register device token by logging out and back in
2. Check `NotificationTokens` table has entry
3. Trigger test notification

---

### Issue: Deployment fails

**Error:** `Function not found: deduplicate-tokens`

**Fix:**
```bash
# Check build output exists
ls .build/functions/notifications/deduplicate-tokens.js

# If missing, rebuild
npm run build:functions

# Redeploy
serverless deploy
```

---

## 📊 Success Metrics

### Before Fix
- 6+ duplicate notifications per user
- NotificationTokens table: 6+ entries per user
- Poor user experience

### After Fix
- 1 notification per user ✅
- NotificationTokens table: 1 entry per device ✅
- Clean user experience ✅

---

## 🎯 Rollback Plan

If issues occur after deployment:

```bash
# Rollback to previous version
serverless deploy --stage prod --version PREVIOUS_VERSION

# Or deploy old version of specific function
serverless deploy function -f dailyReminders --version PREVIOUS_VERSION
```

**Note:** Rollback will restore duplicate notifications, but won't cause data loss.

---

## 📝 Post-Deployment

1. **Monitor for 24 hours** after deployment
2. **Check CloudWatch logs** at next scheduled run (9 PM UK)
3. **Verify metrics** in CloudWatch dashboard
4. **User feedback** - confirm no more duplicates reported
5. **Document** any issues found and fixes applied

---

## ✅ Deployment Complete

Once all steps are done:

- [ ] Lambdas deployed successfully
- [ ] Token cleanup run for all users
- [ ] Monitoring shows correct behavior
- [ ] No duplicate notifications received
- [ ] CloudWatch logs look healthy
- [ ] Mark issue as RESOLVED

---

**Deployed By:** _____________
**Date:** _____________
**Verified By:** _____________
**Date:** _____________
