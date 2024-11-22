/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { waveService } from '@ofm/services/waveService';
import { useQuery } from '@tanstack/react-query';
import { GetWavesParams } from '@ofm/types/types';

export const useGetWaves = (options: GetWavesParams, isEnabled = true) => {
  const {
    data: wavesData,
    isLoading,
    isInitialLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['waves', options],
    queryFn: () => waveService.getWaves(options),
    enabled: isEnabled,
  });

  return { wavesData, isLoading, isInitialLoading, isError, error };
};
