import * as React from "react";
import type { SVGProps } from "react";

const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 29 29"
    {...props}
  >
    <path
      stroke="#176CF7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5}
      d="M26.5 14.504h-24M14.831 26.5 2.5 14.5l12.331-12"
    />
  </svg>
);
export default SvgBack;
