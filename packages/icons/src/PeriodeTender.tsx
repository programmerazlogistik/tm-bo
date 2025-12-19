import * as React from "react";
import type { SVGProps } from "react";

export const PeriodeTender = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M6 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4.586a1 1 0 0 1-.293.707l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 0 1 .293.707V21a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4.586a1 1 0 0 1 .293-.707l3-3a1 1 0 0 0 0-1.414l-3-3A1 1 0 0 1 6 7.586zm10 13.914a1 1 0 0 0-.293-.707l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 0 0-.293.707V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1zm-4.707-6.121a1 1 0 0 0 1.414 0l3-3A1 1 0 0 0 16 7.086V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.086a1 1 0 0 0 .293.707zM10 6.53a.53.53 0 0 1 .53-.53h2.94a.53.53 0 0 1 .375.905l-1.138 1.138a1 1 0 0 1-1.414 0l-1.138-1.138A.53.53 0 0 1 10 6.53"
    />
  </svg>
);
