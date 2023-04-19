import { defineConfig } from "vite";
import { resolve } from "path";

const srcDir = resolve(".", "src");

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import {h, Fragment} from 'reactfree-jsx';"
  },
  resolve: {
    alias: {
      "@components": resolve(srcDir, "components"),
      "@pages": resolve(srcDir, "pages"),
      "@routing": resolve(srcDir, "routing"),
      "@types": resolve(srcDir, "types.ts"),
      "@styles": resolve(srcDir, "styles"),
      "@utils": resolve(srcDir, "utils")
    }
  }
});