import * as React from "react";
import type { SVGProps } from "react";

export const Galeri = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={"currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 19.203V4.797c-.008-.314.07-.624.228-.898.158-.275.39-.503.67-.661a1.86 1.86 0 0 1 1.846.014l12.422 7.232c.255.154.465.37.611.624a1.68 1.68 0 0 1 0 1.667c-.146.255-.356.47-.611.625L6.744 20.748a1.86 1.86 0 0 1-1.845.014 1.8 1.8 0 0 1-.67-.66 1.7 1.7 0 0 1-.228-.9"
    />
  </svg>
);
