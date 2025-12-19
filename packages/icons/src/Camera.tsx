import * as React from "react";
import type { SVGProps } from "react";

export const Camera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill={"currentColor"}
      fillRule="evenodd"
      clipPath="url(#camera_svg__a)"
      clipRule="evenodd"
    >
      <path d="M12 9.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5m0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5" />
      <path d="M15 3.25A1.75 1.75 0 0 1 16.75 5 1.25 1.25 0 0 0 18 6.25h1A2.75 2.75 0 0 1 21.75 9v9A2.75 2.75 0 0 1 19 20.75H5A2.75 2.75 0 0 1 2.25 18V9A2.75 2.75 0 0 1 5 6.25h1A1.25 1.25 0 0 0 7.25 5 1.75 1.75 0 0 1 9 3.25zm-6 1.5a.25.25 0 0 0-.25.25A2.75 2.75 0 0 1 6 7.75H5A1.25 1.25 0 0 0 3.75 9v9A1.25 1.25 0 0 0 5 19.25h14A1.25 1.25 0 0 0 20.25 18V9A1.25 1.25 0 0 0 19 7.75h-1A2.75 2.75 0 0 1 15.25 5a.25.25 0 0 0-.25-.25z" />
    </g>
    <defs>
      <clipPath id="camera_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
