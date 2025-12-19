import * as React from "react";
import type { SVGProps } from "react";

export const Read = (props: SVGProps<SVGSVGElement>) => (
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
      d="m2 12 5.25 5 2.625-3M8 12l5.25 5L22 7M16 7l-3.5 4"
    />
  </svg>
);
