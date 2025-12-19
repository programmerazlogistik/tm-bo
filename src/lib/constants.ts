import { PublicRoute } from "@muatmuat/lib/axios-adapter";

export const PUBLIC_ROUTES: PublicRoute[] = [
  {
    path: "/backdoor/login",
    method: "exact",
  },
  {
    path: "/backdoor/environment",
    method: "exact",
  },
  {
    path: "/",
    method: "exact",
  },
  {
    path: /^\/preview\/.+$/,
    method: "regex",
  },
  {
    path: "/preview",
    method: "includes",
  },
];
