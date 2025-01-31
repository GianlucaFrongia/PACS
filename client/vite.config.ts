import { sentryVitePlugin } from "@sentry/vite-plugin";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {TanStackRouterVite} from "@tanstack/router-vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite(), sentryVitePlugin({
        org: "fhnw-lst-mi",
        project: "javascript-react"
    })],

    envDir: "./",
    base: "/",

    build: {
        sourcemap: true
    }
});