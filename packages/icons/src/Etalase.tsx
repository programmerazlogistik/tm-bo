import * as React from "react";
import type { SVGProps } from "react";

export const Etalase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#etalase_svg__a)">
      <path
        fill={"currentColor"}
        d="M18.648 2.097a3.01 3.01 0 0 1 3.007 3.007v13.543a3.01 3.01 0 0 1-3.008 3.007H5.105a3.01 3.01 0 0 1-3.006-3.008V5.105a3.007 3.007 0 0 1 3.006-3.007zm-15.05 16.55c0 .832.674 1.507 1.506 1.507h6.022V9.24H3.598zm9.028 1.507h6.022c.832 0 1.507-.675 1.507-1.508v-2.635h-7.529zm0-5.643h7.53V5.104c0-.833-.676-1.507-1.508-1.507h-6.022zM5.104 3.597c-.832 0-1.506.674-1.506 1.507v2.635h7.528V3.597z"
      />
    </g>
    <defs>
      <clipPath id="etalase_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
