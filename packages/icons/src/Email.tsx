import * as React from "react";
import type { SVGProps } from "react";

export const Email = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M5.535 8.38a.75.75 0 0 1 .992-.157l.063.045 4.475 3.609a1.55 1.55 0 0 0 1.93 0L17.43 8.27a.751.751 0 0 1 .947 1.164l-4.443 3.613-.008.005a3.05 3.05 0 0 1-3.792 0l-.005-.003-4.48-3.613-.058-.052a.75.75 0 0 1-.056-1.003"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M16.91 2.25c3.538 0 5.84 2.924 5.84 6.32v6.868c0 3.396-2.301 6.32-5.84 6.311l-9.82.001c-3.539.009-5.84-2.916-5.84-6.312V8.57c0-3.396 2.302-6.32 5.84-6.32zm-9.82 1.5c-2.543 0-4.34 2.075-4.34 4.82v6.868c0 2.747 1.797 4.819 4.339 4.812h9.822l.236-.006c2.416-.118 4.103-2.145 4.103-4.805V8.57c0-2.745-1.797-4.82-4.34-4.82z"
      clipRule="evenodd"
    />
  </svg>
);
