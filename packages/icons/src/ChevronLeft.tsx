import type { SVGProps } from "react";

export const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M8.25 12.07c0-.552.236-1.067.636-1.438l.002-.002 5.603-5.181a.75.75 0 0 1 1.018 1.102l-5.604 5.18a.46.46 0 0 0-.155.338c0 .115.048.237.155.338l5.454 5.042a.75.75 0 0 1-1.018 1.101L8.888 13.51l-.002-.002a1.96 1.96 0 0 1-.636-1.438"
    />
  </svg>
);
