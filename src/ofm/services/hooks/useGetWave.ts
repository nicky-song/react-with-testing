/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { waveService } from '@ofm/services/waveService';
import { useQuery } from '@tanstack/react-query';
import { GetWaveParams } from '@ofm/types/types';

export const useGetWaveById = (options: GetWaveParams, isEnabled = true) => {
  const {
    data: waveData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wave', options],
    queryFn: () => waveService.getWaveById(options),
    enabled: isEnabled,
  });

  return { waveData, isLoading, isError };
};
