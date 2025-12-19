import * as React from "react";
import type { SVGProps } from "react";

export const Blue4 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill="#176CF7" rx={12} />
    <path
      fill="#fff"
      d="M16.331 15.43h-1.455v2.07h-2.355v-2.07H7.526v-2.115l4.32-6.435h3.015v6.51h1.47zm-3.795-2.04V9.46h-.045l-2.52 3.93z"
    />
  </svg>
);
