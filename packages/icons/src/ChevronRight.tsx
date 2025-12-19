import * as React from "react";
import type { SVGProps } from "react";

export const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M14.25 11.93a.46.46 0 0 0-.155-.337L8.64 6.55A.75.75 0 0 1 9.66 5.449l5.453 5.042.002.002.142.146c.313.355.494.81.494 1.292 0 .55-.237 1.066-.636 1.437l-.002.002-5.603 5.18a.75.75 0 0 1-1.018-1.1l5.604-5.182a.46.46 0 0 0 .155-.338"
    />
  </svg>
);
