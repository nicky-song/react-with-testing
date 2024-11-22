/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { replenishmentOrderProcessesService } from '@ofm/services/replenishmentOrderProcessesService';
import { useQuery } from '@tanstack/react-query';

export const useGetReplenishmentOrderProcesses = (waveId: string, isEnabled = true) => {
  const {
    data: replenishmentsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['replenishment-order-processes', waveId],
    queryFn: () => replenishmentOrderProcessesService.getReplenishmentOrderProcesses(waveId),
    refetchInterval: 3000,
    enabled: isEnabled,
  });

  return { replenishmentsData, isLoading, isError, refetch };
};
