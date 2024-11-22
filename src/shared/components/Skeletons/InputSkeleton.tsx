/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Skeleton, View } from '@az/starc-ui';

export const InputSkeleton = ({ numberOfItems }: { numberOfItems?: number }) => {
  return (
    <View gap={4}>
      {numberOfItems ? (
        Array(numberOfItems)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} borderRadius="small" width="100%" height="var(--st-unit-6)" />
          ))
      ) : (
        <Skeleton borderRadius="small" width="100%" height="var(--st-unit-6)" />
      )}
    </View>
  );
};
