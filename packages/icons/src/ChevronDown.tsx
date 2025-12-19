import type { SVGProps } from "react";

export const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M5.49 8.45a.75.75 0 0 1 1.006-.013l.055.054 5.178 5.602.08.07c.083.06.174.087.26.087a.47.47 0 0 0 .34-.157l5.04-5.452.055-.054a.75.75 0 0 1 1.046 1.072l-5.042 5.453-.001.002c-.372.4-.887.636-1.438.636s-1.066-.236-1.437-.636l-.002-.002L5.449 9.51 5.4 9.45a.75.75 0 0 1 .09-1"
    />
  </svg>
);
