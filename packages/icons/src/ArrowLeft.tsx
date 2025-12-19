import type { SVGProps } from "react";

export const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M9.87 3.725a1 1 0 0 1 1.405 1.406l-.068.076L5.414 11H21a1 1 0 1 1 0 2H5.414l5.793 5.793.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-7.5-7.5a1 1 0 0 1 0-1.414l7.5-7.5z"
    />
  </svg>
);
