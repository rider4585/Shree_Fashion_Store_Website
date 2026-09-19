// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Shree_Fashion_Store_Website",
  vite: {
    plugins: [tailwindcss()],
  },
});