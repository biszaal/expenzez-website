# CloudWatch Payment Diagnosis - TestFlight Issue

## 🚨 **ROOT CAUSE IDENTIFIED**

The TestFlight payment failures are caused by a **critical backend error** in the subscription management system:

### **Error Details:**

```
ERROR Error updating user group: UserNotFoundException: User does not exist.
```

### **What's Happening:**

1. **User attempts purchase** in TestFlight
2. **RevenueCat processes payment** successfully
3. **Backend tries to update subscription** in database
4. **Backend tries to add user to Cognito group** (premium-users)
5. **Cognito throws UserNotFoundException** - user doesn't exist in user pool
6. **Subscription update fails** - user doesn't get premium access
7. **Frontend shows "Purchase Failed"** - even though payment went through

## 🔧 **IMMEDIATE FIXES REQUIRED**

### **Fix 1: Handle Missing Users in Cognito**

The `updateUserGroup` function needs to handle cases where users don't exist in Cognito:

```typescript
async function updateUserGroup(userId: string, tier: string) {
  try {
    // Check if user exists first
    const userExists = await checkUserExists(userId);
    if (!userExists) {
      console.log(`User ${userId} not found in Cognito, skipping group update`);
      return;
    }

    // Remove from old group
    const oldGroup = tier === "premium" ? "free-users" : "premium-users";
    try {
      await cognito.send(
        new AdminRemoveUserFromGroupCommand({
          UserPoolId: USER_POOL_ID,
          Username: userId,
          GroupName: oldGroup,
        })
      );
    } catch (error) {
      // User might not be in any group yet
      console.log(`User ${userId} not in group ${oldGroup}`);
    }

    // Add to new group
    const newGroup = tier === "premium" ? "premium-users" : "free-users";
    await cognito.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: USER_POOL_ID,
        Username: userId,
        GroupName: newGroup,
      })
    );

    console.log(`User ${userId} added to group ${newGroup}`);
  } catch (error) {
    console.error("Error updating user group:", error);
    // Don't throw error - subscription update should still succeed
  }
}
```

### **Fix 2: Create User in Cognito if Missing**

Add a function to create users in Cognito when they don't exist:

```typescript
async function ensureUserExists(userId: string, email: string) {
  try {
    await cognito.send(
      new AdminGetUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: userId,
      })
    );
    return true; // User exists
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      // Create user
      await cognito.send(
        new AdminCreateUserCommand({
          UserPoolId: USER_POOL_ID,
          Username: userId,
          UserAttributes: [
            { Name: "email", Value: email },
            { Name: "email_verified", Value: "true" },
          ],
          TemporaryPassword: generateTemporaryPassword(),
          MessageAction: "SUPPRESS",
        })
      );
      console.log(`Created user ${userId} in Cognito`);
      return true;
    }
    throw error;
  }
}
```

### **Fix 3: Update Subscription Flow**

Modify the subscription creation flow to ensure users exist:

```typescript
async function createSubscription(userId: string, email: string, tier: string) {
  try {
    // Ensure user exists in Cognito
    await ensureUserExists(userId, email);

    // Create subscription in database
    const subscription = await createSubscriptionInDB(userId, tier);

    // Update user group
    await updateUserGroup(userId, tier);

    return subscription;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}
```

## 🎯 **WHY THIS HAPPENS IN TESTFLIGHT**

1. **TestFlight users** may not be properly registered in your Cognito user pool
2. **RevenueCat purchases** work fine (Apple handles payment)
3. **Backend subscription management** fails when trying to update Cognito groups
4. **User gets charged** but doesn't get premium access

## 📱 **IMMEDIATE ACTIONS**

### **Action 1: Deploy Backend Fix**

Update the subscription management function to handle missing users gracefully.

### **Action 2: Test with Existing Users**

Ensure your TestFlight test users are properly registered in Cognito.

### **Action 3: Monitor Logs**

Watch CloudWatch logs after deploying the fix to ensure no more UserNotFoundException errors.

## 🔍 **VERIFICATION STEPS**

1. **Check Cognito User Pool** - Verify test users exist
2. **Deploy backend fix** - Handle missing users gracefully
3. **Test purchase flow** - Should work without Cognito errors
4. **Monitor CloudWatch** - No more UserNotFoundException errors

## 📊 **EXPECTED RESULTS**

After fixing:

- ✅ **Payments work** in TestFlight
- ✅ **Users get premium access** immediately
- ✅ **No more Cognito errors** in CloudWatch
- ✅ **Subscription status updates** correctly

---

**The issue is NOT with RevenueCat or Apple payments - it's with your backend subscription management system failing to handle users who don't exist in Cognito.**
