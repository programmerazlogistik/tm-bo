import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const { docs, meta } = defineDocs({
  dir: "src/content/docs",
}) as {
  docs: any;
  meta: any;
};

export default defineConfig();
