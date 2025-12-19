import type { SVGProps } from "react";

export const Heart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={"currentColor"}
      d="M12.548 4.476c2.22-2.302 5.807-2.302 8.026 0 2.235 2.318 2.234 6.088 0 8.406l-.014.015-.002.002-7.681 7.968c-.492.51-1.279.51-1.77 0L3.435 12.91h-.001l-.01-.01c-2.234-2.319-2.233-6.087 0-8.405 2.22-2.303 5.808-2.303 8.027 0l.542.562.54-.564z"
    />
  </svg>
);
