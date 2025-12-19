import * as React from "react";
import type { SVGProps } from "react";

export const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11 3a1 1 0 1 1 2 0v15.586l5.793-5.793a1 1 0 1 1 1.414 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-7.5-7.5-.069-.076a1 1 0 0 1 1.407-1.406l.076.068L11 18.586z"
    />
  </svg>
);
