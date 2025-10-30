# Professional Email Templates - Setup Guide

**Date:** October 30, 2025
**Status:** ✅ Backend Deployed - AWS SES Verification Required

---

## 🎉 What Was Done

### 1. Email Templates Created
Created beautiful, professional HTML email templates in `/functions/lib/emailTemplates.ts`:
- **Verification Email** - Welcome message with 6-digit code
- **Password Reset Email** - Secure password reset with 6-digit code
- **Security Alert Email** - New device login notifications

**Features:**
- Modern gradient design with brand colors (#6366f1 indigo)
- Fully responsive (mobile-friendly)
- Professional layout with logo, clear CTAs
- Security notices and best practices
- Plain text fallback for email clients that don't support HTML

### 2. Lambda Functions Deployed
✅ **customVerificationEmail** - `expenzez-backend-dev-customVerificationEmail`
- Endpoint: `POST /auth/send-verification-email`
- Sends professional verification emails with beautiful HTML
- Generates 6-digit codes with 15-minute expiry

✅ **forgotPasswordCustom** - `expenzez-backend-dev-forgotPasswordCustom`
- Endpoint: `POST /auth/forgot-password-custom`
- Sends professional password reset emails
- Generates 6-digit reset codes with 15-minute expiry

### 3. serverless.yml Updated
Added HTTP API endpoints for custom email functions with proper configuration.

---

## ⚠️ REQUIRED: AWS SES Email Verification

The Lambda functions are deployed but **cannot send emails yet** because the sender email needs to be verified in AWS SES.

### Step 1: Verify Sender Email Address

**Option A: Verify Single Email (Easiest)**
1. Go to [AWS SES Console](https://console.aws.amazon.com/ses/home?region=eu-west-2#/verified-identities)
2. Click **"Create identity"**
3. Select **"Email address"**
4. Enter: `noreply@expenzez.com`
5. Click **"Create identity"**
6. AWS will send a verification email to `noreply@expenzez.com`
7. Check that inbox and click the verification link

**Option B: Verify Entire Domain (Recommended for Production)**
1. Go to [AWS SES Console](https://console.aws.amazon.com/ses/home?region=eu-west-2#/verified-identities)
2. Click **"Create identity"**
3. Select **"Domain"**
4. Enter: `expenzez.com`
5. Follow instructions to add DNS records (TXT, CNAME, MX)
6. Once verified, you can send from any `*@expenzez.com` email

### Step 2: Request Production Access (If Needed)

If your AWS SES account is in **Sandbox mode**, you can only send to verified email addresses. To send to all users:

1. Go to [AWS SES Console](https://console.aws.amazon.com/ses/home?region=eu-west-2)
2. Click **"Account dashboard"** in left sidebar
3. Check if it says "Sandbox" or "Production"
4. If Sandbox, click **"Request production access"**
5. Fill out the form explaining your use case
6. AWS typically approves within 24 hours

---

## 📋 Testing the Email Templates

### Test Verification Email

```bash
curl -X POST https://kaw56m1bl7.execute-api.eu-west-2.amazonaws.com/auth/send-verification-email \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user_123"
  }'
```

**Expected Response:**
```json
{
  "message": "Verification code sent to user@example.com",
  "success": true,
  "email": "user@example.com",
  "expiresIn": 15
}
```

### Test Password Reset Email

```bash
curl -X POST https://kaw56m1bl7.execute-api.eu-west-2.amazonaws.com/auth/forgot-password-custom \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user_123"
  }'
```

**Expected Response:**
```json
{
  "message": "Password reset code sent to user@example.com",
  "success": true,
  "email": "user@example.com",
  "expiresIn": 15
}
```

---

## 🔧 Frontend Integration

### Update Auth Service

The frontend needs to call these new endpoints instead of the default Cognito ones.

**File:** `expenzez-frontend/src/services/api/auth.ts` (or similar)

#### For Verification Email:

```typescript
// BEFORE: Using Cognito default
await Auth.resendSignUp(username);

// AFTER: Using custom endpoint
await axios.post('/auth/send-verification-email', { username });
```

#### For Password Reset:

```typescript
// BEFORE: Using Cognito default
await Auth.forgotPassword(username);

// AFTER: Using custom endpoint
await axios.post('/auth/forgot-password-custom', { username });
```

---

## 📊 Email Template Preview

### Verification Email
```
┌─────────────────────────────────────────┐
│                                         │
│   [Expenzez Logo]                      │
│   Account Verification                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│   Hello John! 👋                        │
│                                         │
│   Welcome to Expenzez! We're excited... │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ YOUR VERIFICATION CODE          │  │
│   │                                 │  │
│   │        4 9 3 6 8 4            │  │
│   └─────────────────────────────────┘  │
│                                         │
│   🔒 Security Notice                   │
│   This code is valid for 15 minutes.   │
│                                         │
├─────────────────────────────────────────┤
│   Thank you for using Expenzez!        │
│   Expenzez - Smart Expense Tracking    │
└─────────────────────────────────────────┘
```

### Password Reset Email
```
┌─────────────────────────────────────────┐
│                                         │
│   [Expenzez Logo]                      │
│   Password Reset                        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│   Hello John,                           │
│                                         │
│   We received a request to reset...    │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ PASSWORD RESET CODE             │  │
│   │                                 │  │
│   │        3 7 9 4 5 2            │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ⏰ This code expires in 15 minutes   │
│                                         │
│   🔒 Security Notice                   │
│   If you didn't request this...        │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

- [x] Email templates created
- [x] Lambda functions coded
- [x] serverless.yml updated
- [x] Functions deployed to AWS
- [x] HTTP endpoints accessible
- [ ] **SES sender email verified** ⚠️ **YOU ARE HERE**
- [ ] SES production access requested (if needed)
- [ ] Frontend updated to use new endpoints
- [ ] End-to-end testing completed
- [ ] Monitoring and logging verified

---

## 🚨 Current Issue: Why Emails Look Ugly

**Problem:** Cognito is using default `no-reply@verificationemail.com` sender which sends plain-text emails.

**Solution:** Once you verify `noreply@expenzez.com` in SES, update the frontend to call:
- `/auth/send-verification-email` instead of Cognito's default
- `/auth/forgot-password-custom` instead of `/auth/forgot-password`

---

## 📖 Next Steps

1. **Verify SES Email** (see Step 1 above) ⚠️ **REQUIRED**
2. **Test endpoints** with curl commands above
3. **Update frontend** to call new endpoints
4. **Deploy frontend** changes
5. **Test end-to-end** - register new user and trigger password reset
6. **Monitor logs** in CloudWatch

---

## 🔍 Troubleshooting

### Issue: "Email address is not verified"

**Error:**
```json
{
  "message": "Email address is not verified. The following identities failed the check..."
}
```

**Solution:** Complete Step 1 above to verify `noreply@expenzez.com` in SES.

### Issue: "User has no email address"

**Error:**
```json
{
  "message": "User has no email address"
}
```

**Solution:** Ensure the Cognito user has an email attribute set. Check in AWS Cognito Console.

### Issue: Frontend still receives ugly emails

**Cause:** Frontend is still calling Cognito's default endpoints.

**Solution:** Update frontend code to use new custom endpoints (see Frontend Integration section).

---

## 📚 Resources

- [AWS SES Email Verification](https://docs.aws.amazon.com/ses/latest/dg/verify-addresses-and-domains.html)
- [AWS SES Production Access](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [Email Template Code](/functions/lib/emailTemplates.ts)
- [Custom Email Lambda Functions](/functions/auth/customVerificationEmail.ts)

---

**Status:** Backend ready, waiting for SES verification ✅
**ETA to Complete:** 5-10 minutes (after email verification)
