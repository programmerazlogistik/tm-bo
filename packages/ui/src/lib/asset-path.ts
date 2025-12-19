export const getAssetPath = (src: string) =>
  `${process.env.NEXT_PUBLIC_ASSET_REVERSE}${src.startsWith("/") ? src : `/${src}`}`.trim();
