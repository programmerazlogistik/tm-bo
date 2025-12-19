"use client";

import { useState } from "react";

import { useTokenActions } from "@muatmuat/lib/auth-adapter";
import { Eye, EyeOff } from "lucide-react";
import xior from "xior";

const LoginContainer = ({ onSuccessRedirect = "/master-voucher" }) => {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useTokenActions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { loginId, password } = formData;

    // Validate loginId (email)
    if (!loginId.trim()) {
      newErrors.loginId = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginId)) {
        newErrors.loginId = "Please enter a valid email address";
      }
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create Basic Auth header
      const basicAuth = btoa("az_muattrans:Zci01Y4zh2IHCupULvXbTdDM");

      // API call to transporter auth with Basic Auth
      const response = await xior.post(
        `https://apimtrans-az.assetlogistik.com/v1/${process.env.NEXT_PUBLIC_APP_MODE || "bo"}/auth/login`,
        {
          loginId: formData.loginId,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );
      if (
        response.data?.Data?.accessToken &&
        response.data?.Data?.refreshToken
      ) {
        setToken({
          accessToken: response.data.Data.accessToken,
          refreshToken: response.data.Data.refreshToken,
        });
      } else {
        throw new Error("Invalid token response from server");
      }
      await new Promise((resolve) => setTimeout(resolve, 500));

      window.location.replace(onSuccessRedirect);
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login Back Office Muatrans
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="loginId"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="loginId"
                name="loginId"
                placeholder="Enter your email"
                value={formData.loginId}
                onChange={handleInputChange}
                disabled={isLoading}
                autoComplete="email"
                className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.loginId ? "border-red-500" : "border-gray-300"
                } ${isLoading ? "cursor-not-allowed bg-gray-100" : ""}`}
              />
              {errors.loginId && (
                <p className="mt-1 text-sm text-red-500">{errors.loginId}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={`w-full rounded-md border px-3 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } ${isLoading ? "cursor-not-allowed bg-gray-100" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div>
                <p className="text-sm text-red-500">{errors.general}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full rounded-md px-4 py-2 font-medium text-white transition-colors ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContainer;
