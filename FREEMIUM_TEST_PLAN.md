# Freemium Tier System - Comprehensive Test Plan

## Test Overview
This document outlines all tests needed to verify the freemium tier system is working correctly across backend and frontend.

---

## Part 1: Backend Tests

### Test 1.1: AI Usage Tier Limits
**Objective:** Verify AI tier limits are enforced correctly

**Setup:**
- User with FREE tier
- User with PREMIUM tier

**Test Cases:**

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 1.1.1 | FREE user attempts 11th AI chat in same day | Returns 403, message mentions "daily limit reached" |
| 1.1.2 | FREE user attempts 51st AI chat in same month | Returns 403, message mentions "monthly limit reached" |
| 1.1.3 | PREMIUM user attempts 51st AI chat in same day | ✅ Success (50/day limit) |
| 1.1.4 | PREMIUM user attempts 2501st AI chat in same month | Returns 403 (2500/month limit) |
| 1.1.5 | FREE user within limit can chat | ✅ Success, increment usage counter |
| 1.1.6 | Usage counter resets at midnight (daily) | Next day, count resets to 0 |

**Verification Command:**
```bash
# Test daily limit (FREE user, 10/day)
curl -X POST https://api-endpoint/ai/chat \
  -H "Authorization: Bearer FREE_USER_TOKEN" \
  -d '{"message": "test"}' \
  # Repeat 11 times, 11th should fail
```

---

### Test 1.2: Budget Tier Limits
**Objective:** Verify budget creation limits are enforced

**Setup:**
- FREE user with 4 existing budgets
- PREMIUM user with 4 existing budgets

**Test Cases:**

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 1.2.1 | FREE user creates 5th budget (at limit) | ✅ Success |
| 1.2.2 | FREE user attempts to create 6th budget | Returns 403, "budget limit reached" |
| 1.2.3 | PREMIUM user creates 50th budget | ✅ Success (unlimited) |
| 1.2.4 | GET /budgets endpoint includes tier info | Response includes tier object with budgetLimit |
| 1.2.5 | Budget response shows budgetsRemaining | Shows "4" for FREE with 1 budget created |

**Verification Command:**
```bash
# Check response includes tier info
curl -X GET https://api-endpoint/budgets \
  -H "Authorization: Bearer FREE_USER_TOKEN"

# Look for response structure:
# { budgets: [...], tier: { subscriptionTier: "FREE", budgetLimit: 5, budgetsRemaining: 1 } }
```

---

### Test 1.3: Subscription Tier Detection in Middleware
**Objective:** Verify req.user.subscriptionTier is populated correctly

**Setup:**
- User with subscription status in Users DynamoDB table
- User without subscription status (new user)

**Test Cases:**

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 1.3.1 | User with PREMIUM tier in Users table | req.user.subscriptionTier = "PREMIUM" |
| 1.3.2 | User with FREE tier in Users table | req.user.subscriptionTier = "FREE" |
| 1.3.3 | User without tier in Users table | Defaults to "FREE" |
| 1.3.4 | Users table lookup fails | Defaults to "FREE", logs warning |
| 1.3.5 | Auth middleware debug logs show tier | Logs include subscription tier fetch |

**Verification:**
- Check CloudWatch logs for "Auth Debug: Subscription tier for [userId]"
- Verify budget API calls use correct tier

---

## Part 2: Frontend Tests

### Test 2.1: Home Screen Premium Components
**Objective:** Verify premium components display correctly on home screen

**Device:** iOS Simulator (latest)

**Test Cases:**

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 2.1.1 | Load home screen as FREE user | ✅ UpgradeBanner visible with "Upgrade to Premium" button |
| 2.1.2 | Load home screen as PREMIUM user | ⚠️ UpgradeBanner still shows (always visible) |
| 2.1.3 | Tap UpgradeBanner "Go Premium" button | Navigates to /subscription/plans |
| 2.1.4 | FeatureShowcase displays 3 features | Shows Budgets (5 vs ∞), AI Chats (10 vs 50), Reports (Basic vs Full) |
| 2.1.5 | Dark mode toggle | Components adjust colors correctly |

**Visual Verification:**
- UpgradeBanner appears between NotificationCard and CompactSpendingSummary
- FeatureShowcase shows color-coded FREE (gray) vs PREMIUM (purple) columns
- All text readable in both light and dark mode

