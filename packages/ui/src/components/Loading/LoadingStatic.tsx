import * as React from "react";

import { ImageComponent } from "@muatmuat/ui/ImageComponent";

export interface LoadingStaticProps {}

/**
 * SSR / RSC Friendly Loading Component that always renders a full-screen loading overlay.
 * Perfect for server-side rendered applications, React Server Components, and Suspense boundaries.
 */
export const LoadingStatic = (): React.ReactElement => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur-md">
      <ImageComponent
        src={"/img/loading-animation.webp"}
        width={100}
        height={100}
        alt="loading"
        unoptimized
      />
    </div>
  );
};
