import * as React from "react";
import type { SVGProps } from "react";

export const Edit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="m20.001 19.65.077.004a.75.75 0 0 1 0 1.492l-.077.004h-9a.75.75 0 0 1 0-1.5zM14.257 2.457a.75.75 0 0 1 .555.148l3.467 2.66a.75.75 0 0 1 .137 1.051L8.676 19.01a.75.75 0 0 1-.29.23l-4.168 1.844a.75.75 0 0 1-1.045-.802l.702-4.503.02-.092a.8.8 0 0 1 .126-.249L13.76 2.744l.1-.109a.75.75 0 0 1 .397-.178M5.327 16.2l-.46 2.955 2.737-1.211 6.731-8.773-2.277-1.747zm7.644-9.966 2.277 1.747 1.522-1.983-2.277-1.747z"
    />
  </svg>
);
