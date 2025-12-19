import * as React from "react";
import type { SVGProps } from "react";

export const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11 21V5.414l-5.793 5.793a1 1 0 1 1-1.414-1.414l7.5-7.5.076-.068a1 1 0 0 1 1.338.068l7.5 7.5.068.076a1 1 0 0 1-1.406 1.406l-.076-.068L13 5.414V21a1 1 0 1 1-2 0"
    />
  </svg>
);
