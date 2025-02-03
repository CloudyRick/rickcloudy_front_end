// src/global.d.ts
export {};

declare global {
  interface Window {
    APP_CONFIG?: {
      VITE_BASE_API_URL: any;
    };
  }
}
