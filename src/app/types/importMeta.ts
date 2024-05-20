// export interface ImportMeta {
//   env: {
// VITE_RR_PROJECT_KEY: string
// VITE_RR_SCOPES: string
// VITE_RR_CLIENT_ID: string
// VITE_RR_CLIENT_SECRET: string
// VITE_RR_AUTH_URL: string
// VITE_RR_API_URL: string
//   }
// }
/* eslint-disable @typescript-eslint/naming-convention */
export interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  VITE_RR_PROJECT_KEY: string
  VITE_RR_SCOPES: string
  VITE_RR_CLIENT_ID: string
  VITE_RR_CLIENT_SECRET: string
  VITE_RR_AUTH_URL: string
  VITE_RR_API_URL: string
}
