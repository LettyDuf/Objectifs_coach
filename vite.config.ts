/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Base relative pour pouvoir ouvrir le HTML produit en file:// (double-clic).
// viteSingleFile inline JS et CSS dans un unique .html distribuable sans serveur.
// Tampon de build affiché dans le titre de l'onglet : permet de vérifier en
// un coup d'œil quelle version du fichier le navigateur affiche réellement
// (incident du 2026-07-08 : cache / mauvais fichier ouvert, indécidable sans ça).
const BUILD_STAMP = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Paris",
}).format(new Date());

export default defineConfig({
  base: "./",
  define: {
    __BUILD_STAMP__: JSON.stringify(BUILD_STAMP),
  },
  plugins: [react(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/*.bak/**"],
  },
});
