import * as React from "react";
import type { SVGProps } from "react";

export const Grey2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill={"currentColor"} rx={12} />
    <path
      fill="#fff"
      d="M15.851 17.5h-7.68v-2.1l4.14-3.75c.525-.495.87-.99.87-1.635 0-.75-.525-1.275-1.32-1.275-.84 0-1.395.66-1.5 1.605l-2.415-.33c.24-2.145 1.98-3.42 4.05-3.42 1.95 0 3.84 1.035 3.84 3.255 0 1.515-.885 2.4-1.86 3.27l-2.46 2.19h4.335z"
    />
  </svg>
);
