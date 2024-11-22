/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Skeleton, View } from '@az/starc-ui';

export const ScheduleSectionSkeleton = () => {
  return (
    <View padding={6}>
      <View padding={[0, 0, 4, 0]}>
        <Skeleton borderRadius="small" width="55%" height="var(--st-unit-6)" />
      </View>
      <View gap={2}>
        <Skeleton borderRadius="small" />
        <Skeleton borderRadius="small" height="var(--st-unit-12)" />
      </View>
    </View>
  );
};
