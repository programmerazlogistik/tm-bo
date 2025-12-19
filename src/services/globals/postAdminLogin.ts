import { fetcherMPPInter } from "@/lib/axios";
import type { DeepPartial } from "@/lib/typescript-utils";

const USE_MOCK = false;

export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "Login berhasil",
  },
  Data: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbkB0YW4uY29tIiwiaWQiOjUzLCJpZCI6NTEsImlhdCI6MTczNTUyOTk2MSwiZXhwIjoxNzM1NTMxNzYxfQ.1bNk2tMuez_0tj0eOuQndxyTDhZPvBhk1_8bn_QHk3g",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzIiwiaWQiOjUzLCJpYXQiOjE3MzU1Mjk5NjEsImV4cCI6MTczODEyMTk2MX0.JBYxwice_y6-dAsradh_dKV8Q9si_JYhvW6F-L5uY",
    user: {
      id: "53",
      email: "tan@tan.com",
      name: "TAN",
      level: 0,
    },
    tokenType: "Bearer",
  },
  Type: "ADMIN_LOGIN_SUCCESS",
} as const;

// Infer types from mock data - leveraging TypeScript inference
type AdminLoginResponse = (typeof mockAPIResult)["Data"];
export type AdminLoginResult = DeepPartial<AdminLoginResponse>;

// Login payload type - inferred from usage pattern
export type AdminLoginPayload = {
  email: string;
  token: string;
};

// API Error type for better error handling
type APIError = {
  response?: {
    data?: {
      Message?: {
        Text?: string;
      };
    };
  };
};

export async function postAdminLogin(
  payload: AdminLoginPayload
): Promise<AdminLoginResult> {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockAPIResult.Data;
  }

  try {
    const response = await fetcherMPPInter.post(
      "/v1/bo/auth/login/admin",
      payload
    );
    return response.data?.Data;
  } catch (error) {
    // Type guard for API errors
    const apiError = error as APIError;

    // If the error has a response from the server, it's likely a validation error
    if (apiError.response?.data) {
      // Throw the structured error from the API so the UI can handle it
      throw new Error(apiError.response.data.Message?.Text || "Login gagal");
    }
    // For other errors (e.g., network issues), throw a generic error
    throw new Error("Gagal melakukan login");
  }
}
