import * as React from "react";
import type { SVGProps } from "react";

export const Grey5 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill={"currentColor"} rx={12} />
    <path
      fill="#fff"
      d="M15.881 13.99c0 2.58-2.01 3.795-4.095 3.795-1.935 0-3.54-1.02-4.035-2.7l2.295-.705a1.78 1.78 0 0 0 1.71 1.275c.855 0 1.59-.525 1.59-1.545 0-1.26-1.14-1.62-2.175-1.62-.75 0-1.845.195-2.595.465l.255-6.075h6.51v2.16h-4.275l-.09 1.68c.315-.075.75-.105 1.065-.105 2.13 0 3.84 1.14 3.84 3.375"
    />
  </svg>
);
