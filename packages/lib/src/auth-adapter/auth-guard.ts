export const getIsPublicRoute = (publicRoutes: PublicRoute[] = []) =>
  publicRoutes.some((route) => {
    const pathname = window?.location?.pathname;
    if (!pathname) return false;

    switch (route.method) {
      case "exact":
        return pathname === route.path;
      case "includes":
        return pathname.includes(route.path as string);
      case "regex":
        return route.path instanceof RegExp && route.path.test(pathname);
      default:
        return false;
    }
  });

// Route configuration types
export type RouteMethod = "exact" | "includes" | "regex";

export interface PublicRoute {
  path: string | RegExp;
  method: RouteMethod;
}

// Default public routes list
export const DEFAULT_PUBLIC_ROUTES: PublicRoute[] = [
  {
    path: "/",
    method: "exact",
  },
  {
    path: "/login",
    method: "exact",
  },
];
