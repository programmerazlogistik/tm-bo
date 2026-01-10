"use client";

import {
  AuthCredential,
  AuthUser,
  createAuthAdapter,
} from "@muatmuat/lib/auth-adapter";
import SHA1 from "crypto-js/sha1";

import { getProfile } from "@/services/globals/getProfile";
import { postAdminLogin } from "@/services/globals/postAdminLogin";

import { PUBLIC_ROUTES } from "./constants";

// 🎯 Let TypeScript infer our AppUser type automatically
export const { AuthProvider, useAuth } = createAuthAdapter({
  guard: {
    publicRoutes: PUBLIC_ROUTES,
    loggedOutRedirectTo: `/backdoor/login`,
    loggedInRedirectTo: null,
  },

  getSession: async (
    _accessToken,
    _refreshToken
  ): Promise<{ user: AuthUser }> => {
    try {
      const response = await getProfile();

      return {
        user: {
          name: response.name,
          email: response.email,
          photo: undefined,
          phone: undefined,
          data: response,
        },
      };
    } catch {
      return {
        user: {
          data: {} as any,
        },
      };
    }
  },

  isLoggedIn: (user) => Boolean(user.email),
  login: async (credential: AuthCredential) => {
    let loggedIn = false;
    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    const response = await postAdminLogin({
      email: credential.email,
      token: SHA1(credential.password).toString(),
    });

    accessToken = response.accessToken!;
    refreshToken = response.refreshToken!;
    loggedIn = true;

    return { loggedIn, accessToken, refreshToken };
  },

  logout: async (_router, _accessToken, _refreshToken) => {
    window.location.replace(`${process.env.NEXT_PUBLIC_ASSET_REVERSE}/login`);
  },
});
