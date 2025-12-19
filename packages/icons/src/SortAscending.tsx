import * as React from "react";
import type { SVGProps } from "react";

export const SortAscending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M11.229 21V4.353L7.535 8.108l-.056.052a.75.75 0 0 1-1.014-1.103l4.202-4.273h.002l.131-.122a1.8 1.8 0 0 1 1.143-.412l.027.002.009-.001q.042 0 .084.006c.375.025.732.166 1.021.405l.132.121.002.001 4.317 4.39.051.057a.75.75 0 0 1-1.064 1.047l-.057-.052-3.736-3.8V21a.75.75 0 0 1-1.5 0"
    />
  </svg>
);
