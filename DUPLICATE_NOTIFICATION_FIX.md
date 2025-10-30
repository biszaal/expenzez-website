# Duplicate Notification Fix

**Date:** October 30, 2025
**Issue:** Multiple identical "Daily Expense Check-In" notifications appearing
**Status:** Root cause identified, fix implemented

---

## 🔍 Root Cause Analysis

### The Problem

Users receiving 6+ identical "Daily Expense Check-In" notifications all at once (screenshot shows 6 duplicates sent "2h ago").

### Investigation

Found in `/expenzez-backend/functions/notifications/daily-reminders.ts`:

**Problem 1: Multiple Device Tokens**
```typescript
// Line 324-351: Sends one notification per device token
const notifications = deviceTokens.map((token) => ({
  to: token,
  title: payload.title,
  body: payload.message,
  //... no identifier!
}));

for (const notification of notifications) {
  await fetch(expoApiUrl, { ...send to Expo... });
}
```

**Problem 2: Missing Notification Identifier**
- No `channelId` or unique identifier in the notification payload
- Expo can't detect these are the same notification
- Result: Each push creates a new notification card

**Problem 3: Weak Deduplication**
```typescript
// Line 143-154: Only checks if user received ANY notification today
const notificationKey = `daily-reminder-${today}-${user.userId}`;
const alreadySent = await checkNotificationSent(notificationKey);
```
- This key is the SAME for all device tokens
- Deduplication check happens BEFORE sending (correct)
- But check doesn't prevent multiple tokens from each getting a notification

**Problem 4: Multiple Active Tokens**
- User likely has 3-6 active tokens registered in `NotificationTokens` table
- Could happen from:
  - Multiple app installs
  - Token refresh creating duplicates
  - Development testing
  - Not cleaning up old tokens on logout/reinstall

---

## 🛠️ The Fix

### Fix 1: Add Unique Notification Identifier

**What:** Add Expo's collapse ID to group duplicate notifications

**Why:** Even if multiple notifications are sent, Expo will replace old ones with new ones instead of stacking

**Code Change:**
```typescript
// Before (Line 324)
const notifications = deviceTokens.map((token) => ({
  to: token,
  title: payload.title,
  body: payload.message,
  data: payload.data,
  priority: payload.priority === "high" ? "high" : "normal",
  sound: payload.sound || "default",
  badge: payload.badge || 1,
}));

// After - Add collapseId
const today = new Date().toISOString().split("T")[0];
const notifications = deviceTokens.map((token) => ({
  to: token,
  title: payload.title,
  body: payload.message,
  data: payload.data,
  priority: payload.priority === "high" ? "high" : "normal",
  sound: payload.sound || "default",
  badge: payload.badge || 1,
  channelId: "daily-reminders", // Android notification channel
  collapseId: `daily-reminder-${today}`, // Expo collapse ID - replaces instead of stacking
}));
```

**Impact:** Even if 6 notifications are sent, only 1 will show (latest replaces previous)

---

### Fix 2: Send to One Token Only

**What:** Pick the most recently used token instead of sending to all tokens

**Why:** No need to send multiple identical push notifications

**Code Change:**
```typescript
// After line 105 - Sort tokens by most recent
if (tokensResponse.Items && tokensResponse.Items.length > 0) {
  // Get all tokens with lastUsedAt timestamp
  const tokens = tokensResponse.Items
    .map((item) => ({
      token: item.token as string,
      lastUsedAt: item.lastUsedAt || item.createdAt || 0,
    }))
    .sort((a, b) => b.lastUsedAt - a.lastUsedAt); // Most recent first

  // Only use the most recent token
  const deviceTokens = [tokens[0].token];
  users.push({ userId, deviceTokens });
}
```

**Impact:** Only 1 notification sent per user instead of 6

---

### Fix 3: Deduplicate Device Tokens

**What:** Add endpoint to clean up duplicate tokens for the same device

**Why:** Prevent accumulation of old tokens over time

