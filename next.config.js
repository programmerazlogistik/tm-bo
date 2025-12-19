import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.builder.io",
      },
      {
        hostname: "azlogistik.s3.ap-southeast-3.amazonaws.com",
      },
      {
        hostname: "azlogistik-rc.s3.ap-southeast-3.amazonaws.com",
      },
      {
        hostname: "fastly.picsum.photos",
      },
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "cdn.muatmuat.com",
      },
    ],
  },
  reactStrictMode: false,
  turbopack: {
    root: path.resolve(__dirname, "./"),
  },
  transpilePackages: ["@muatmuat/ui", "@muatmuat/lib", "@muatmuat/hooks"],
};

export default nextConfig;

// import MillionLint from "@million/lint";
// export default MillionLint.next({
//   enabled: process.env.NODE_ENV === "development",
//   rsc: process.env.NODE_ENV === "development",
// })(nextConfig);
