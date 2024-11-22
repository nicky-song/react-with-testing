/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useQuery } from '@tanstack/react-query';
import { storeService } from '@ofm/services/storeService';
import { GetStoresParams } from '@ofm/types/types';

export const useGetStores = (options?: GetStoresParams, isEnabled = true) => {
  const {
    data: storesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stores', options],
    queryFn: () => storeService.getStores(options),
    enabled: isEnabled,
  });

  return { storesData, isLoading, isError };
};
