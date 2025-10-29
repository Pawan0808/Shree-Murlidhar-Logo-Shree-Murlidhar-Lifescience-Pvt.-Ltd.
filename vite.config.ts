import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from 'rollup-plugin-visualizer';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      isProduction && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as any,
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      postcss: "./postcss.config.js",
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor';
              }
              if (id.includes('gapi-script')) {
                return 'gapi';
              }
              if (id.includes('@radix-ui')) {
                return 'radix';
              }
              if (id.includes('firebase') || id.includes('@firebase')) {
                return 'firebase';
              }
              return 'vendor-other';
            }
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      minify: isProduction ? 'esbuild' : false,
      sourcemap: !isProduction,
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  };
});
