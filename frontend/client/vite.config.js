import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

const compressionConfig = {
  verbose: false,
  algorithm: "gzip",
  ext: ".gz",
  threshold: 10240,
  filter: /\.(js|ts|jsx|tsx|mjs|json|css|html)$/i,
};

export default defineConfig({
  plugins: [react(), viteCompression(compressionConfig)],
  root: "src",
});
