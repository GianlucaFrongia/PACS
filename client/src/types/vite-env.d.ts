/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_ORTHANC_URL: string
    readonly VITE_KEYCLOAK_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}