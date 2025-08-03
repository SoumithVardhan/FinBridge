/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_NODE_ENV: string
  readonly VITE_COMPANY_NAME: string
  readonly VITE_COMPANY_PHONE: string
  readonly VITE_COMPANY_EMAIL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEBUG: string
  readonly VITE_ENABLE_SWAGGER: string
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_FACEBOOK_PIXEL_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
