import * as React from "react";
import type { SVGProps } from "react";

export const BintangSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M10.788 3.21c.447-1.077 1.976-1.077 2.423 0l2.082 5.006 5.405.434c1.163.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.27 1.136-.965 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434z"
      clipRule="evenodd"
    />
  </svg>
);
