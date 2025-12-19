import * as React from "react";
import type { SVGProps } from "react";

export const NoPolisi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m11 11 2 2M13 11l-2 2M15 11l2 2M17 11l-2 2M7 11l2 2M9 11l-2 2M7 7H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2M17 7h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2"
    />
  </svg>
);
