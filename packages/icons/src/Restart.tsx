import * as React from "react";
import type { SVGProps } from "react";

export const Restart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M3.25 12c0-4.81 3.788-8.75 8.508-8.75 3.062 0 5.736 1.663 7.232 4.14l.142.243.034.07a.75.75 0 0 1 .015.547h.069V5a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-.75.75h-3.879a.75.75 0 0 1 0-1.5h1.632c-1.233-2.105-3.461-3.5-5.995-3.5C7.909 4.75 4.75 7.974 4.75 12s3.16 7.25 7.008 7.25c3.089 0 5.73-2.073 6.656-4.977a.75.75 0 0 1 1.43.454c-1.11 3.484-4.3 6.023-8.086 6.023-4.72 0-8.508-3.94-8.508-8.75"
    />
  </svg>
);
