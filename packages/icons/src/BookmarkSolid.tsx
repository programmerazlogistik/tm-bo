import * as React from "react";
import type { SVGProps } from "react";

export const BookmarkSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M6.357 4h11.287c.446 0 .807.361.807.806V20.24a.403.403 0 0 1-.618.342l-5.832-3.657-5.833 3.657a.403.403 0 0 1-.617-.342V4.806c0-.445.36-.806.806-.806"
    />
  </svg>
);
