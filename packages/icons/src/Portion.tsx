import * as React from "react";
import type { SVGProps } from "react";

export const Portion = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M21 10h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1c3.86 0 7 3.14 7 7a1 1 0 0 1-1 1m-5-2h3.9A5.01 5.01 0 0 0 16 4.1zm-5 14c-4.963 0-9-4.037-9-9 0-4.962 4.037-9 9-9a1 1 0 0 1 1 1v7h7a1 1 0 0 1 1 1c0 4.962-4.037 9-9 9M10 6.072C6.612 6.558 4 9.48 4 13c0 3.86 3.14 7 7 7 3.52 0 6.442-2.612 6.929-6h-6.93a1 1 0 0 1-1-1z"
    />
  </svg>
);
