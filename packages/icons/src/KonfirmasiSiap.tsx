import * as React from "react";
import type { SVGProps } from "react";

export const KonfirmasiSiap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      clipPath="url(#konfirmasi-siap_svg__a)"
    >
      <path d="M18 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      <path d="M14.25 18V9.75h4.5l3 3.75V18H19.5M6.75 11.25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9" />
      <path d="M6.75 4.5v2.25L8.25 6M2.25 6.75V18H4.5M7.5 18h6.75V6.75h-3" />
    </g>
    <defs>
      <clipPath id="konfirmasi-siap_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
