import * as React from "react";
import type { SVGProps } from "react";

export const SortDescending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11.229 3a.75.75 0 0 1 1.5 0v16.573l3.736-3.799.057-.052a.751.751 0 0 1 1.013 1.104l-4.317 4.389-.002.002a1.8 1.8 0 0 1-1.237.532l-.01-.001-.026.002c-.48 0-.938-.193-1.274-.533l-.002-.002-4.202-4.272-.05-.057a.75.75 0 0 1 1.064-1.046l.056.052 3.694 3.755z"
    />
  </svg>
);
