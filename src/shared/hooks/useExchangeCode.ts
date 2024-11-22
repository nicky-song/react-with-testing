/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { authService } from '@ofm/services/authService';
import { useMutation } from '@tanstack/react-query';

type ExchangeCodeParams = {
  code: string;
  codeVerifier: string;
};

export const useExchangeCode = () => {
  const {
    mutate: mutateExchangeCode,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (params: ExchangeCodeParams) =>
      authService.exchangeCode(params.code, params.codeVerifier),
  });

  return { mutateExchangeCode, isLoading, isError };
};
