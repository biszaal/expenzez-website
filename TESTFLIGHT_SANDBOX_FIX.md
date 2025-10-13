# 🚨 TestFlight Sandbox Fix - RevenueCat Documentation

## 🔍 **ROOT CAUSE IDENTIFIED**

Based on [RevenueCat's sandbox testing documentation](https://www.revenuecat.com/docs/test-and-launch/sandbox), your TestFlight issue is because you're using the **Test Store API key** instead of the **Apple sandbox API key**.

## 📚 **REVENUECAT TESTING ENVIRONMENTS**

### **1. Test Store (Current Issue)**

- ✅ **Works in development** (Expo Go, development builds)
- ❌ **Doesn't work in TestFlight**
- ✅ **No platform setup required**
- ⚠️ **Requires separate API key for production**

### **2. Platform Sandboxes (Required for TestFlight)**

- ✅ **Works in TestFlight**
- ✅ **Tests complete end-to-end integration**
- ✅ **Required before production**
- ⚠️ **Requires App Store Connect setup**

## 🛠️ **IMMEDIATE FIX STEPS**

### **Step 1: Verify Your API Key Type**

**Check RevenueCat Dashboard:**

1. Go to [RevenueCat Dashboard](https://app.revenuecat.com/apps)
2. Select your **Expenzez** app
3. Go to **API Keys** section
4. Look for **two different keys**:
   - **Test Store Key** (for development)
   - **Apple Sandbox Key** (for TestFlight)

### **Step 2: Get Apple Sandbox API Key**

**If you only see one API key:**

1. **Connect App Store Connect** to RevenueCat
2. **Go to Integrations** → **App Store Connect**
3. **Connect your Apple Developer account**
4. **Select your Expenzez app**
5. **Get the Apple sandbox API key**

### **Step 3: Update EAS Configuration**

**File**: `expenzez-frontend/eas.json`

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_REVENUECAT_IOS_API_KEY": "appl_YOUR_APPLE_SANDBOX_KEY_HERE"
      }
    }
  }
}
```

### **Step 4: Configure App Store Connect Products**

**Required for Apple Sandbox:**

1. **Go to App Store Connect**
2. **Create subscription products**:
   - `expenzez_premium_monthly`
   - `expenzez_premium_annual`
3. **Submit for review** (can take 24-48 hours)

### **Step 5: Configure RevenueCat Offerings**

**In RevenueCat Dashboard:**

1. **Add products** to RevenueCat
2. **Create offerings** with your products
3. **Set as current offering**

## 🚀 **RECOMMENDED WORKFLOW**

Based on RevenueCat's documentation:

### **1. Development Phase (Current)**

- ✅ **Use Test Store** for rapid development
- ✅ **Test purchase flow** without platform setup
- ✅ **Iterate quickly** on UI/UX

### **2. Pre-Launch Phase (Next)**

- 🔄 **Switch to Apple Sandbox API key**
- 🔄 **Test in TestFlight** with real Apple sandbox
- 🔄 **Verify end-to-end integration**

### **3. Production Phase (Final)**

- 🎯 **Use Apple Sandbox key** (same as TestFlight)
- 🎯 **Deploy to App Store**
- 🎯 **Real purchases work**

## 🔧 **DEBUGGING STEPS**

### **Check Current API Key Type**

```bash
# Add this to your app for debugging:
console.log('Current API Key:', process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY);
console.log('Is Test Store:', process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY?.includes('test'));
```

### **Test Store vs Sandbox Detection**

```typescript
// Add this to RevenueCat service:
const isTestStore = apiKey.includes("test") || apiKey.includes("sandbox");
console.log("Using Test Store:", isTestStore);
```

## 📱 **EXPECTED BEHAVIOR**

### **With Test Store Key:**

- ✅ **Works in Expo Go**
- ✅ **Works in development builds**
- ❌ **Fails in TestFlight** ("No subscription options available")

### **With Apple Sandbox Key:**

- ✅ **Works in TestFlight**
- ✅ **Works in development builds**
- ✅ **Works in production**

## 🎯 **IMMEDIATE ACTION REQUIRED**

1. **Check RevenueCat Dashboard** for Apple sandbox API key
2. **Update EAS configuration** with correct key
3. **Configure App Store Connect** products
4. **Rebuild and test** in TestFlight

## 📚 **REFERENCE**

- [RevenueCat Sandbox Testing](https://www.revenuecat.com/docs/test-and-launch/sandbox)
- [RevenueCat Test Store vs Platform Sandboxes](https://www.revenuecat.com/docs/test-and-launch/sandbox#test-store-vs-platform-sandboxes)
- [RevenueCat Launch Checklist](https://www.revenuecat.com/docs/launch-checklist)

---

**Status**: 🚨 **CRITICAL - API KEY MISMATCH**  
**Solution**: **Switch to Apple Sandbox API key for TestFlight**  
**Next Action**: **Get Apple sandbox API key from RevenueCat Dashboard**
