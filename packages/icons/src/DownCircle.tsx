import * as React from "react";
import type { SVGProps } from "react";

export const DownCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M20.5 12a8.5 8.5 0 1 0-17.002.002A8.5 8.5 0 0 0 20.5 12m-5.56-1.972a.75.75 0 0 1 1.062 1.059l-3.47 3.486a.75.75 0 0 1-1.063 0l-3.472-3.486-.05-.057a.75.75 0 0 1 1.056-1.053l.058.051L12 12.98zM22 12c0 5.522-4.478 10-10 10S2 17.522 2 12 6.477 2 12 2s10 4.478 10 10"
    />
  </svg>
);
