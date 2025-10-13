# RevenueCat Offerings Debug Guide

## 🚨 Current Issue: "No subscription options are available"

The TestFlight app is showing "Purchase Error" and "No subscription options are available" because RevenueCat cannot find any configured offerings.

## 🔍 Root Cause Analysis

The error occurs in this flow:
1. User taps subscription option
2. App calls `RevenueCatService.getCurrentOffering()`
3. RevenueCat returns `null` or empty offerings
4. App shows "No subscription options are available"

## ✅ Step-by-Step Fix

### 1. Check RevenueCat Dashboard Configuration

**Go to RevenueCat Dashboard → Products → Offerings**

**Required Setup:**
- [ ] Create an "Offering" (e.g., "default")
- [ ] Add your App Store Connect products to the offering
- [ ] Set the offering as "Current" (not archived)
- [ ] Verify products are properly linked

**Example Configuration:**
```
Offering Name: "default"
Status: Current
Products:
  - monthly_premium (com.expenzez.premium.monthly)
  - yearly_premium (com.expenzez.premium.yearly)
```

### 2. Verify App Store Connect Products

**Go to App Store Connect → My Apps → [Your App] → Features → In-App Purchases**

**Required Status:**
- [ ] Products are "Ready to Submit" or "Approved"
- [ ] Products are not "Rejected" or "Missing Metadata"
- [ ] Auto-renewable subscriptions are properly configured

**Product IDs to verify:**
- `com.expenzez.premium.monthly`
- `com.expenzez.premium.yearly`

### 3. Check RevenueCat API Key Configuration

**Verify in EAS Build:**
```bash
# Check if API key is properly set
eas build:list --platform=ios --limit=1
```

**Expected API Key Format:**
- iOS: `appl_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Should NOT contain "YOUR_" or "NOT_CONFIGURED"

### 4. Test RevenueCat Configuration

**Add Debug Logging:**
```typescript
// In revenueCatService.ts
console.log("🔧 [RevenueCat] API Key:", apiKey);
console.log("🔧 [RevenueCat] Platform:", Platform.OS);
console.log("🔧 [RevenueCat] All offerings:", Object.keys(offerings.all));
console.log("🔧 [RevenueCat] Current offering:", offerings.current?.identifier);
```

### 5. Common Issues & Solutions

#### Issue: "No current offering found"
**Solution:** 
- Go to RevenueCat Dashboard
- Create a new offering
- Add your products to the offering
- Set it as "Current"

#### Issue: "Products not found"
**Solution:**
- Verify product IDs match exactly between App Store Connect and RevenueCat
- Ensure products are approved in App Store Connect
- Check that products are added to the offering

#### Issue: "API key not working"
**Solution:**
- Verify API key is correct in RevenueCat dashboard
- Check that API key is properly set in EAS build
- Ensure you're using the correct environment (production vs sandbox)

### 6. Testing Steps

1. **Check RevenueCat Dashboard:**
   - Go to RevenueCat → Products → Offerings
   - Verify you have a "Current" offering
   - Verify products are added to the offering

2. **Check App Store Connect:**
   - Go to App Store Connect → In-App Purchases
   - Verify products are "Ready to Submit" or "Approved"
   - Note: Products may take 24-48 hours to be approved

3. **Test in TestFlight:**
   - Try making a purchase
   - Check console logs for RevenueCat debug messages
   - Look for "No current offering found" warnings

### 7. Expected Console Output (Success)

```
🔧 [RevenueCat] Production API Key: appl_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
🔧 [RevenueCat] Platform: ios
🔧 [RevenueCat] Environment: Production
🔧 [RevenueCat] Configured successfully
🔧 [RevenueCat] Fetching production offerings...
🔧 [RevenueCat] All offerings: ["default"]
🔧 [RevenueCat] Current offering: default
🔧 [RevenueCat] Available packages: 2
```

### 8. Expected Console Output (Failure)

```
⚠️ [RevenueCat] No current offering found. Check RevenueCat dashboard configuration.
⚠️ [RevenueCat] Make sure you have created offerings in RevenueCat dashboard.
⚠️ [RevenueCat] Current status:
- App Store Connect: Products created ✅
- RevenueCat: Products added to offerings ✅
- Apple: Products waiting for review ⏳
⚠️ [RevenueCat] Expected approval time: 24-48 hours
```

## 🎯 Next Steps

1. **Check RevenueCat Dashboard** - Ensure offerings are configured
2. **Check App Store Connect** - Ensure products are approved
3. **Test in TestFlight** - Look for debug messages
4. **Contact Support** - If issues persist, contact RevenueCat support

## 📞 Support Resources

- **RevenueCat Documentation:** https://docs.revenuecat.com/
- **RevenueCat Support:** https://support.revenuecat.com/
- **App Store Connect Help:** https://developer.apple.com/help/

---

**Note:** This issue is typically caused by missing or misconfigured offerings in the RevenueCat dashboard, not by the backend code.
