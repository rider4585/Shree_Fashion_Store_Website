import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        // Force a single copy of React across all packages. Without this a
        // transitive dependency can resolve its own React copy, which triggers
        // "Invalid hook call" errors at runtime.
        dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react-router"],
                    "convex-vendor": ["convex"],
                    "framer-motion": ["framer-motion"],
                },
                chunkFileNames: "assets/[name]-[hash].js",
                entryFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash].[ext]",
            },
        },
        chunkSizeWarningLimit: 1000,
        target: "esnext",
        minify: "esbuild",
    },
    optimizeDeps: {
        entries: ["index.html"],
        include: [
            "react",
            "react/jsx-runtime",
            "react-dom",
            "react-dom/client",
            "react-router",
            "@convex-dev/auth/react",
            "framer-motion",
        ],
    },
    server: {
        host: true,
        port: 5173,
        hmr: {
            overlay: false,
        },
    },
});