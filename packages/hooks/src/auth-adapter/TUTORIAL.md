# How to Implement This Auth Framework

This tutorial will show you how to use your `createAuth` factory and `AuthAdapter` base class to build a complete authentication system. This entire implementation is contained within a **single file** (`hooks/useAuth.js`) that you will create.

### Prerequisites

This guide assumes you have:

1.  Your two framework files:
    - `/lib/auth/AuthAdapter.js` (The abstract base class you provided)
    - `/lib/auth/createAuth.js` (The factory function you provided)
2.  Your project's specific dependencies installed and set up:
    - **Zustand** stores (e.g., `useUserStore`, `useTokenStore`).
    - An **Axios** instance (we'll call it `fetcherMPPInter`).
    - The `zustand/react/shallow` import.

---

### Step 1: Create Your `useAuth.js` Implementation File

This is the **only implementation file** you need to create. It will:

1.  Import all necessary dependencies (React, Zustand, your adapter, your factory, etc.).
2.  Define the concrete `Adapter` class locally.
3.  Create an instance of this adapter.
4.  Pass that instance to your `createAuth` factory.
5.  Export the final `AuthProvider` and `useAuth` hook.

Create a new file at `/hooks/useAuth.js`:

```javascript
"use client";

// --- React/Zustand Imports ---
import { useMemo } from "react";

import { useShallow } from "zustand/react/shallow";

// --- Framework Imports ---
import { AuthAdapter } from "@/lib/auth/AuthAdapter.js";
// --- JSDoc Type Imports ---
// This assumes AuthAdapter.js contains your @typedefs
import "@/lib/auth/AuthAdapter.js";
import { createAuth } from "@/lib/auth/createAuth.js";
// --- Project-Specific Imports (Stores, API) ---
// (Make sure to adjust these paths to your project)
import { fetcherMPPInter } from "@/lib/axios";

import { useTokenActions, useTokenStore } from "@/store/auth/tokenStore";
import { useUserActions, useUserStore } from "@/store/auth/userStore";

const cacheConfig = {
  headers: {
    "Cache-Control": "public, max-age=28800, stale-while-revalidate=3600",
  },
};

// ====================================================================
//  DEFINE YOUR CONCRETE ADAPTER (local to this file)
// ====================================================================

/**
 * This is the concrete implementation of the AuthAdapter.
 * It's defined locally here and is not exported.
 *
 * @class
 * @extends {AuthAdapter}
 */
class Adapter extends AuthAdapter {
  // --- Primitive State Actions (Zustand) ---

  /** @override */
  async getToken() {
    return useTokenStore.getState();
  }
  /** @override */
  async setToken(token) {
    useTokenActions.getState().setToken(token);
  }
  /** @override */
  async clearToken() {
    useTokenActions.getState().clearToken();
  }
  /** @override */
  async setUser(user) {
    useUserActions.getState().setUser(user);
  }
  /** @override */
  async setDataMatrix(matrix) {
    useUserActions.getState().setDataMatrix(matrix);
  }
  /** @override */
  async clearUser() {
    useUserActions.getState().clearUser();
  }

  // --- Primitive API/Platform Actions (Axios, Browser) ---

  /** @override */
  async revokeToken(refreshToken) {
    await fetcherMPPInter.post("v1/muatparts/auth/revoke-refresh-token", {
      refreshToken,
    });
  }

  /** @override */
  redirect() {
    let redirectUrl =
      process.env.NEXT_PUBLIC_APP_MODE === "transporter"
        ? "/login"
        : `${process.env.NEXT_PUBLIC_INTERNAL_WEB}login/signout`;
    window.location.replace(redirectUrl);
  }

  // --- Orchestration Methods (High-Level Actions) ---

  /** @override */
  async getSession(setIsLoading) {
    try {
      // 1. Fetch all data directly inside this method
      const [userRes, statusRes, matrixRes] = await Promise.allSettled([
        (async () => {
          const res = await fetcherMPPInter.get(
            "v1/muatparts/auth/credential-check"
          );
          const credential = res.data?.Data || {};
          delete credential.accessToken;
          delete credential.refreshToken;
          delete credential.refreshtoken;
          return credential;
        })(),
        fetcherMPPInter
          .post("v1/user/getUserStatusV3", undefined, cacheConfig)
          .then((res) => res.data?.Data),
        fetcherMPPInter
          .get("v1/register/checkmatrix", cacheConfig)
          .then((res) => res.data?.Data),
      ]);

      // Process results
      const credentialData =
        userRes.status === "fulfilled" ? userRes.value : {};
      const statusData =
        statusRes.status === "fulfilled" ? statusRes.value : {};
      const matrixData =
        matrixRes.status === "fulfilled" ? matrixRes.value : {};

      /** @type {AuthUser} */
      const user = { ...credentialData, ...statusData, isLoggedIn: true };
      /** @type {AuthMatrix} */
      const matrix = matrixData;

      // 2. Call the primitive state-setting methods
      await this.setUser(user);
      await this.setDataMatrix(matrix);
    } catch (error) {
      console.warn("Authentication initialization failed:", error);
      // 3. Call primitive error-handling methods
      await this.clearToken();
      await this.clearUser();
    } finally {
      // 4. Update the loading state
      setIsLoading(false);
    }
  }

  /** @override */
  async logout() {
    try {
      const token = await this.getToken();
      if (token?.refreshToken) {
        await this.revokeToken(token.refreshToken);
      }
    } catch (err) {
      console.warn("Error revoking refresh token", err);
    } finally {
      await this.clearToken();
      await this.clearUser();
      this.redirect();
    }
  }

  // --- State Selection Hooks (React + Zustand) ---

  /** @override */
  useDataUser() {
    return useUserStore(useShallow((state) => state.dataUser));
  }

  /** @override */
  useDataMatrix() {
    return useUserStore(useShallow((state) => state.dataMatrix));
  }

  /** @override */
  useIsLoggedIn(dataUser) {
    return useMemo(() => Boolean(dataUser?.name), [dataUser]);
  }
}

// ====================================================================
//  STEP 2: WIRE UP YOUR FACTORY AND EXPORT
// ====================================================================

// 1. Create a single, stable instance of your concrete adapter.
const adapterInstance = new Adapter();

// 2. Pass the instance to the factory to create your final hooks.
// This is what the rest of your app will import and use.
export const { AuthProvider, useAuth } = createAuth(adapterInstance);
```

---

### Step 2: Wrap Your Application

Now you just need to use the `AuthProvider` you exported from `/hooks/useAuth.js`.

For the **Next.js App Router**, create a client boundary.

**File: `app/providers.js`**

```javascript
"use client";

import { AuthProvider } from "@/hooks/useAuth";

// app/providers.js

// You can add other global providers here

export function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
```

**File: `app/layout.js`**

Use your `AppProviders` in your root layout.

```javascript
import { AppProviders } from "./providers.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
```

---

### Step 3: Use Your `useAuth` Hook

That's it. Your auth system is running. Now you can import `useAuth` from `/hooks/useAuth.js` in any Client Component.

**File: `app/page.js` (Example Page)**

```javascript
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  // 1. Consume the hook.
  const { dataUser, dataMatrix, isLoggedIn, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Application</h1>
      {isLoggedIn ? (
        <div>
          <p>
            Welcome back, <strong>{dataUser.name}!</strong>
          </p>
          {dataMatrix && <p>Your matrix data: {JSON.stringify(dataMatrix)}</p>}
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={() => alert("Redirecting to login...")}>
            Log In
          </button>
        </div>
      )}
    </div>
  );
}
```
