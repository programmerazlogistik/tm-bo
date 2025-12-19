import * as React from "react";
import type { SVGProps } from "react";

export const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#search_svg__a)">
      <path
        fill={"currentColor"}
        d="M10.941 2c4.386 0 7.942 3.535 7.942 7.895a7.84 7.84 0 0 1-2.144 5.39l4.029 5.005a1.05 1.05 0 0 1-.166 1.48 1.063 1.063 0 0 1-1.488-.165l-4.012-4.986a7.94 7.94 0 0 1-4.16 1.17C6.555 17.79 3 14.255 3 9.895S6.556 2 10.941 2m0 2.105c-3.216 0-5.824 2.592-5.824 5.79s2.608 5.79 5.824 5.79c3.217 0 5.824-2.593 5.824-5.79s-2.607-5.79-5.824-5.79"
      />
    </g>
    <defs>
      <clipPath id="search_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