---

### Test 2.2: AI Chat Screen Premium Components
**Objective:** Verify AI limit enforcement and upgrade prompts

**Device:** iOS Simulator

**Test Cases:**

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 2.2.1 | FREE user sends 10 AI messages today | All 10 succeed ✅ |
| 2.2.2 | FREE user attempts 11th AI message | LimitReachedPrompt modal appears |
| 2.2.3 | Modal shows correct info | Shows "AI Chats" limit, "10" current, reset time for tomorrow |
| 2.2.4 | Tap "Upgrade to Premium" in modal | Navigates to /subscription/plans |
| 2.2.5 | Tap "Not Now" in modal | Modal closes, returns to chat input |
| 2.2.6 | FeatureShowcase displays at start | Shows AI Chats Per Day (10 vs 50) |
| 2.2.7 | UpgradeBanner at top of chat | Shows "Upgrade to Premium for 50 daily AI chats" |

**Key Assertions:**
- Modal shows correct reset time (next day at current time)
- Message is clear about limit reached
- Navigation works to subscription page

---

### Test 2.3: Budgets Screen Premium Components
**Objective:** Verify budget limit enforcement and tier display

**Device:** iOS Simulator

**Test Cases:**

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 2.3.1 | FREE user views budgets with 4 created | Banner shows "4/5 budgets created" |
| 2.3.2 | FREE user has FeatureShowcase in empty state | Shows Budgets (5 vs Unlimited), Alerts (Basic vs Advanced) |
| 2.3.3 | FREE user creates 5th budget | ✅ Success, banner updates to "5/5" |
| 2.3.4 | FREE user attempts to create 6th budget | LimitReachedPrompt modal appears |
| 2.3.5 | Modal shows budget limit info | Shows "Budgets" limit, "5" current |
| 2.3.6 | Tap "Upgrade to Premium" button | Navigates to /subscription/plans |
| 2.3.7 | UpgradeBanner appears at top | Shows budget counter |

**Assertions:**
- Budget counter in banner updates in real-time
- Modal message is specific to budgets (not generic)
- Navigation to subscription works

---

## Part 3: Integration Tests

### Test 3.1: Complete Free User Journey
**Objective:** Verify complete user flow for FREE tier user

**Scenario:**
1. User registers (defaults to FREE tier)
2. Views home screen
3. Creates 2 budgets
4. Views AI assistant
5. Sends 5 AI messages
6. Views upgrade banner
7. Taps to view subscription plans

**Expected Flow:**
- ✅ Home shows UpgradeBanner + FeatureShowcase
- ✅ Budgets screen shows 2/5 counter
- ✅ AI screen shows upgrade banner
- ✅ Sending 5 AI messages succeeds
- ✅ Can send 5 more (total 10) before hitting limit
- ✅ Navigation to subscription plans works
- ✅ All tier info displays correctly

---

### Test 3.2: Complete Premium User Journey
**Objective:** Verify complete user flow for PREMIUM tier user

**Scenario:**
1. FREE user purchases PREMIUM subscription
2. RevenueCat webhook triggers
3. Backend updates Users table
4. User refreshes app (new token)
5. Views home screen
6. Attempts to create 6th budget
7. Sends 40 AI messages
8. All operations succeed without limits

**Expected Flow:**
- ✅ Webhook updates subscriptionTier to PREMIUM
- ✅ Auth middleware fetches PREMIUM tier
- ✅ 6th budget creation succeeds (no limit)
- ✅ 40 AI messages sent (no limit on daily)
- ✅ UpgradeBanner still shows (not hidden)
- ✅ No LimitReachedPrompt modals appear

---

### Test 3.3: Trial Expiration
**Objective:** Verify trial to free conversion

**Scenario:**
1. User in 14-day trial
2. Trial expires
3. Next login after expiry
4. User downgrades to FREE tier

**Expected Flow:**
- ✅ RevenueCat detects expiration
- ✅ Webhook receives EXPIRATION event
- ✅ subscriptionTier set to FREE
- ✅ subscriptionStatus set to "expired"
- ✅ AI limits enforce 10/day
- ✅ Budget limits enforce 5 max

---

## Part 4: Error Handling Tests

