import type { SVGProps } from "react";

export const WarningCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      cx={12}
      cy={12}
      r={11.333}
      stroke={"currentColor"}
      strokeWidth={1.333}
      transform="rotate(180 12 12)"
    />
    <rect
      width={3}
      height={9.75}
      x={13.5}
      y={14.25}
      fill={"currentColor"}
      rx={1.5}
      transform="rotate(180 13.5 14.25)"
    />
    <rect
      width={3}
      height={3}
      x={13.5}
      y={18.75}
      fill={"currentColor"}
      rx={1.5}
      transform="rotate(180 13.5 18.75)"
    />
  </svg>
);