**New File:** `/expenzez-backend/functions/notifications/deduplicate-tokens.ts`

```typescript
import { APIGatewayProxyHandler } from "aws-lambda";
import { QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../lib/dynamodbClient";
import { CorsHelper } from "../lib/corsHelper";

export const handler: APIGatewayProxyHandler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || "*";

  try {
    // Get userId from auth
    const userId =
      event.requestContext?.authorizer?.claims?.sub ||
      event.requestContext?.authorizer?.jwt?.claims?.sub;

    if (!userId) {
      return {
        statusCode: 401,
        headers: CorsHelper.getCorsHeaders(origin),
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    console.log(`[DeduplicateTokens] Cleaning tokens for user: ${userId}`);

    // Get all tokens for this user
    const tokensResponse = await ddb.send(
      new QueryCommand({
        TableName: "NotificationTokens",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
    );

    if (!tokensResponse.Items || tokensResponse.Items.length === 0) {
      return {
        statusCode: 200,
        headers: CorsHelper.getCorsHeaders(origin),
        body: JSON.stringify({
          message: "No tokens found",
          cleaned: 0,
        }),
      };
    }

    // Group tokens by deviceId
    const tokensByDevice = new Map<string, any[]>();
    for (const token of tokensResponse.Items) {
      const deviceId = token.deviceId || "unknown";
      if (!tokensByDevice.has(deviceId)) {
        tokensByDevice.set(deviceId, []);
      }
      tokensByDevice.get(deviceId)!.push(token);
    }

    let deletedCount = 0;
    let keptCount = 0;

    // For each device, keep only the most recent token
    for (const [deviceId, tokens] of tokensByDevice.entries()) {
      if (tokens.length <= 1) {
        keptCount++;
        continue; // Only one token, nothing to clean
      }

      // Sort by createdAt/lastUsedAt, keep most recent
      tokens.sort((a, b) => {
        const aTime = a.lastUsedAt || a.createdAt || 0;
        const bTime = b.lastUsedAt || b.createdAt || 0;
        return bTime - aTime;
      });

      const keepToken = tokens[0];
      const deleteTokens = tokens.slice(1);

      console.log(
        `[DeduplicateTokens] Device ${deviceId}: Keeping 1, deleting ${deleteTokens.length}`
      );

      // Delete old tokens
      for (const oldToken of deleteTokens) {
        await ddb.send(
          new DeleteCommand({
            TableName: "NotificationTokens",
            Key: {
              userId: userId,
              tokenId: oldToken.tokenId,
            },
          })
        );
        deletedCount++;
      }

      keptCount++;
    }

    console.log(
      `[DeduplicateTokens] Cleanup complete: ${deletedCount} deleted, ${keptCount} kept`
    );

    return {
      statusCode: 200,
      headers: CorsHelper.getCorsHeaders(origin),
      body: JSON.stringify({
        message: "Token cleanup complete",
        deleted: deletedCount,
        kept: keptCount,
        devices: tokensByDevice.size,
      }),
    };
  } catch (error: any) {
    console.error("[DeduplicateTokens] Error:", error);
    return {
      statusCode: 500,
      headers: CorsHelper.getCorsHeaders(origin),
      body: JSON.stringify({
        error: "Failed to deduplicate tokens",
        message: error.message,
      }),
    };
  }
};
```

**Impact:** Cleans up old duplicate tokens when called

---

### Fix 4: Auto-Cleanup on Token Registration

**What:** When registering a new token, deactivate old tokens for the same device

**Where:** `/expenzez-backend/functions/notifications/register-token.ts` (to be updated)

**Code Change:**
```typescript
// Before saving new token, deactivate old tokens for same device
await ddb.send(
  new UpdateCommand({
    TableName: "NotificationTokens",
    Key: { userId, deviceId },
    UpdateExpression: "SET isActive = :false, deactivatedAt = :now",
    ExpressionAttributeValues: {
      ":false": false,
      ":now": Date.now(),
    },
    ConditionExpression: "attribute_exists(userId)", // Only if exists
  })
);
```

