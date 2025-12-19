"use client";

import LoginButton from "@/components/Auth/LoginButton";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-8 text-center shadow-muat">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to BO Transport Market
        </h1>
        <p className="text-lg text-neutral-700">
          This is the back office of Transport Market
        </p>
        <LoginButton />
      </main>
    </div>
  );
}
