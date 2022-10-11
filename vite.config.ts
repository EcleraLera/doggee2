import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';
import eslint from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  envPrefix: 'REACT_APP_',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    mainFields: [],
  },
  optimizeDeps: {},
  plugins: [
    react(),
    tsconfigPaths(),
    envCompatible(),
    eslint(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});
