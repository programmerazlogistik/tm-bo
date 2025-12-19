import * as React from "react";
import type { SVGProps } from "react";

export const Profile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#profile_svg__a)">
      <path
        fill={"currentColor"}
        d="M15.87 6.592c0-2.13-1.706-3.842-3.79-3.842-2.086 0-3.79 1.712-3.79 3.842s1.704 3.84 3.79 3.84c2.084 0 3.789-1.71 3.79-3.84m1.5 0a5.35 5.35 0 0 1-3.1 4.86c2.844.815 5.355 3.176 6.528 6.969l.136.47.79 2.913.016.075a.75.75 0 0 1-1.44.39l-.024-.073-.79-2.912-.12-.417c-1.308-4.237-4.393-6.236-7.366-6.236-3.07 0-6.258 2.13-7.486 6.653l-.79 2.912a.75.75 0 1 1-1.448-.392l.79-2.913.136-.47c1.186-3.835 3.74-6.209 6.623-6.997A5.35 5.35 0 0 1 6.79 6.592c0-2.942 2.36-5.342 5.29-5.342 2.928 0 5.29 2.4 5.29 5.342"
      />
    </g>
    <defs>
      <clipPath id="profile_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
