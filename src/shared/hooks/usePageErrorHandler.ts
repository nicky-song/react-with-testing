/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { SetChildErrorType } from '@ofm/types/types';
import { useTranslation } from 'react-i18next';

export const usePageErrorHandler = <T extends string>(
  errorFlags: { name: T; value: boolean }[],
  setChildError?: SetChildErrorType
) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEnabled = errorFlags.some((flag) => flag.value);

  useEffect(() => {
    if (!isEnabled) return;

    for (const { name, value } of errorFlags) {
      if (value) setErrorMessage(t(`Services.${name}`));

      if (errorMessage && setChildError) {
        setChildError(errorMessage);
        return;
      }
    }
  }, [isEnabled, errorMessage, errorFlags, setChildError, t]);

  return { errorMessage };
};
