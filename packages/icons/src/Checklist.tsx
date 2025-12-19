import type { SVGProps } from "react";

export const Checklist = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      cx={12}
      cy={12}
      r={11.5}
      fill={"currentColor"}
      stroke={"currentColor"}
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 13.476 9.378 17 18 8"
    />
  </svg>
);
