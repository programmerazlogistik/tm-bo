import * as React from "react";
import type { SVGProps } from "react";

export const Notification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M13.042 15.89c-.001.295-.11.577-.306.785-.195.208-.46.326-.735.327a1 1 0 0 1-.4-.085 1 1 0 0 1-.337-.24 1.1 1.1 0 0 1-.226-.362 1.2 1.2 0 0 1-.079-.424z"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M12.001 6.167c.207 0 .405.088.552.244.146.156.23.368.23.589v.377a3.18 3.18 0 0 1 1.762 1.307c.427.64.633 1.42.581 2.204v2.78l1.041 1.11v.556H7.834v-.556l1.042-1.112v-2.778a3.56 3.56 0 0 1 .429-1.96l.15-.245a3.17 3.17 0 0 1 1.765-1.305V7c0-.22.082-.433.228-.589a.76.76 0 0 1 .553-.244m-.441 2.414c-.415.118-.796.391-1.066.795-.27.406-.406.91-.371 1.426l.003.043v3.239h3.75v-3.238l.002-.041a2.3 2.3 0 0 0-.372-1.428 1.93 1.93 0 0 0-1.068-.798l-.433-.125z"
      clipRule="evenodd"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 1.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5"
      clipRule="evenodd"
    />
  </svg>
);
