import Link from "next/link";

import { ChevronDown, Heart, Kapasitas } from "@muatmuat/icons";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      {/* <h1 className="mb-4 text-2xl font-bold">Hello World</h1> */}
      {/* <p className="text-fd-muted-foreground">
        You can open{" "}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{" "}
        and see the documentation.
      </p> */}

      <div className="flex items-center justify-center gap-4">
        <Link
          href="/docs"
          className="flex aspect-square size-64 flex-col items-center justify-center gap-6 rounded-lg bg-white p-4 shadow-muat outline outline-black"
        >
          <Kapasitas className="text-neutral-90 size-5" strokeWidth={1} />
          <p className="font-medium">Components docs</p>
        </Link>
        <Link
          href="/icons"
          className="flex aspect-square size-64 flex-col items-center justify-center gap-6 rounded-lg bg-white p-4 shadow-muat outline outline-black"
        >
          <Heart className="text-neutral-90 size-20" strokeWidth={1} />

          <ChevronDown
            className="size-20"
            strokeWidth={0}
            stroke="currentColor"
          />
          <p className="font-medium">Icon docs</p>
        </Link>
      </div>
      {/* <p className="text-fd-muted-foreground mt-4">
        Browse our{" "}
        <Link
          href="/icons"
          className="text-fd-foreground font-semibold underline"
        >
          Icon Library
        </Link>{" "}
        to see all available icons.
      </p> */}
    </main>
  );
}
