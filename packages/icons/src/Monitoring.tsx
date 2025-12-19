import * as React from "react";
import type { SVGProps } from "react";

export const Monitoring = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M17.465 3.001A3.035 3.035 0 0 1 20.5 6.035v7.873l-.015.301a3.037 3.037 0 0 1-3.02 2.736h-3.088l.257 2.056h.546l.076.004a.75.75 0 0 1 0 1.492l-.076.004H8.323a.75.75 0 0 1 0-1.5h.544l.258-2.056h-3.09A3.036 3.036 0 0 1 3 13.91V6.035A3.035 3.035 0 0 1 6.035 3zm-7.085 16h2.743l-.258-2.056h-2.228zm-5.88-5.09c0 .847.687 1.534 1.535 1.534h11.43a1.54 1.54 0 0 0 1.536-1.536v-.52H4.5zM6.035 4.5c-.848 0-1.535.687-1.535 1.535v5.855h14.501V6.035a1.537 1.537 0 0 0-1.385-1.527l-.151-.008z"
      clipRule="evenodd"
    />
  </svg>
);
