import * as React from "react";
import type { SVGProps } from "react";

export const Warning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M9.732 3.922c1.112-1.713 3.69-1.656 4.705.17l6.6 11.882.09.173c.846 1.799-.462 3.913-2.493 3.913H5.432c-2.097 0-3.423-2.253-2.404-4.086L9.629 4.092zm3.393.899a1.25 1.25 0 0 0-2.087-.15l-.098.15-6.6 11.882a1.25 1.25 0 0 0 1.092 1.857h13.202c.894 0 1.479-.9 1.167-1.7l-.074-.157zm-1.841 10.488v-.011a.75.75 0 0 1 1.5 0v.011a.75.75 0 0 1-1.5 0m0-2.998v-3a.75.75 0 0 1 1.5 0v3a.75.75 0 1 1-1.5 0"
    />
  </svg>
);
