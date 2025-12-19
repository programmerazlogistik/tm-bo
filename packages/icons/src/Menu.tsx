import * as React from "react";
import type { SVGProps } from "react";

export const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#menu_svg__a)">
      <path
        fill={"currentColor"}
        d="M12 7c1.375 0 2.5-1.125 2.5-2.5S13.375 2 12 2a2.507 2.507 0 0 0-2.5 2.5C9.5 5.875 10.625 7 12 7m0 2.5A2.507 2.507 0 0 0 9.5 12c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5m0 7.5a2.507 2.507 0 0 0-2.5 2.5c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5S13.375 17 12 17"
      />
    </g>
    <defs>
      <clipPath id="menu_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
