/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Base relative pour pouvoir ouvrir le HTML produit en file:// (double-clic).
// viteSingleFile inline JS et CSS dans un unique .html distribuable sans serveur.
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
