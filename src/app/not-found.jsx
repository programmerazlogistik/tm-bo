"use client";

import { useRouter } from "next/navigation";

import { Button } from "@muatmuat/ui/Button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex max-w-md flex-col items-center justify-center text-center">
        <h1 className="mb-3 text-6xl font-bold text-primary-700">404</h1>

        <h2 className="mb-2 text-2xl font-semibold text-neutral-800">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mb-8 text-base text-neutral-600">
          Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="muatparts-primary-secondary"
            iconLeft={<Search size={16} />}
            onClick={() => router.back()}
            className="min-w-[140px]"
          >
            <span className="pt-0.5">Kembali</span>
          </Button>

          <Button
            variant="muatparts-primary"
            iconLeft={<Home size={16} />}
            onClick={() => router.push("/")}
            className="min-w-[140px]"
          >
            <span className="pt-0.5">Beranda</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
