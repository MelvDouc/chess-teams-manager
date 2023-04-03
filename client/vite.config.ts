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
      "@components": resolve(".", "src", "components"),
      "@pages": resolve(".", "src", "pages"),
      "@routing": resolve(".", "src", "routing"),
      "@types": resolve(".", "src", "types.ts"),
      "@utils": resolve(".", "src", "utils")
    }
  }
});