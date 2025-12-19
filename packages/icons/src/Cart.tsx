import * as React from "react";
import type { SVGProps } from "react";

export const Cart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill={"currentColor"}
      fillRule="evenodd"
      clipPath="url(#cart_svg__a)"
      clipRule="evenodd"
    >
      <path d="M3.271 2.264A2.75 2.75 0 0 1 5.75 5v10l.006.124A1.25 1.25 0 0 0 7 16.25h15a.75.75 0 0 1 0 1.5h-1.553a2.75 2.75 0 1 1-4.895 0h-4.105a2.75 2.75 0 1 1-4.877-.038 2.746 2.746 0 0 1-2.306-2.44L4.25 15V5a1.25 1.25 0 0 0-1.126-1.244L3 3.75H2a.75.75 0 0 1 0-1.5h1zM9 17.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m9 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5" />
      <path d="M16 5.25A3.75 3.75 0 0 1 19.75 9v2A3.75 3.75 0 0 1 16 14.75h-4A3.75 3.75 0 0 1 8.25 11V9A3.75 3.75 0 0 1 12 5.25zm-4 1.5A2.25 2.25 0 0 0 9.75 9v2A2.25 2.25 0 0 0 12 13.25h4A2.25 2.25 0 0 0 18.25 11V9A2.25 2.25 0 0 0 16 6.75z" />
    </g>
    <defs>
      <clipPath id="cart_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
