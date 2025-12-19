import type { SVGProps } from "react";

export const ZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill={"currentColor"} clipPath="url(#zoom-out_svg__a)">
      <path d="M8.47 14.47a.75.75 0 1 1 1.06 1.06l-4.72 4.72H7a.75.75 0 0 1 0 1.5H3a1 1 0 0 1-.133-.013l-.016-.003q-.02-.005-.04-.011-.05-.012-.098-.03-.044-.02-.083-.045a.8.8 0 0 1-.16-.118.75.75 0 0 1-.22-.53v-4a.75.75 0 0 1 1.5 0v2.19zM21.077 2.254l.033.006a.8.8 0 0 1 .277.1q.027.017.055.036l.019.013a1 1 0 0 1 .07.06l.016.02.014.015a.8.8 0 0 1 .12.188l.014.028q.015.042.026.086.009.025.015.052A1 1 0 0 1 21.75 3v4a.75.75 0 0 1-1.5 0V4.81l-4.72 4.72a.75.75 0 0 1-1.06-1.06l4.72-4.72H17a.75.75 0 0 1 0-1.5h4z" />
    </g>
    <defs>
      <clipPath id="zoom-out_svg__a">
        <path fill="#fff" d="M0 24h24V0H0z" />
      </clipPath>
    </defs>
  </svg>
);
