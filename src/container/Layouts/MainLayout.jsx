"use client";

import { Suspense, useEffect, useRef } from "react";

import { StackManagerInitializer } from "@muatmuat/lib/stack-manager";
import { LoadingStatic, useLoadingAction } from "@muatmuat/ui/Loading";
import { Toaster } from "@muatmuat/ui/Toaster";

import { AuthProvider } from "@/lib/auth";

const MainLayout = ({ children }) => {
  return (
    <Suspense fallback={<LoadingStatic />}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster variant="muatparts" />
      <Script />
      <StackManagerInitializer />
    </Suspense>
  );
};

export default MainLayout;

const Script = () => {
  useDefaultTimeoutLoading();

  return null;
};

const useDefaultTimeoutLoading = () => {
  const { setIsGlobalLoading } = useLoadingAction();
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsGlobalLoading(false);
    }, 2000);

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
console.warn("FE Version: v1.0.22");
