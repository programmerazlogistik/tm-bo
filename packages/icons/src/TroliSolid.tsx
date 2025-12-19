import * as React from "react";
import type { SVGProps } from "react";

export const TroliSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M2 2.667A.667.667 0 0 1 2.667 2h2a.67.67 0 0 1 .646.505l.54 2.162h15.48a.667.667 0 0 1 .655.789l-2 10.667a.67.67 0 0 1-.655.544h-12a.67.67 0 0 1-.654-.544L4.68 5.476l-.533-2.143h-1.48A.667.667 0 0 1 2 2.667m6.667 14a2.667 2.667 0 1 0 0 5.333 2.667 2.667 0 0 0 0-5.333m9.333 0A2.667 2.667 0 1 0 18 22a2.667 2.667 0 0 0 0-5.333M8.667 18a1.334 1.334 0 1 1 0 2.667 1.334 1.334 0 0 1 0-2.667M18 18a1.333 1.333 0 1 1 0 2.667A1.333 1.333 0 0 1 18 18"
    />
  </svg>
);
