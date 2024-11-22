/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns';
import svgr from 'vite-plugin-svgr';
import compress from 'vite-plugin-compression';
import { resolve } from 'path';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      react({
        babel: { plugins: ['jotai/babel/plugin-debug-label', 'jotai/babel/plugin-react-refresh'] },
      }),
      compress({ ext: '.br', algorithm: 'brotliCompress' }),
      svgr(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5123',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      port: 5173,
    },
    build: {
      sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules'],
        },
      },
    },
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
        { find: '@mdm', replacement: resolve(__dirname, './src/mdm') },
        { find: '@ofm', replacement: resolve(__dirname, './src/ofm') },
        { find: '@shared', replacement: resolve(__dirname, './src/shared') },
        { find: '@inbound', replacement: resolve(__dirname, './src/inbound') },
        { find: '@taskManagement', replacement: resolve(__dirname, './src/taskManagement') },
        { find: '@outbound', replacement: resolve(__dirname, './src/outbound') },
      ],
    },
  });
};
