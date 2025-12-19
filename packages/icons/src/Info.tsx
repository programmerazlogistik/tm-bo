import * as React from "react";
import type { SVGProps } from "react";

export const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M12 10.125c.69 0 1.25.56 1.25 1.25V17a1.25 1.25 0 1 1-2.5 0v-5.625c0-.69.56-1.25 1.25-1.25M12 6.375a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17"
      clipRule="evenodd"
    />
  </svg>
);
