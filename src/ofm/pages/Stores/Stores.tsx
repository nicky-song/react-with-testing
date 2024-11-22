/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect } from 'react';
import { View } from '@az/starc-ui';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { PAGE_URLS } from '@shared/constants/routes';

export const Stores = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!storeId) navigate(PAGE_URLS.ORDER_REQUEST_BILLING);
  }, [storeId, navigate]);

  return (
    <View
      direction="column"
      height="100%"
      width="100%"
      attributes={{ style: { overflowY: 'scroll' } }}
    >
      <Outlet />
    </View>
  );
};
