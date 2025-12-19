# TypeScript Type Utils Documentation

This documentation explains how to use the reusable type utilities in `@/lib/typescript-utils.ts` for elegant type transformations.

## Available Utilities

### 1. `DeepPartial<T>`

Makes all properties in an object type optional, recursively.

```typescript
interface User {
  id: string;
  profile: {
    name: string;
    email: string;
  };
}

type PartialUser = DeepPartial<User>;
// Result: { id?: string; profile?: { name?: string; email?: string; }; }
```

### 2. `UpdateProps<T, K, U>`

Updates specific properties of a type with new types.

```typescript
interface Vendor {
  id: string;
  name: string;
  permission: string[];
  createdAt: Date;
}

type VendorWithPermissions = UpdateProps<Vendor, "permission", Permission[]>;
// Result: { id: string; name: string; permission: Permission[]; createdAt: Date; }

// You can update multiple properties
type StrictVendor = UpdateProps<
  Vendor,
  "permission" | "id",
  Permission[] | number
>;
// Result: { permission: Permission[] | number; id: Permission[] | number; }
```

### 3. `ConstrainProps<T, K, U>`

Constrains specific properties to certain values.

```typescript
interface UserData {
  status: string;
  role: string;
  name: string;
}

type ConstrainedUser = ConstrainProps<
  UserData,
  "status",
  "active" | "inactive" | "pending"
>;
// Result: { status: "active" | "inactive" | "pending"; role: string; name: string; }

// Constrain multiple properties
type StrictUser = ConstrainProps<
  UserData,
  "status" | "role",
  "active" | "inactive" | "pending" | "admin" | "user"
>;
```

### 4. `RequireProps<T, K>`

Makes specific properties required while keeping others optional (useful with DeepPartial).

```typescript
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type PartialConfig = DeepPartial<Config>;
type RequiredConfig = RequireProps<PartialConfig, "apiUrl">;
// Result: { apiUrl: string; timeout?: number; retries?: number; }
```

## Practical Examples

### API Response Types

```typescript
// Raw API response
interface ApiResponse {
  data: {
    users: Array<{
      id: string;
      permission: string[];
      status: string;
    }>;
    permission: string[];
  };
}

// Type-safe response with proper permissions
type TypedApiResponse = ConstrainProps<
  ApiResponse,
  "permission",
  Permission[]
> & {
  data: {
    users: Array<
      UpdateProps<ApiResponse["data"]["users"][0], "permission", Permission[]>
    >;
  };
};
```

### Form State Types

```typescript
// For form handling with optional fields
type FormData = DeepPartial<UserData> & RequireProps<FormData, "name">;
// name is required, everything else is optional
```

### Database Entity Types

```typescript
// Database entities with typed status
type DBEntity = ConstrainProps<
  BaseEntity,
  "status",
  "active" | "archived" | "deleted"
>;

// Update operations with specific fields
type UpdateEntity = UpdateProps<PartialEntity, "updatedAt", Date>;
```

## Best Practices

### 1. **Combine Utilities**

```typescript
// Good: Combine for precise typing
type SafeApiResponse = DeepPartial<
  ConstrainProps<ApiResponse, "permission", Permission[]>
>;

// Better: Create reusable base types
type BaseApiResponse = ConstrainProps<ApiResponse, "permission", Permission[]>;
type PartialApiResponse = DeepPartial<BaseApiResponse>;
```

### 2. **Use with Generics**

```typescript
type Repository<T> = {
  create: (data: UpdateProps<Partial<T>, "id", string>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
};
```

### 3. **Export Reusable Types**

```typescript
// In types file
export type StatusConstrained<T> = ConstrainProps<
  T,
  "status",
  "active" | "inactive"
>;

// Use throughout app
type User = StatusConstrained<User>;
type Post = StatusConstrained<Post>;
```

### 4. **Keep it Simple**

Don't over-complicate type definitions. Use utilities when they provide clear value:

```typescript
// Simple: Direct typing
type UserStatus = "admin" | "user" | "guest";

// Complex: Only when needed
type ComplexUser = ConstrainProps<User, "status", UserStatus>;
```

## Common Patterns

### 1. **Permission Types**

```typescript
type WithPermissions<T> = UpdateProps<T, "permission", Permission[]>;
```

### 2. **Sortable Filters**

```typescript
type SortableFilter<T> = T & {
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};
```

### 3. **Optional Create Types**

```typescript
type CreateType<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
```

### 4. **Required Update Types**

```typescript
type UpdateType<T> = RequireProps<Partial<T>, "id">;
```

## Migration Guide

If you have existing verbose type definitions, here's how to migrate:

### Before

```typescript
type VendorDataType = {
  vendors?: Array<{
    id: string;
    name: string;
    permission: Permission[];
  }>;
  permission?: Permission[];
  filters?: {
    sortOrder?: "ASC" | "DESC";
    // ... other fields
  };
};
```

### After

```typescript
type VendorDataType = DeepPartial<
  ConstrainProps<ApiResponse, "permission", Permission[]>
> & {
  vendors?: Array<UpdateProps<Vendor, "permission", Permission[]>>;
  permission?: Permission[];
  filters?: {
    sortOrder?: "ASC" | "DESC";
  };
};
```

This approach provides better type safety, reusability, and maintainability.
