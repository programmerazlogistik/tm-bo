"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth";

const LoginButton = () => {
  const router = useRouter();

  const { dataUser, isLoggedIn } = useAuth();

  const name = dataUser?.name || "Login";

  return (
    <div
      className="flex w-fit cursor-pointer items-center space-x-1 rounded-md bg-primary-700 px-4 py-2 text-white transition-all duration-200 hover:bg-primary-800"
      onClick={() => {
        const route =
          process.env.NODE_ENV === "development"
            ? "/backdoor/login"
            : `${process.env.NEXT_PUBLIC_BF_WEB}/adminlogin`;

        if (!isLoggedIn) {
          router.push(route);
        }
      }}
    >
      <div className="flex items-center">
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  );
};

export default LoginButton;
