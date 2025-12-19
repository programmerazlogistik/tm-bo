import * as React from "react";
import type { SVGProps } from "react";

export const SidebarHide = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M14.526 9.418a.75.75 0 0 1 1.056 1.056l-.052.056L14.06 12l1.47 1.47.052.056a.75.75 0 0 1-1.056 1.056l-.056-.052-2-2a.75.75 0 0 1 0-1.06l2-2z"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M18 3.25A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zM6 4.75c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h2.25V4.75zm3.75 14.5H18c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25H9.75z"
      clipRule="evenodd"
    />
  </svg>
);
