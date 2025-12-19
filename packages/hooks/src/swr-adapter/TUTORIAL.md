# SWR Adapter Tutorial

## 🎯 **Overview**

The `@muatmuat/hooks/swr-adapter` provides a convenient wrapper around SWR (Stale-While-Revalidate) that integrates seamlessly with your existing axios/xior fetcher instances. This adapter simplifies data fetching, caching, and mutation operations in your React applications.

## 📦 **Installation & Import**

```javascript
import { createSWRAdapter } from "@muatmuat/hooks/swr-adapter";

import { fetcherMuatparts, fetcherMuatrans } from "@/lib/axios";
```

**Important**: Create a central file to configure your SWR hooks for reuse across components:

```javascript
// src/hooks/use-swr.js
import { createSWRAdapter } from "@muatmuat/hooks/swr-adapter";

import { fetcherMuatparts } from "@/lib/axios";

export const { useSWRHook, useSWRMutateHook } =
  createSWRAdapter(fetcherMuatparts);
```

## 🔧 **Basic Usage**

### **1. Using SWR Hooks in Components**

```javascript
// components/UserProfile.jsx
import { useSWRHook, useSWRMutateHook } from "@/hooks/use-swr";

function UserProfile({ userId }) {
  const { data, error, isLoading, mutate } = useSWRHook(
    userId ? `/api/users/${userId}` : null, // SWR key
    {}, // axios options
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    } // SWR options
  );
```

### **2. Data Mutation Hook**

```javascript
function UpdateUserForm({ userId }) {
  const { trigger, isMutating, error } = useSWRMutateHook(
    `/api/users/${userId}`, // SWR key
    "PUT", // HTTP method
    {}, // axios options
    {
      revalidate: true, // Automatically refetch data after mutation
      populateCache: false, // Don't automatically populate cache
    } // SWR mutation options
  );

  const handleSubmit = async (formData) => {
    try {
      const result = await trigger(formData);
      console.log("User updated:", result);
      // Success handling
    } catch (err) {
      console.error("Update failed:", err);
      // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isMutating}>
        {isMutating ? "Updating..." : "Update"}
      </button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}
```

### **3. Complete Component Example**

```javascript
function UserProfile({ userId }) {
  const { data, error, isLoading, mutate } = useSWRHook(
    userId ? `/api/users/${userId}` : null, // SWR key
    {}, // axios options
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    } // SWR options
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}
```

## 🚀 **Advanced Usage**

### **1. Conditional Fetching**

```javascript
function UserOrders({ userId, showOrders }) {
  const { data: orders } = useSWRHook(
    showOrders && userId ? `/api/users/${userId}/orders` : null,
    {
      revalidateIfStale: false,
    }
  );

  return showOrders ? (
    <div>
      <h2>Orders:</h2>
      {orders?.map((order) => (
        <div key={order.id}>{order.description}</div>
      ))}
    </div>
  ) : null;
}
```

### **2. Dependent Queries**

```javascript
function UserDashboard({ userId }) {
  // First, fetch user data
  const { data: user } = useSWRHook(userId ? `/api/users/${userId}` : null);

  // Then, fetch user's orders (depends on user data)
  const { data: orders } = useSWRHook(
    user ? `/api/users/${user.id}/orders` : null
  );

  if (!user) return <div>Loading user...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Orders:</h2>
      {orders?.map((order) => (
        <div key={order.id}>{order.description}</div>
      ))}
    </div>
  );
}
```

### **3. Pagination**

```javascript
function PaginatedUsers() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWRHook(
    `/api/users?page=${page}&limit=10`,
    {},
    {
      revalidateOnMount: false,
    }
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul>
            {data?.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>Page {page}</span>
            <button
              disabled={page >= data?.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

## 🔗 **Integration with Your Fetcher**

### **Complete Integration Example**

```javascript
// lib/swr.js
import { createSWRAdapter } from "@muatmuat/hooks/swr-adapter";
import { fetcherMuatparts, fetcherMuatrans, fetcherPayment } from "@/lib/axios";

// Create SWR adapters for different APIs
export const muatpartsSWR = createSWRAdapter(fetcherMuatparts);
export const muatransSWR = createSWRAdapter(fetcherMuatrans);
export const paymentSWR = createSWRAdapter(fetcherPayment);

// Extract hooks for each API
export const { useSWRHook: useMuatpartsSWR, useSWRMutateHook: useMuatpartsMutate } = muatpartsSWR;
export const { useSWRHook: useMuatransSWR, useSWRMutateHook: useMuatransMutate } = muatransSWR;
export const { useSWRHook: usePaymentSWR, useSWRMutateHook: usePaymentMutate } = paymentSWR;

// hooks/useUserData.js
import { useMuatpartsSWR, useMuatpartsMutate } from "@/lib/swr";

