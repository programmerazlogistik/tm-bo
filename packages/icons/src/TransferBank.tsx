import * as React from "react";
import type { SVGProps } from "react";

export const TransferBank = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill={"currentColor"} clipPath="url(#transfer-bank_svg__a)">
      <path d="M12 23.25C5.796 23.25.75 18.203.75 12S5.796.75 12 .75 23.25 5.797 23.25 12 18.204 23.25 12 23.25m0-21c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25" />
      <path d="M13.72 17.03a.754.754 0 0 1 0-1.06l1.72-1.72H6.75A.754.754 0 0 1 6 13.5c0-.411.339-.75.75-.75h10.5a.75.75 0 0 1 .53 1.28l-3 3c-.29.291-.77.291-1.06 0M17.25 11.25H6.75a.75.75 0 0 1-.53-1.28l3-3a.75.75 0 1 1 1.06 1.06L8.56 9.75h8.69a.75.75 0 1 1 0 1.5" />
    </g>
    <defs>
      <clipPath id="transfer-bank_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
