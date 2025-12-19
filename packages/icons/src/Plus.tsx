import * as React from "react";
import type { SVGProps } from "react";

export const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11.75 4a.75.75 0 0 1 .75.75V11h6.25l.077.004a.75.75 0 0 1 0 1.492l-.077.004H12.5v6.25a.75.75 0 0 1-1.5 0V12.5H4.75a.75.75 0 0 1 0-1.5H11V4.75a.75.75 0 0 1 .75-.75"
    />
  </svg>
);
