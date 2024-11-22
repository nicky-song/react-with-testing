/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

// Configure Vitest (https://vitest.dev/config/)

import { configDefaults, defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [svgr()],
  test: {
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'tests', 'tests-examples', '.pnp.cjs'],
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
