import * as React from "react";
import type { SVGProps } from "react";

export const LaporanMuatrans = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 7H8M16.13 11H8"
    />
    <path
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 19.191V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v15.191a.5.5 0 0 1-.724.447l-1.943-.972-2.443 1.222a.5.5 0 0 1-.447 0L12 18.667l-2.443 1.222a.5.5 0 0 1-.447 0l-2.443-1.222-1.943.972A.5.5 0 0 1 4 19.191"
      clipRule="evenodd"
    />
    <path
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 15H8"
    />
  </svg>
);
