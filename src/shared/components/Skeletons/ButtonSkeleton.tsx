/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Skeleton } from '@az/starc-ui';

export const ButtonSkeleton = () => {
  return (
    <Skeleton
      borderRadius="small"
      width="calc(var(--st-unit-17) * 2)"
      height="calc(var(--st-unit-10) + 2px)"
    />
  );
};
