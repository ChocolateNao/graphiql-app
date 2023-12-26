import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      layouts: path.resolve(__dirname, './src/layouts'),
      ui: path.resolve(__dirname, './src/components/ui'),
      api: path.resolve(__dirname, './src/api'),
      pages: path.resolve(__dirname, './src/pages'),
      assets: path.resolve(__dirname, './src/assets'),
      models: path.resolve(__dirname, './src/models'),
      shared: path.resolve(__dirname, './src/shared'),
      store: path.resolve(__dirname, './src/store'),
      hooks: path.resolve(__dirname, './src/hooks'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/sass/abstract/placeholders.scss";
          @import "./src/assets/sass/abstract/constants.scss";
          @import "./src/assets/sass/abstract/mixins.scss";
        `,
      },
    },
  },
});
