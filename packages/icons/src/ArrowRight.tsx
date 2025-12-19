import * as React from "react";
import type { SVGProps } from "react";

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M12.793 3.793a1 1 0 0 1 1.338-.068l.076.068 7.5 7.5a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 1 1-1.414-1.414L18.586 13H3a1 1 0 1 1 0-2h15.586l-5.793-5.793-.068-.076a1 1 0 0 1 .068-1.338"
    />
  </svg>
);
