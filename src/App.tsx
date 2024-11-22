/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { NotificationProvider, Starc, useTheme } from '@az/starc-ui';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './Root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Auth } from '@shared/pages/Auth/Auth';
import { USE_REACT_DEV_TOOLS } from '@shared/constants/environmentConstants';
import { ROUTES } from '@shared/constants/routes';
import { NotFoundPage } from '@shared/pages/404/NotFoundPage';
import '@shared/styles/global.scss';
import './App.module.css';
import { ofmRoutes } from '@ofm/constants/routes';
import { mdmRoutes } from '@mdm/constants/routes';
import { inboundRoutes } from '@inbound/constants/routes';
import { outboundRoutes } from './outbound/constants/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      retry: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${ROUTES.OUTBOUND}/${ROUTES.ORDER_REQUEST_BILLING}`} />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: ROUTES.AUTH,
        element: <Auth />,
      },
      {
        path: ROUTES.INBOUND,
        children: [inboundRoutes],
      },
      {
        path: ROUTES.OUTBOUND,
        children: [ofmRoutes],
      },
      {
        path: ROUTES.MDM,
        children: [mdmRoutes],
      },
      outboundRoutes,
    ],
  },
]);

export const App = () => {
  const theme = useTheme();
  theme.colorMode = 'light';
  document.body.setAttribute('data-st-theme', `starc-${theme.colorMode}`);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider
        options={{
          zIndex: 20001,
        }}
      >
        <Starc colorMode={theme.colorMode}>
          <RouterProvider router={router} />
        </Starc>
        {USE_REACT_DEV_TOOLS && <ReactQueryDevtools initialIsOpen={false} />}
      </NotificationProvider>
    </QueryClientProvider>
  );
};
