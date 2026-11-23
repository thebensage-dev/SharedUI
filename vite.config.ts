import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Only Storybook uses this (it adds React and the Next.js mocks itself); the package is built by tsc.
export default defineConfig({
  plugins: [tailwindcss()],
});
