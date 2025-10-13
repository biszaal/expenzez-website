# 🚨 RevenueCat Offerings Setup - CRITICAL FIX

## 🔍 **PROBLEM IDENTIFIED**

The **"No subscription options are available"** error on TestFlight indicates that **RevenueCat offerings are not properly configured**. Even though the API key is correct, the offerings/products are missing.

## 🛠️ **STEP-BY-STEP FIX**

### **Step 1: Configure Products in App Store Connect**

1. **Go to App Store Connect**

   - Visit [App Store Connect](https://appstoreconnect.apple.com)
   - Select your app: **Expenzez**

2. **Create In-App Purchases**

   - Go to **Features** → **In-App Purchases**
   - Click **"+"** to create new subscription
   - Create **Auto-Renewable Subscriptions**

3. **Create Subscription Group**

   - **Reference Name**: `Expenzez Premium`
   - **App Store Display Name**: `Expenzez Premium`

4. **Create Subscription Products**

   **Monthly Subscription:**

   - **Product ID**: `expenzez_premium_monthly`
   - **Reference Name**: `Premium Monthly`
   - **Subscription Duration**: 1 Month
   - **Price**: £4.99
   - **Free Trial**: 14 days

   **Annual Subscription:**

   - **Product ID**: `expenzez_premium_annual`
   - **Reference Name**: `Premium Annual`
   - **Subscription Duration**: 1 Year
   - **Price**: £49.99
   - **Free Trial**: 14 days

5. **Submit for Review**
   - Fill in all required metadata
   - Submit for App Store review
   - **Wait for approval** (can take 24-48 hours)

### **Step 2: Configure RevenueCat Dashboard**

1. **Go to RevenueCat Dashboard**

   - Visit [RevenueCat Dashboard](https://app.revenuecat.com/apps)
   - Select your app: **Expenzez**

2. **Add Products**

   - Go to **Products** tab
   - Click **"Add Product"**
   - Add both products:
     - `expenzez_premium_monthly`
     - `expenzez_premium_annual`

3. **Create Offerings**

   - Go to **Offerings** tab
   - Click **"New Offering"**
   - **Offering Identifier**: `default`
   - **Display Name**: `Premium Membership`

4. **Add Packages to Offering**

   - **Monthly Package**:

     - **Identifier**: `expenzez_premium_monthly`
     - **Product**: `expenzez_premium_monthly`
     - **Package Type**: Monthly

   - **Annual Package**:
     - **Identifier**: `expenzez_premium_annual`
     - **Product**: `expenzez_premium_annual`
     - **Package Type**: Annual

5. **Set as Current Offering**
   - Make sure the `default` offering is set as **current**

### **Step 3: Link App Store Connect**

1. **In RevenueCat Dashboard**

   - Go to **Integrations** → **App Store Connect**
   - Click **"Connect App Store Connect"**
   - Follow the authentication process
   - Select your app: **Expenzez**

2. **Verify Products**
   - Go to **Products** tab
   - Verify that products show as **"Active"**
   - If they show as **"Inactive"**, check App Store Connect status

### **Step 4: Test Configuration**

1. **Check RevenueCat Dashboard**

   - Go to **Offerings** tab
   - Verify `default` offering exists
   - Verify packages are properly configured

2. **Test in Development Build**

   ```bash
   # Build development version
   eas build --platform ios --profile development

   # Install and test
   # Check console logs for RevenueCat initialization
   ```

3. **Check Console Logs**
   - Look for: `✅ [RevenueCat] Initialized successfully`
   - Look for: `✅ [RevenueCat] Returning mock current offering for Expo Go`
   - **In TestFlight**: Should show real offerings, not mock

### **Step 5: Debug Common Issues**

#### **Issue 1: Products Not Active**

**Symptom**: Products show as "Inactive" in RevenueCat
**Fix**:

- Check App Store Connect product status
- Ensure products are submitted and approved
- Wait for App Store review completion

#### **Issue 2: Offerings Not Loading**

**Symptom**: `getCurrentOffering()` returns `null`
**Fix**:

- Verify offering identifier is `default`
- Check that offering is set as current
- Ensure products are linked to offering

#### **Issue 3: API Key Issues**

**Symptom**: RevenueCat initialization fails
**Fix**:

- Verify API key is correct in `eas.json`
- Check that environment variables are set
- Ensure API key has proper permissions

## 🚀 **DEPLOYMENT STEPS**

### **1. Update EAS Configuration**

**File**: `expenzez-frontend/eas.json`

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_REVENUECAT_IOS_API_KEY": "appl_yfPFpbhaPCTmblZKDJMHMyRKhKH"
      }
    }
  }
}
```

### **2. Build and Deploy**

```bash
# Build for TestFlight
eas build --platform ios --profile production

# Deploy to TestFlight
eas submit --platform ios
```

### **3. Test in TestFlight**

1. **Install TestFlight build**
2. **Navigate to Premium page**
3. **Check for offerings** (should show real products)
4. **Test purchase flow**

## 📱 **EXPECTED RESULT**

### **Before Fix:**

- ❌ "No subscription options are available"
- ❌ "Purchase Error" dialogs
- ❌ Mock offerings in TestFlight

### **After Fix:**

- ✅ Real subscription offerings load
- ✅ Apple payment sheet appears
- ✅ Purchase flow works correctly
- ✅ Subscription activates properly

## 🔧 **DEBUGGING COMMANDS**

### **Check RevenueCat Status**

```bash
# In your app, add this debug code:
console.log('RevenueCat API Key:', process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY);
console.log('RevenueCat Initialized:', RevenueCatService.initialized);
```

### **Test Offerings**

```bash
# Add this to test offerings:
const offerings = await RevenueCatService.getCurrentOffering();
console.log('Current Offering:', offerings);
```

## ⚠️ **IMPORTANT NOTES**

1. **App Store Review Required**: Products must be approved by Apple
2. **RevenueCat Sync**: Changes can take up to 1 hour to sync
3. **TestFlight Testing**: Use sandbox environment for testing
4. **Production**: Real purchases only work in production builds

## 🎯 **NEXT STEPS**

1. **Configure App Store Connect** products (if not done)
2. **Set up RevenueCat offerings** (if not done)
3. **Link App Store Connect** to RevenueCat
4. **Build and test** in TestFlight
5. **Verify purchase flow** works correctly

---

**Status**: 🚨 **CRITICAL - BLOCKING TESTFLIGHT**  
**Priority**: **HIGHEST**  
**Action Required**: **Configure RevenueCat offerings immediately**
