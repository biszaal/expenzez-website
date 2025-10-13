# 🧪 RevenueCat Testing with Expo - Complete Guide

## 🚨 **CRITICAL ISSUE: Expo Go Limitations**

**You cannot test real Apple purchases in Expo Go!** This is why you're seeing the "Welcome to Premium!" modal without going through Apple's payment system.

### **❌ What Doesn't Work in Expo Go:**
- Real Apple Store purchases
- RevenueCat purchase flows
- Sandbox testing
- Actual subscription activation
- Apple's payment system integration

### **✅ What Works in Expo Go:**
- UI/UX testing
- Navigation flows
- Basic app functionality
- RevenueCat initialization (but purchases fail)

## 🔧 **SOLUTIONS FOR TESTING**

### **Option 1: Development Build (RECOMMENDED)**

Create a development build that includes native modules:

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Create development build for iOS
eas build --platform ios --profile development
```

**Benefits:**
- ✅ Full RevenueCat functionality
- ✅ Real Apple Store purchases
- ✅ Sandbox testing
- ✅ Native modules work

### **Option 2: Bare React Native Project**

If you need full control:

```bash
# Eject from Expo
npx expo eject

# Install pods
cd ios && pod install

# Run on device
npx react-native run-ios
```

### **Option 3: Expo Development Client**

Use Expo's development client with custom native code:

```bash
# Install development client
npx expo install expo-dev-client

# Create development build
eas build --profile development
```

## 🛠️ **PROPER REVENUECAT IMPLEMENTATION**

### **1. Update Your RevenueCat Service**

Create a proper service that handles Expo limitations:

```typescript
// services/revenueCatService.ts
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import Constants from 'expo-constants';

class RevenueCatService {
  private isExpoGo = Constants.appOwnership === 'expo';
  
