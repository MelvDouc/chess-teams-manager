/// <reference types="vite/client" />

// import("reactfree-jsx");

interface ImportMetaEnv {
  readonly VITE_LOGO_URL: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_SITE_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}