### Test 4.1: Backend Error Scenarios
**Objective:** Verify graceful error handling

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 4.1.1 | DynamoDB user lookup fails | Log warning, default to FREE |
| 4.1.2 | Malformed request body | Return 400 with validation errors |
| 4.1.3 | Missing authorization header | Return 401 "Access token required" |
| 4.1.4 | Expired JWT token | Return 403 "Invalid or expired token" |
| 4.1.5 | Budget count query fails | Return 500 with error message |

---

### Test 4.2: Frontend Error Scenarios
**Objective:** Verify app stability with errors

| Test | Scenario | Expected Result |
|------|----------|-----------------|
| 4.2.1 | API call fails when creating budget | Show error alert, stay on screen |
| 4.2.2 | AI message request fails | Show error in chat, don't close UI |
| 4.2.3 | Subscription tier fetch fails | Default to FREE, show components |
| 4.2.4 | Navigation to subscription fails | Show navigation error, handle gracefully |

---

## Part 5: Performance Tests

### Test 5.1: Response Times
**Objective:** Ensure freemium checks don't slow down API

| Endpoint | Max Latency | Test |
|----------|-------------|------|
| POST /budgets | 500ms | Create 50 budgets, measure avg time |
| POST /ai/chat | 1000ms | Send 20 messages, measure avg time |
| GET /budgets | 300ms | Fetch 50 budgets, measure time |

---

## Part 6: Data Consistency Tests

### Test 6.1: Usage Counters
**Objective:** Verify usage tracking is accurate

**Test Cases:**
- [ ] Daily counter increments correctly
- [ ] Monthly counter increments correctly
- [ ] Counters persist across app restarts
- [ ] Counters reset at correct times
- [ ] Concurrent requests don't double-count

---

## Testing Checklist

### Before Deployment
- [ ] All backend unit tests pass
- [ ] All API integration tests pass
- [ ] Freemium limits enforced correctly
- [ ] Subscription tier detection works
- [ ] Auth middleware returns correct tier

### Device Testing (iOS)
- [ ] Home screen components visible
- [ ] UpgradeBanner navigates correctly
- [ ] FeatureShowcase displays properly
- [ ] LimitReachedPrompt modal works
- [ ] Dark mode colors correct

### Device Testing (Android)
- [ ] All iOS tests on Android
- [ ] Touch response times acceptable
- [ ] Navigation smooth and responsive

### Production Testing (After Deployment)
- [ ] Monitor CloudWatch logs for errors
- [ ] Check error rates before/after
- [ ] Verify subscription webhook events
- [ ] Test with real paid subscriptions
- [ ] Monitor tier enforcement on API

---

## Test Environment Setup

### Prerequisites
```bash
# Backend testing
export AWS_REGION=eu-west-2
export COGNITO_USER_POOL_ID=eu-west-2_XXXXXXXXXX

# Frontend testing
npm start  # Expo development server
npm run ios  # iOS simulator
npm run android  # Android emulator
```

### Test Accounts
| Account | Email | Tier | Notes |
|---------|-------|------|-------|
| TestUser1 | test1@expenzez.com | FREE | For tier limit testing |
| TestUser2 | test2@expenzez.com | PREMIUM | For unlimited testing |
| TestUser3 | test3@expenzez.com | FREE->PREMIUM | For upgrade testing |

---

## Success Criteria

The freemium system is **production-ready** when:

✅ All 50+ tests pass
✅ No tier enforcement errors in logs
✅ Response times meet performance targets
✅ Subscription tier detection 99%+ accurate
✅ All UI components display correctly
✅ Navigation flows work end-to-end
✅ Error handling is graceful
✅ Mobile app handles all scenarios smoothly

---

## Known Issues / Limitations

- RevenueCat sandbox vs production environments may have differences
- Trial end detection relies on RevenueCat webhook (potential 5-minute delay)
- Usage counters reset at UTC midnight, not user's local timezone
- DynamoDB throttling could cause tier lookup failures (fallback to FREE)

---

## Post-Deployment Monitoring

After production deployment:
1. Monitor CloudWatch logs for auth middleware
2. Track tier detection success rate
3. Alert if > 0.1% tier lookups fail
4. Monitor budget creation 403 error rate
5. Track AI limit hits (useful for conversion analysis)
6. Monitor subscription webhook events

