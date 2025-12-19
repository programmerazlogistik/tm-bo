import * as React from "react";
import type { SVGProps } from "react";

export const ChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11.93 8.25c.483 0 .938.181 1.293.494l.145.142.002.002 5.18 5.603.05.059a.75.75 0 0 1-1.096 1.012l-.055-.053-5.179-5.602-.08-.07a.45.45 0 0 0-.26-.087.47.47 0 0 0-.34.157L6.55 15.36l-1.1-1.018 5.041-5.453.002-.002.146-.142c.355-.313.81-.494 1.292-.494m-5.38 7.11a.75.75 0 0 1-1.1-1.02z"
    />
  </svg>
);
