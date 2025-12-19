import * as React from "react";
import type { SVGProps } from "react";

export const Shield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11.794.78a.75.75 0 0 1 .42 0l8.996 2.628a.75.75 0 0 1 .54.72v5.39L21 9.515h-.75V4.69L12.004 2.28 3.75 4.69v4.824a12.407 12.407 0 0 0 8.251 11.688 12.4 12.4 0 0 0 5.906-4.43 12.4 12.4 0 0 0 2.343-7.256l1.5.001a13.91 13.91 0 0 1-9.512 13.195l-.117.028a.75.75 0 0 1-.356-.028 13.91 13.91 0 0 1-9.504-12.65l-.011-.548V4.128a.75.75 0 0 1 .54-.72z"
    />
    <path
      fill={"currentColor"}
      d="M11.976 6.724a.75.75 0 0 1 .75.75v3.25h3.25a.75.75 0 0 1 0 1.5h-3.25v3.25a.75.75 0 0 1-1.5 0v-3.25h-3.25a.75.75 0 0 1 0-1.5h3.25v-3.25a.75.75 0 0 1 .75-.75"
    />
  </svg>
);
