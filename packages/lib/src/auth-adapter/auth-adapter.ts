import { type useRouter } from "next/navigation";

import { PublicRoute } from "@/axios-adapter";

type AppRouterInstance = ReturnType<typeof useRouter>;

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
  phone?: string | null;
  data?: any;
}

export interface DefaultAuthUserWithLoggedIn extends AuthUser {
  isLoggedIn: boolean;
}

export interface AuthMatrix {
  [key: string]: any;
}

type Username = {
  type: "username";
  username: string;
  password: string;
  [key: string]: any;
};

type Phone = {
  type: "phone";
  phone: string;
  password: string;
  [key: string]: any;
};

type Email = {
  type: "email";
  email: string;
  password: string;
  [key: string]: any;
};

export type AuthCredential = Username | Phone | Email;

export interface AuthAdapter<
  TUser extends AuthUser = AuthUser,
  TMatrix extends AuthMatrix = AuthMatrix,
> {
  guard?: {
    publicRoutes?: PublicRoute[];
    loggedOutRedirectTo?: string | null;
    loggedInRedirectTo?: string | null;
  };

  login: (credential: AuthCredential) => Promise<{
    loggedIn: boolean;
    accessToken?: string | null;
    refreshToken?: string | null;
  }>;
  getSession(
    accessToken: string,
    refreshToken: string
  ): Promise<{ user: TUser; matrix?: TMatrix }>;
  logout(
    router: AppRouterInstance,
    accessToken: string,
    refreshToken: string
  ): Promise<void>;
  isLoggedIn: (user: TUser, matrix: TMatrix | null) => boolean;
}

// 🎯 Type inference helper - extracts TUser from adapter
export type InferAdapterUser<T extends AuthAdapter> =
  T extends AuthAdapter<infer U, any> ? U : DefaultAuthUserWithLoggedIn;

// 🎯 Type inference helper - extracts TMatrix from adapter
export type InferAdapterMatrix<T extends AuthAdapter> =
  T extends AuthAdapter<any, infer M> ? M : AuthMatrix;
