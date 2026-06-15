import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
    server: {
      host: "::",
      port: 8080,
      // Proxy API requests to backend during development
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          rewrite: (pathname) => pathname.replace(/^\/api/, '/api'),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxying request:', req.method, req.url);
            });
          },
        },
        '/health': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
        '/process': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
    build: {
      // Production optimizations
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
            'workflow-vendor': ['@xyflow/react', 'zustand'],
            'animation-vendor': ['framer-motion'],
            // Node catalog (13k-line nodeTypes.ts + usage guides) — shared by many lazy chunks.
            // Pinning to a dedicated chunk stops Vite from co-bundling it into fillMode/attach-inputs
            // shared chunks, which were bloating those to 100-130 KB gzip.
            'node-catalog': [
              './src/components/workflow/nodeTypes.ts',
              './src/components/workflow/nodeUsageGuides.ts',
              './src/components/workflow/nodeLaymanDescriptions.ts',
              './src/components/workflow/backendSupportedNodeTypes.ts',
              './src/components/workflow/backendSupportedNodeOperations.ts',
            ],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      // Target modern browsers for smaller bundle
      target: 'esnext',
    },
  };
});
