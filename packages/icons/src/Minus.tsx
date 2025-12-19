import * as React from "react";
import type { SVGProps } from "react";

export const Minus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="m18.75 11 .077.004a.75.75 0 0 1 0 1.492l-.077.004h-14a.75.75 0 0 1 0-1.5z"
    />
  </svg>
);
