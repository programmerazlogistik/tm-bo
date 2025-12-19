import xior from "xior";

import { useTokenStore, useUserStore } from "../auth-adapter";
import {
  DEFAULT_PUBLIC_ROUTES,
  getIsPublicRoute,
} from "../auth-adapter/auth-guard";

// Route configuration types
export type RouteMethod = "exact" | "includes" | "regex";

export interface PublicRoute {
  path: string | RegExp;
  method: RouteMethod;
}

// Token interface
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Axios configuration options
export interface CreateAxiosOptions {
  baseURL?: string;
  getToken?: () => AuthTokens;
  clearSession?: () => void;
  languageId?: string;

  maintenance?: {
    redirectTo?: string;
    statusCode?: number;
  };

  guard?: {
    publicRoutes?: PublicRoute[];
    statusCode?: number[];
    loggedOutRedirectTo?: string;
  };
}

// Xior instance type (from xior package)
export interface XiorInstance {
  interceptors: any;
  get: (url: string, config?: any) => Promise<any>;
  post: (url: string, data?: any, config?: any) => Promise<any>;
  put: (url: string, data?: any, config?: any) => Promise<any>;
  patch: (url: string, data?: any, config?: any) => Promise<any>;
  delete: (url: string, config?: any) => Promise<any>;
  request: (config: any) => Promise<any>;
}

/**
 * Creates a configured Xior (axios-like) instance with authentication and error handling.
 *
 * Features:
 * - Automatic token injection from getToken function
 * - 401/403 handling with session clearing and redirect
 * - 503 maintenance mode redirect
 * - Public routes that bypass authentication checks
 * - Request/response interceptors for centralized error handling
 *
 * @param options - Configuration options for the axios instance
 * @param options.baseURL - Base URL for all requests
 * @param options.getToken - Function to retrieve auth tokens
 * @param options.clearSession - Function to clear user session
 * @param options.languageId - Language UUID identifier to be included in request headers
 * @param options.maintenance - Maintenance mode configuration
 * @param options.maintenance.redirectTo - URL to redirect when maintenance mode is active
 * @param options.maintenance.statusCode - HTTP status code for maintenance mode (default: 503)
 * @param options.guard - Authentication guard configuration
 * @param options.guard.publicRoutes - Routes that don't require authentication
 * @param options.guard.statusCode - HTTP status codes that trigger session clearing (default: [401])
 * @param options.guard.loggedOutRedirectTo - URL to redirect after session is cleared
 * @returns Configured Xior instance ready for making HTTP requests
 *
 * @example
 * ```typescript
 * import { createAxiosAdapter } from '@muatmuat/lib/axios-adapter';
 *
 * const api = createAxiosAdapter({
 *   baseURL: 'https://api.example.com',
 *   getToken: () => ({ accessToken: 'token', refreshToken: 'refresh' }),
 *   clearSession: () => localStorage.clear(),
 *   languageId: '550e8400-e29b-41d4-a716-446655440000',
 *   guard: {
 *     publicRoutes: [
 *       { path: '/login', method: 'exact' },
 *       { path: '/register', method: 'exact' }
 *     ],
 *     loggedOutRedirectTo: '/login'
 *   },
 *   maintenance: {
 *     redirectTo: '/maintenance',
 *     statusCode: 503
 *   }
 * });
 *
 * // Use the configured instance
 * const response = await api.get('/users');
 * ```
 */
export const createAxiosAdapter = ({
  baseURL = "/",
  getToken = () => {
    const token = useTokenStore.getState();
    return {
      accessToken: token?.accessToken || "",
      refreshToken: token?.refreshToken || "",
    };
  },
  clearSession = () => {
    useTokenStore.getState().actions.clearToken();
    useUserStore.getState().actions.clearUser();
  },
  languageId,

  maintenance: maintenanceProps,
  guard: guardProps,
}: CreateAxiosOptions): XiorInstance => {
  const maintenance = {
    redirectTo: `${process.env.NEXT_PUBLIC_INTERNAL_WEB}sistem`,
    statusCode: 503,
    ...maintenanceProps,
  };

  const guard: CreateAxiosOptions["guard"] = {
    publicRoutes: DEFAULT_PUBLIC_ROUTES,
    statusCode: [401],
    loggedOutRedirectTo: "/login",
    ...guardProps,
  };

  const fetcher = xior.create({
    baseURL,
    timeout: 30000, // 30 seconds timeout
  });

  // Request interceptor - Add authentication tokens to all requests
  fetcher.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token?.accessToken}`;
      config.headers.refreshToken = token?.refreshToken;
      config.headers["languageid"] = languageId || "";
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handle global error responses
  fetcher.interceptors.response.use(
    (response) => response,
    (error) => {
      // This function will be called for any status codes that fall outside the range of 2xx
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
        // This is where you'd typically handle 503 if the server sent a proper 503 response.
        if (error.response.status === maintenance.statusCode) {
          console.warn(
            "Service Unavailable (503). Redirecting to maintenance page."
          );
          // Redirect the user to /maintenance
          window.location.replace(maintenance.redirectTo);
        }
        // Handle other HTTP error codes (4xx, 5xx other than 503)
        if (guard.statusCode?.includes(error.response.status)) {
          clearSession();
          // If the user is not on the public routes, redirect to /sewaarmada
          const isPublicRoute = getIsPublicRoute(guard.publicRoutes);
          if (window?.location && !isPublicRoute) {
            window.location.replace(guard.loggedOutRedirectTo!);
          }
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }

      // Always re-throw the error so it can be caught by individual API calls
      // unless you've explicitly handled it (like redirecting and preventing further resolution).
      return Promise.reject(error);
    }
  );

  return fetcher;
};
