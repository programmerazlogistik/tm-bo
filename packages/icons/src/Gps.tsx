import * as React from "react";
import type { SVGProps } from "react";

export const Gps = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11.25 21v-1.287a7.75 7.75 0 0 1-6.963-6.963H3a.75.75 0 0 1 0-1.5h1.287a7.75 7.75 0 0 1 6.963-6.964V3a.75.75 0 0 1 1.5 0v1.286a7.75 7.75 0 0 1 6.963 6.964H21a.75.75 0 0 1 0 1.5h-1.287a7.75 7.75 0 0 1-6.963 6.963V21a.75.75 0 0 1-1.5 0M12 5.75a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5M14.25 12a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0m1.5 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0"
      opacity={0.9}
    />
  </svg>
);
