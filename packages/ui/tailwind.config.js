import preset from "@muatmuat/tailwind-config/preset";
import { createPreset } from "fumadocs-ui/tailwind-plugin";

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  presets: [preset, createPreset()],
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
