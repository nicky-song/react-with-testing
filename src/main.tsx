/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import '@az/starc-ui/themes/starc.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { App } from './App.tsx';
import './global.d.ts';
import './index.module.css';
import './i18n';
import { USE_JOTAI_DEV } from '@shared/constants/environmentConstants.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      {USE_JOTAI_DEV && <DevTools />}
      <App />
    </Provider>
  </React.StrictMode>
);
