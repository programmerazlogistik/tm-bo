import * as React from "react";
import type { SVGProps } from "react";

export const Qris = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 12h2m3-7V3m4 9h-3a1 1 0 0 1-1-1V9m-8 3H3m12 6h-2a1 1 0 0 0-1 1v2m0-6h6m3 0v5a1 1 0 0 1-1 1h-5M8 9H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m0 12H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M20 9h-4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M6 5.99q-.005 0-.005.005T6 6t.005-.005T6 5.99m11.994.005q-.005 0-.005.005t.005.005T18 6t-.005-.005m1 6q-.005 0-.005.005t.005.005T19 12t-.005-.005m-1 6q-.005 0-.005.005t.005.005T18 18t-.005-.005m-11.988 0Q6 17.995 6 18t.005.005T6.01 18t-.005-.005"
    />
  </svg>
);
