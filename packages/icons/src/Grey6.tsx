import * as React from "react";
import type { SVGProps } from "react";

export const Grey6 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill={"currentColor"} rx={12} />
    <path
      fill="#fff"
      d="M16.166 13.93c0 2.415-1.89 3.855-4.185 3.855-2.31 0-4.185-1.47-4.185-3.795 0-1.26.48-2.235 1.185-3.285l2.565-3.825h3.045l-2.61 3.63-.045.075c.195-.075.51-.12.75-.12 1.86 0 3.48 1.395 3.48 3.465m-2.52.06c0-.96-.66-1.665-1.65-1.665s-1.68.69-1.68 1.68c0 .915.66 1.68 1.665 1.68.99 0 1.665-.69 1.665-1.695"
    />
  </svg>
);
