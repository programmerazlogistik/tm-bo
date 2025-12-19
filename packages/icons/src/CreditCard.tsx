import * as React from "react";
import type { SVGProps } from "react";

export const CreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M21.25 9.75H2.75V17A2.25 2.25 0 0 0 5 19.25h14A2.25 2.25 0 0 0 21.25 17zM11 15.25a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1 0-1.5zm8 0a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5zm-11-2.5a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1 0-1.5zM21.25 7A2.25 2.25 0 0 0 19 4.75H5A2.25 2.25 0 0 0 2.75 7v1.25h18.5zm1.5 10A3.75 3.75 0 0 1 19 20.75H5A3.75 3.75 0 0 1 1.25 17V7A3.75 3.75 0 0 1 5 3.25h14A3.75 3.75 0 0 1 22.75 7z"
    />
  </svg>
);