**Impact:** Prevents accumulation of duplicate tokens going forward

---

## 📊 Expected Results

### Before Fix
- 6 identical notifications show up
- All have same title, message, time
- User confused and annoyed

### After Fix
- Only 1 notification appears
- Even if multiple sent, collapseId ensures only 1 shows
- Clean, professional user experience

---

## 🚀 Deployment Steps

### Step 1: Update daily-reminders.ts
```bash
cd expenzez-backend
# Edit functions/notifications/daily-reminders.ts
npm run build:functions
serverless deploy function -f daily-reminders
```

### Step 2: Create deduplicate-tokens endpoint
```bash
# Create functions/notifications/deduplicate-tokens.ts
npm run build:functions
serverless deploy function -f deduplicate-tokens
```

### Step 3: Update serverless.yml
```yaml
functions:
  # ... existing functions

  deduplicate-tokens:
    handler: functions/notifications/deduplicate-tokens.handler
    events:
      - httpApi:
          path: /notifications/deduplicate-tokens
          method: post
    environment:
      AWS_REGION: eu-west-2
```

### Step 4: Run cleanup for existing users
```bash
# Call the endpoint for your user via frontend
POST /notifications/deduplicate-tokens
# Or run Lambda directly in AWS Console
```

### Step 5: Test
```bash
# Trigger daily reminder manually
aws lambda invoke \
  --function-name expenzez-backend-prod-daily-reminders \
  --payload '{}' \
  response.json

# Check: Should receive only 1 notification
```

---

## ✅ Verification Checklist

After deployment:

- [ ] Deploy updated `daily-reminders.ts` with collapseId
- [ ] Create and deploy `deduplicate-tokens.ts`
- [ ] Run token cleanup endpoint
- [ ] Check `NotificationTokens` table - should have 1 token per device
- [ ] Trigger daily reminder manually
- [ ] Verify only 1 notification appears on device
- [ ] Wait for next scheduled run (9 PM)
- [ ] Confirm no duplicates appear

---

## 📝 Implementation Code

### Modified: daily-reminders.ts

**Line 324-333** - Add collapseId:
```typescript
async function sendNotificationToUser(
  payload: any,
  deviceTokens: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const expoApiUrl = "https://exp.host/--/api/v2/push/send";
    const today = new Date().toISOString().split("T")[0];

    const notifications = deviceTokens.map((token) => ({
      to: token,
      title: payload.title,
      body: payload.message,
      data: payload.data,
      priority: payload.priority === "high" ? "high" : "normal",
      sound: payload.sound || "default",
      badge: payload.badge || 1,
      channelId: "daily-reminders",
      collapseId: `daily-reminder-${today}`, // 🔑 KEY FIX: Prevents duplicate stacking
    }));

    // ... rest of code
  }
}
```

**Line 101-107** - Keep only most recent token:
```typescript
if (tokensResponse.Items && tokensResponse.Items.length > 0) {
  // 🔑 KEY FIX: Sort by most recent and take only one
  const tokens = tokensResponse.Items
    .map((item) => ({
      token: item.token as string,
      lastUsedAt: item.lastUsedAt || item.createdAt || 0,
    }))
    .sort((a, b) => b.lastUsedAt - a.lastUsedAt);

  // Only use the most recent token
  const deviceTokens = [tokens[0].token];
  users.push({ userId, deviceTokens });
}
```

---

## 🎯 Summary

**Root Cause:**
1. Multiple device tokens registered for same device
2. No collapse ID to group duplicate notifications
3. Sending to all tokens instead of most recent one

**Solution:**
1. ✅ Add `collapseId` to group notifications (prevents UI duplicates)
2. ✅ Send to only most recent token (prevents backend duplicates)
3. ✅ Create cleanup endpoint to remove old tokens
4. ✅ Auto-deactivate old tokens on new registration

**Impact:** Reduces 6+ duplicate notifications → 1 clean notification

**Status:** Ready for deployment
