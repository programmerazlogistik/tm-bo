import * as React from "react";
import type { SVGProps } from "react";

export const PlusSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M8.081 12.522a.749.749 0 0 1 .53-1.28h6.778a.749.749 0 1 1 0 1.5H8.612a.74.74 0 0 1-.53-.22"
      clipRule="evenodd"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M11.469 15.913a.74.74 0 0 1-.22-.53l.002-6.784a.749.749 0 1 1 1.499 0l-.001 6.784a.749.749 0 0 1-1.28.53"
      clipRule="evenodd"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916v8.168c0 2.683 1.635 4.416 4.165 4.416h8.668c2.531 0 4.167-1.733 4.167-4.416V7.916c0-2.683-1.636-4.416-4.166-4.416zM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2h8.669C19.723 2 22 4.378 22 7.916v8.168C22 19.622 19.723 22 16.333 22"
      clipRule="evenodd"
    />
  </svg>
);
