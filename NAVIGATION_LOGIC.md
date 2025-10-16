# Expenzez App - Navigation Logic

## 🎯 **User Types & Navigation Flow**

### **User States:**

1. **🟢 LOGGED_IN_USER** - Has valid session + tokens
2. **🟡 RETURNING_USER** - Not logged in, but has completed onboarding before
3. **🔴 NEW_USER** - Never used the app before
4. **🟠 LOADING** - App is still determining user state

---

## 📋 **Navigation Decision Tree**

```
App Startup
├── Is User Logged In?
│   ├── YES → 🟢 LOGGED_IN_USER → Main App (tabs)
│   └── NO → Check Onboarding Status
│       ├── Has Completed Onboarding?
│       │   ├── YES → 🟡 RETURNING_USER → Login Screen
│       │   └── NO → 🔴 NEW_USER → Onboarding Flow
│       │       └── SplashScreen → WelcomeOnboarding → Login
```

---

## 🔄 **Detailed Flow by User Type**

### **🟢 LOGGED_IN_USER**

- **Detection:** `isLoggedIn = true` OR `hasValidSession = true`
- **Route:** `(tabs)` (Main App)
- **Experience:** Direct access to main app, no splash screen
- **Log:** `🎯 [Layout] LOGGED_IN_USER → Main App`

### **🟡 RETURNING_USER**

- **Detection:** `isLoggedIn = false` AND `onboarding_completed = "true"`
- **Route:** `auth/Login`
- **Experience:** Direct to login screen, no onboarding
- **Log:** `🎯 [Layout] RETURNING_USER → Login`

### **🔴 NEW_USER**

- **Detection:** `isLoggedIn = false` AND `onboarding_completed = null/false`
- **Route:** `SplashScreen` → `WelcomeOnboarding` → `auth/Login`
- **Experience:** Full onboarding flow
- **Log:** `🎯 [Layout] NEW_USER → Onboarding`

### **🟠 LOADING**

- **Detection:** `onboardingStatusChecked = false`
- **Route:** `SplashScreen` (while checking status)
- **Experience:** Brief splash while determining user type
- **Log:** `🎯 [Layout] LOADING → Checking Status`

---

## 🛠 **Implementation Details**

### **Files Involved:**

1. **`_layout.tsx`** - Main navigation logic
2. **`SplashScreen.tsx`** - Handles loading state and fallback navigation
3. **`WelcomeOnboarding.tsx`** - Sets `onboarding_completed` flag

### **Key Logic in `_layout.tsx`:**

```typescript
if (shouldTreatAsLoggedIn) {
  // 🟢 LOGGED IN USER
  userType = "LOGGED_IN";
  initialRoute = "(tabs)";
} else if (onboardingStatusChecked) {
  if (hasCompletedOnboarding) {
    // 🟡 RETURNING USER
    userType = "RETURNING_USER";
    initialRoute = "auth/Login";
  } else {
    // 🔴 NEW USER
    userType = "NEW_USER";
    initialRoute = "SplashScreen";
  }
} else {
  // 🟠 LOADING STATE
  userType = "LOADING";
  initialRoute = "SplashScreen";
}
```

### **Key Logic in `SplashScreen.tsx`:**

```typescript
if (isLoggedIn) {
  // 🟢 LOGGED IN USER → Main App
  router.replace("/(tabs)");
} else if (hasCompletedOnboarding) {
  // 🟡 RETURNING USER → Login
  router.replace("/auth/Login");
} else {
  // 🔴 NEW USER → Onboarding
  router.replace("/WelcomeOnboarding");
}
```

---

## 🔍 **Debug Logging**

### **Layout Decision Logs:**

```
🎯 [Layout] Navigation Decision: {
  userType: "LOGGED_IN" | "RETURNING_USER" | "NEW_USER" | "LOADING",
  isLoggedIn: boolean,
  hasValidSession: boolean,
  hasCompletedOnboarding: boolean,
  onboardingStatusChecked: boolean,
  initialRoute: string,
  decision: {
    "User Type": string,
    "Route": string,
    "Reason": string
  }
}
```

### **SplashScreen Navigation Logs:**

```
🎯 [SplashScreen] LOGGED_IN_USER → Main App
🎯 [SplashScreen] RETURNING_USER → Login
🎯 [SplashScreen] NEW_USER → Onboarding
🎯 [SplashScreen] ERROR_FALLBACK → Onboarding
```

---

## ✅ **Expected Behavior**

| User Type        | First Visit                   | Subsequent Visits |
| ---------------- | ----------------------------- | ----------------- |
| **🟢 Logged In** | Main App                      | Main App          |
| **🟡 Returning** | Login → Main App              | Login → Main App  |
| **🔴 New User**  | Onboarding → Login → Main App | Login → Main App  |

---

## 🚨 **Error Handling**

- **AsyncStorage errors:** Default to onboarding (new user experience)
- **Token validation errors:** Treat as not logged in
- **Network errors:** Graceful fallback to appropriate screen

---

## 📝 **Testing Scenarios**

1. **Fresh Install:** Should see onboarding
2. **Logged Out After Onboarding:** Should see login
3. **Logged In:** Should see main app
4. **App Restart (Logged In):** Should see main app
5. **App Restart (Logged Out):** Should see login
6. **Clear App Data:** Should see onboarding again
