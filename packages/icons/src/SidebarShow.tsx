import * as React from "react";
import type { SVGProps } from "react";

export const SidebarShow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill={"currentColor"} clipPath="url(#sidebar-show_svg__a)">
      <path d="M13.47 9.47a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06L14.94 12l-1.47-1.47a.75.75 0 0 1 0-1.06" />
      <path
        fillRule="evenodd"
        d="M18 3.25A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zM6 4.75c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h2.25V4.75zm3.75 14.5H18c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25H9.75z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="sidebar-show_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
