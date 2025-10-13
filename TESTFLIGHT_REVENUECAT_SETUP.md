# 🚨 TestFlight RevenueCat Setup - URGENT FIX NEEDED

## 🔍 **PROBLEM IDENTIFIED**

The app is showing **"Purchase Error"** and **"No subscription options are available"** on TestFlight because:

1. **RevenueCat API Keys are not configured** - Still using placeholder values
2. **No environment variables set** - API keys not available in production build
3. **RevenueCat not initialized** - Service fails to connect to RevenueCat servers

## 🛠️ **IMMEDIATE FIXES REQUIRED**

### **1. Set Up RevenueCat API Keys**

#### **Step 1: Get RevenueCat API Keys**

1. Go to [RevenueCat Dashboard](https://app.revenuecat.com/apps)
2. Select your app: **Expenzez**
3. Go to **API Keys** section
4. Copy the **iOS API Key** (starts with `appl_`)

#### **Step 2: Configure Environment Variables**

**Create `.env` file in frontend:**

```bash
# RevenueCat API Keys
EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=appl_YOUR_ACTUAL_IOS_API_KEY_HERE
EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=goog_YOUR_ACTUAL_ANDROID_API_KEY_HERE
```

**Or set in EAS Build:**

```bash
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY --value "appl_YOUR_ACTUAL_IOS_API_KEY_HERE"
eas secret:create --scope project --name EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY --value "goog_YOUR_ACTUAL_ANDROID_API_KEY_HERE"
```

### **2. Update RevenueCat Service**

**File**: `expenzez-frontend/services/revenueCatService.ts`

**Current Issue:**

```typescript
const REVENUECAT_API_KEY = {
  ios:
    process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY || "appl_YOUR_IOS_API_KEY",
  android:
    process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ||
    "goog_YOUR_ANDROID_API_KEY",
};
```

**Fix Required:**

```typescript
const REVENUECAT_API_KEY = {
  ios:
    process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ||
    "appl_YOUR_ACTUAL_IOS_API_KEY",
  android:
    process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ||
    "goog_YOUR_ACTUAL_ANDROID_API_KEY",
};
```

### **3. Add Better Error Handling**

**Update the service to provide clearer error messages:**

```typescript
static async initialize(userId?: string): Promise<{ success: boolean; error?: string }> {
  if (this.initialized) return { success: true };

  try {
    // Only use mock services in Expo Go
    if (isDevelopmentMode) {
      console.log("🧪 [RevenueCat] Running in Expo Go - using mock services");
      this.initialized = true;
      return { success: true };
    }

    const apiKey = Platform.OS === "ios" ? REVENUECAT_API_KEY.ios : REVENUECAT_API_KEY.android;

    // Check if API key is still placeholder
    if (apiKey.includes("YOUR_") || apiKey.includes("_API_KEY")) {
      const error = `RevenueCat API key not configured. Please set EXPO_PUBLIC_REVENUECAT_${Platform.OS.toUpperCase()}_API_KEY environment variable.`;
      console.error("❌ [RevenueCat]", error);
      return { success: false, error };
    }

    // Validate API key format
    const expectedPrefix = Platform.OS === "ios" ? "appl_" : "goog_";
    if (!apiKey.startsWith(expectedPrefix)) {
      const error = `Invalid ${Platform.OS} API key format. Expected: ${expectedPrefix}xxxxxxxxx`;
      console.error("❌ [RevenueCat]", error);
      return { success: false, error };
    }

    // Configure RevenueCat
    await Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
    await Purchases.configure({ apiKey });

    // Login user if provided
    if (userId) {
      const loginResult = await this.logIn(userId);
      if (!loginResult.success) {
        console.warn("⚠️ [RevenueCat] User login failed, continuing anonymously:", loginResult.error);
      }
    }

    this.initialized = true;
    console.log("✅ [RevenueCat] Initialized successfully for", Platform.OS);
    return { success: true };
  } catch (error: any) {
    const errorMessage = error?.message || "Unknown initialization error";
    console.error("❌ [RevenueCat] Initialization failed:", errorMessage);

    // Only fall back to mock in Expo Go
    if (isDevelopmentMode) {
      console.log("🧪 [RevenueCat] Falling back to mock services for Expo Go");
      this.initialized = true;
      return { success: true };
    }

    return { success: false, error: errorMessage };
  }
}
```

## 🚀 **DEPLOYMENT STEPS**

### **Step 1: Configure API Keys**

```bash
# Set environment variables
export EXPO_PUBLIC_REVENUECAT_IOS_API_KEY="appl_YOUR_ACTUAL_IOS_API_KEY"
export EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY="goog_YOUR_ACTUAL_ANDROID_API_KEY"
```

### **Step 2: Update EAS Build Configuration**

**File**: `expenzez-frontend/eas.json`

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_REVENUECAT_IOS_API_KEY": "appl_YOUR_ACTUAL_IOS_API_KEY",
        "EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY": "goog_YOUR_ACTUAL_ANDROID_API_KEY"
      }
    }
  }
}
```

### **Step 3: Build and Deploy**

```bash
# Build for TestFlight
eas build --platform ios --profile production

# Deploy to TestFlight
eas submit --platform ios
```

## 🔧 **ALTERNATIVE: HARDCODE FOR TESTING**

**If you want to test immediately without environment variables:**

```typescript
const REVENUECAT_API_KEY = {
  ios: "appl_YOUR_ACTUAL_IOS_API_KEY_HERE", // Replace with real key
  android: "goog_YOUR_ACTUAL_ANDROID_API_KEY_HERE", // Replace with real key
};
```

**⚠️ WARNING**: Never commit real API keys to git! Use environment variables for production.

## 📱 **EXPECTED RESULT AFTER FIX**

1. **RevenueCat initializes successfully** in TestFlight
2. **Subscription offerings load** properly
3. **Purchase flow works** with Apple's payment system
4. **No more "Purchase Error"** dialogs
5. **Real subscription processing** through Apple Store

## 🎯 **NEXT STEPS**

1. **Get RevenueCat API keys** from dashboard
2. **Set environment variables** or hardcode temporarily
3. **Update RevenueCat service** with better error handling
4. **Build and deploy** to TestFlight
5. **Test purchase flow** with real Apple Store

---

**Status**: 🚨 **CRITICAL - BLOCKING TESTFLIGHT**  
**Priority**: **HIGHEST**  
**Action Required**: **Configure RevenueCat API keys immediately**
