import * as React from "react";
import type { SVGProps } from "react";

export const Grey1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill={"currentColor"} rx={12} />
    <path
      fill="#fff"
      d="M13.916 17.5h-2.52V9.7l-1.98 1.53-1.305-1.785 3.495-2.565h2.31z"
    />
  </svg>
);
