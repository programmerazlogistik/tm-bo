"use client";

import LoginButton from "@/components/Auth/LoginButton";

import { useAuth } from "@/lib/auth";

export default function Home() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    window.location.href = "/vendor-internasional/vendor-terdaftar";
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-8 text-center shadow-muat">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to MuatpartsPlus - BO
        </h1>
        <p className="text-lg text-neutral-700">
          This is the back office for MuatpartsPlus.
        </p>
        <LoginButton />
      </main>
    </div>
  );
}
