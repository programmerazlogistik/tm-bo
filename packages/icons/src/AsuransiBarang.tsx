import * as React from "react";
import type { SVGProps } from "react";

export const AsuransiBarang = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={"currentColor"}
      d="M14.51 9.574a.843.843 0 0 1 1.184 1.184l-.058.064-3.507 3.507a.84.84 0 0 1-1.126.058l-.064-.058-2.104-2.104-.058-.064a.842.842 0 0 1 1.184-1.185l.064.058 1.51 1.51 2.91-2.912z"
    />
    <path
      fill={"currentColor"}
      fillRule="evenodd"
      d="M9.721 2.678a6.02 6.02 0 0 1 4.56 0h.002l4.675 1.913.245.111a3.55 3.55 0 0 1 1.963 3.177v3.336c0 5.054-3.757 9.692-8.795 10.825a1.7 1.7 0 0 1-.738 0c-5.039-1.133-8.797-5.771-8.797-10.825V7.88c0-1.441.873-2.742 2.21-3.288zm3.924 1.558a4.34 4.34 0 0 0-3.287 0L5.683 6.149a1.87 1.87 0 0 0-1.163 1.73v3.336c0 4.247 3.193 8.218 7.482 9.182 4.29-.965 7.48-4.935 7.48-9.182V7.88c0-.758-.458-1.442-1.161-1.73z"
      clipRule="evenodd"
    />
  </svg>
);
