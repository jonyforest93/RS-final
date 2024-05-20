export const appConstants: Record<string, string> = {
  PROJECT_KEY: import.meta.env.VITE_RR_PROJECT_KEY,
  SCOPES: import.meta.env.VITE_RR_SCOPES,
  CLIENT_ID: import.meta.env.VITE_RR_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_RR_CLIENT_SECRET,
  AUTH_URL: import.meta.env.VITE_RR_AUTH_URL,
  API_URL: import.meta.env.VITE_RR_API_URL,
}
