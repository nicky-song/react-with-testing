/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useQuery } from '@tanstack/react-query';
import { storeService } from '@ofm/services/storeService';

export const useGetStoreById = (storeId: string, isEnabled = true) => {
  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => storeService.getStoreById(storeId),
    enabled: isEnabled,
  });

  return { storeData, isLoading, isError };
};