export function useUserData(userId) {
  return useMuatpartsSWR(
    userId ? `/api/users/${userId}` : null,
    {},
    {
      revalidateOnFocus: true,
      onError: (error) => {
        console.error("Failed to fetch user data:", error);
      },
    }
  );
}

export function useUpdateUser(userId) {
  return useMuatpartsMutate(
    `/api/users/${userId}`,
    "PUT",
    {},
    {
      revalidate: true,
      onError: (error) => {
        console.error("Failed to update user:", error);
      },
    }
  );
}
```

### **Component Usage with Custom Hooks**

```javascript
// components/UserProfile.jsx
import { useUpdateUser, useUserData } from "@/hooks/useUserData";

function UserProfile({ userId }) {
  const { data: user, isLoading, error, mutate } = useUserData(userId);
  const { trigger: updateUser, isMutating } = useUpdateUser(userId);

  const handleUpdate = async (userData) => {
    try {
      await updateUser(userData);
      mutate(); // Refetch user data
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => handleUpdate({ name: "New Name" })}>
        {isMutating ? "Updating..." : "Update Name"}
      </button>
    </div>
  );
}
```

## ⚡ **Performance Optimizations**

### **1. Global SWR Configuration**

```javascript
// lib/swr-config.js
import { SWRConfig } from "swr";

export function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        revalidateOnMount: true,
        dedupingInterval: 2000, // 2 seconds
        focusThrottleInterval: 5000, // 5 seconds
        loadingTimeout: 3000, // 3 seconds
        errorRetryCount: 3,
        errorRetryInterval: 1000,
      }}
    >
      {children}
    </SWRConfig>
  );
}

// Wrap your app with this provider
```

### **2. Selective Revalidation**

```javascript
function UserList() {
  const { data: users, mutate: mutateUsers } = useSWRHook("/api/users");

  const handleUserUpdate = async (userId, updateData) => {
    // Update via API
    await fetcherMuatparts.put(`/api/users/${userId}`, updateData);

    // Optimistically update the UI
    mutateUsers(
      users.map((user) =>
        user.id === userId ? { ...user, ...updateData } : user
      ),
      false // Don't revalidate from server
    );

    // Then revalidate to ensure consistency
    mutateUsers();
  };
}
```

### **3. Prefetching**

```javascript
function UserLink({ user, onMouseEnter }) {
  const prefetchUser = useCallback(() => {
    // Prefetch user data when hovering over the link
    mutate(`/api/users/${user.id}`);
  }, [user.id]);

  return (
    <a
      href={`/users/${user.id}`}
      onMouseEnter={onMouseEnter ? prefetchUser : undefined}
    >
      {user.name}
    </a>
  );
}
```

## 🔧 **Error Handling**

### **1. Global Error Handling**

Your fetcher already handles 401/503 errors globally. The SWR adapter will propagate these errors:

```javascript
function DataComponent() {
  const { data, error, isLoading } = useSWRHook("/api/data");

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    // The error from your fetcher (401 redirect, 503 maintenance) is handled automatically
    return <ErrorFallback error={error} />;
  }

  return <DataDisplay data={data} />;
}
```

### **2. Local Error Handling**

```javascript
function SafeDataComponent() {
  const { data, error, mutate } = useSWRHook(
    "/api/data",
    {},
    {
      onError: (error) => {
        // Local error handling without interfering with global auth redirects
        if (error.response?.status !== 401) {
          toast.error("Failed to load data");
        }
      },
      onErrorRetry: (error, key, config, retryCount, { retry }) => {
        // Don't retry on 401/403 errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          return;
        }
        retry({ retryCount });
      },
    }
  );
}
```

## 📝 **Best Practices**

1. **Use meaningful keys**: Use descriptive SWR keys that include parameters
2. **Conditional fetching**: Pass `null` as key when you don't want to fetch
3. **Error boundaries**: Wrap components with error boundaries for better error handling
4. **Loading states**: Provide loading states for better UX
5. **Optimistic updates**: Use for better perceived performance
6. **Prefetching**: Prefetch data when you can predict user actions
7. **Deduplication**: SWR automatically deduplicates requests with the same key

## 🔄 **Migration from Direct SWR**

If you're migrating from direct SWR usage:

```javascript
// Before (direct SWR)
import useSWR from 'swr';

function Component() {
  const { data } = useSWR('/api/data', fetcherMuatparts.get);
}

// After (with adapter)
import { createSWRAdapter } from '@muatmuat/hooks/swr-adapter';

const swr = createSWRAdapter(fetcherMuatparts);

function Component() {
  const { data } = swr.useSWRHook('/api/data');
}
```

The adapter provides better integration with your existing fetcher configuration and maintains all the authentication and error handling you've already set up!
