// Auth hooks subpath exports
export * from "./auth-adapter";
export * from "./create-auth";
export * from "./tokenStore";
export * from "./userStore";

// Core auth adapter exports
export type {
  AuthAdapter,
  AuthCredential,
  AuthUser,
  InferAdapterMatrix,
  InferAdapterUser,
} from "./auth-adapter";

// Context exports
export type {
  AuthContextValue,
  AuthenticationProviderProps,
} from "./create-auth";

// Guard exports
export { DEFAULT_PUBLIC_ROUTES, getIsPublicRoute } from "./auth-guard";
export type { PublicRoute, RouteMethod } from "./auth-guard";

// Store exports
export type { AuthToken } from "./auth-adapter";
export { useTokenActions, useTokenStore } from "./tokenStore";
export { useUserActions, useUserStore } from "./userStore";