  async initialize() {
    if (this.isExpoGo) {
      console.log('🧪 Running in Expo Go - RevenueCat purchases disabled');
      return { success: false, error: 'Expo Go limitation' };
    }

    try {
      const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY;
      
      if (!apiKey || apiKey.includes('YOUR_')) {
        throw new Error('RevenueCat API key not configured');
      }

      await Purchases.configure({ apiKey });
      console.log('✅ RevenueCat initialized successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ RevenueCat initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  async getCurrentOffering() {
    if (this.isExpoGo) {
      // Return mock data for Expo Go
      return {
        availablePackages: [
          {
            identifier: 'expenzez_premium_monthly',
            packageType: 'MONTHLY',
            product: {
              identifier: 'expenzez_premium_monthly',
              description: 'Monthly Premium Subscription',
              title: 'Monthly Premium',
              price: 4.99,
              priceString: '£4.99',
              currencyCode: 'GBP'
            }
          },
          {
            identifier: 'expenzez_premium_annual',
            packageType: 'ANNUAL',
            product: {
              identifier: 'expenzez_premium_annual',
              description: 'Annual Premium Subscription',
              title: 'Annual Premium',
              price: 49.99,
              priceString: '£49.99',
              currencyCode: 'GBP'
            }
          }
        ]
      };
    }

    try {
      const offerings = await Purchases.getOfferings();
      return offerings.current;
    } catch (error) {
      console.error('Error fetching offerings:', error);
      return null;
    }
  }

  async purchasePackage(packageToPurchase: any) {
    if (this.isExpoGo) {
      // Simulate purchase for Expo Go
      console.log('🧪 Expo Go: Simulating purchase');
      return {
        success: true,
        customerInfo: {
          entitlements: {
            active: {
              premium: {
                isActive: true,
                willRenew: true
              }
            }
          }
        }
      };
    }

    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      return {
        success: true,
        customerInfo
      };
    } catch (error) {
      console.error('Purchase failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async restorePurchases() {
    if (this.isExpoGo) {
      console.log('🧪 Expo Go: Simulating restore');
      return {
        success: true,
        customerInfo: {
          entitlements: {
            active: {
              premium: {
                isActive: true,
                willRenew: true
              }
            }
          }
        }
      };
    }

    try {
      const customerInfo = await Purchases.restorePurchases();
      return {
        success: true,
        customerInfo
      };
    } catch (error) {
      console.error('Restore failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new RevenueCatService();
```

### **2. Update Subscription Context**

Modify your subscription context to handle Expo Go limitations:

```typescript
// contexts/SubscriptionContext.tsx
const purchaseSubscription = async (packageId: string): Promise<boolean> => {
  try {
    console.log('🛒 Starting purchase for package:', packageId);

    // Check if running in Expo Go
    const isExpoGo = Constants.appOwnership === 'expo';
    
    if (isExpoGo) {
      console.log('🧪 Expo Go detected - simulating purchase flow');
      
      // Show alert explaining limitation
      Alert.alert(
        'Development Mode',
        'You cannot test real purchases in Expo Go. Please use a development build or TestFlight for testing purchases.',
        [
          {
            text: 'Simulate Purchase',
            onPress: async () => {
              // Simulate successful purchase
              const trialSubscription: SubscriptionInfo = {
                tier: 'premium-trial',
                isActive: true,
                startDate: new Date().toISOString(),
                trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                features: PREMIUM_FEATURES,
                usage: { ...FREE_TIER_USAGE, maxAIChats: 999, maxGoals: 999, maxBudgets: 999 }
              };
              
              setSubscription(trialSubscription);
              await saveSubscriptionToDatabase(trialSubscription);
              return true;
            }
          },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      
      return false; // Don't proceed with real purchase
    }

    // Real purchase flow for development builds
    const offerings = await RevenueCatService.getCurrentOffering();
    if (!offerings) {
      console.error('❌ No offerings available');
      return false;
    }

    const packageToPurchase = offerings.availablePackages.find(
      (pkg) => pkg.identifier === packageId
    );
    
    if (!packageToPurchase) {
      console.error('❌ Package not found:', packageId);
      return false;
    }

    console.log('🛒 Purchasing package:', packageToPurchase.identifier);
    const result = await RevenueCatService.purchasePackage(packageToPurchase);
    
    if (result.success && result.customerInfo) {
      console.log('✅ Purchase succeeded! Updating subscription state...');
      await loadSubscriptionFromRevenueCat();
      return true;
    }

    console.log('❌ Purchase failed');
    return false;
  } catch (error) {
    console.error('❌ Purchase error:', error);
    return false;
  }
};
```

### **3. Add Development Mode Detection**

Add clear indicators when running in development mode:

```typescript
// In your subscription page
const isExpoGo = Constants.appOwnership === 'expo';

// Show development warning
{isExpoGo && (
  <View style={styles.devWarning}>
    <Ionicons name="warning" size={20} color={colors.warning[500]} />
    <Text style={styles.devWarningText}>
      Development Mode: Real purchases not available in Expo Go
    </Text>
  </View>
)}
```

## 📱 **TESTING STRATEGIES**

### **1. Expo Go Testing (UI Only)**
- Test UI/UX flows
- Verify navigation
- Check form validation
- Test responsive design

### **2. Development Build Testing (Full Functionality)**
- Test real RevenueCat integration
- Test Apple Store purchases
- Test sandbox purchases
- Test restore functionality

### **3. TestFlight Testing (Production-like)**
- Test with real users
- Test production environment
- Test App Store review process

## 🚀 **IMMEDIATE ACTION PLAN**

### **Step 1: Create Development Build**
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Create development build
eas build --platform ios --profile development
```

### **Step 2: Test on Device**
1. Install the development build on your device
2. Test the purchase flow
3. Verify RevenueCat integration
4. Test restore purchases

### **Step 3: Set Up Sandbox Testing**
1. Create sandbox test accounts in App Store Connect
2. Configure products in App Store Connect
3. Set up RevenueCat dashboard
4. Test with sandbox accounts

## ⚠️ **IMPORTANT NOTES**

1. **Expo Go Limitations**: You cannot test real purchases in Expo Go
2. **Development Builds Required**: Use EAS Build for full functionality
3. **Sandbox Testing**: Essential before App Store submission
4. **RevenueCat Configuration**: Must be done in RevenueCat dashboard
5. **App Store Connect**: Products must be configured properly

## 🎯 **EXPECTED RESULTS**

After implementing these changes:

- ✅ **Expo Go**: Will show development warnings and simulate purchases
- ✅ **Development Build**: Will work with real RevenueCat integration
- ✅ **TestFlight**: Will work with production-like environment
- ✅ **App Store**: Will work with real purchases

---

**Status**: Ready for Implementation  
**Priority**: CRITICAL - Required for proper testing  
**Next Action**: Create development build and test on device
