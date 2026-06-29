/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUB_USER?: string;
  readonly VITE_HUB_PASSWORD?: string;
  readonly VITE_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
