import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import {h, Fragment} from 'reactfree-jsx';"
  },
  resolve: {
    alias: {
      "@src": resolve(".", "src"),
      "~bootstrap": resolve(".", "node_modules", "bootstrap"),
      "~bootstrap-icons": resolve(".", "node_modules", "bootstrap-icons"),
    }
  }
});