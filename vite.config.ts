import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  // Only import visualizer in development or when explicitly needed
  let visualizer: any = null;
  if (process.env.ENABLE_VISUALIZER === 'true') {
    try {
      visualizer = require('rollup-plugin-visualizer');
    } catch (e) {
      console.warn('rollup-plugin-visualizer not found, skipping...');
    }
  }
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      isProduction && visualizer && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
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
