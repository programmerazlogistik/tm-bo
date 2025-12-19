import { createAxiosAdapter } from "@muatmuat/lib/axios-adapter";

import { PUBLIC_ROUTES } from "./constants";

const createAxios = (baseURL: string | undefined) => {
  return createAxiosAdapter({
    baseURL,
    guard: {
      publicRoutes: PUBLIC_ROUTES,
      loggedOutRedirectTo: `${process.env.NEXT_PUBLIC_ASSET_REVERSE}/`,
      statusCode: [401],
    },
    languageId: "",
  });
};

export const fetcherMPPInter = createAxios(
  process.env.NEXT_PUBLIC_MPP_INTER_API
);

export const fetcherMPPDom = createAxios(process.env.NEXT_PUBLIC_MPP_DOM_API);

export const fetcherMuatparts = createAxios(
  process.env.NEXT_PUBLIC_INTERNAL_API
);

export const fetcherMock = createAxios(
  `${process.env.NEXT_PUBLIC_ASSET_REVERSE}/api`
);
