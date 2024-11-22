/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { billOrderProcessesService } from '@ofm/services/billOrderProcessesService';
import { useQuery } from '@tanstack/react-query';

export const useGetBillOrderProcesses = (waveId: string, isEnabled = true) => {
  const {
    data: billsData,
    isLoading,
    isInitialLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['bill-order-processes', waveId],
    queryFn: () => billOrderProcessesService.getBillOrderProcesses(waveId),
    refetchInterval: 3000,
    enabled: isEnabled,
  });

  return { billsData, isLoading, isInitialLoading, isError, refetch };
};
