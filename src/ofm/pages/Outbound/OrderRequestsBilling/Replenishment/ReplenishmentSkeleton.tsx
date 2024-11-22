/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Skeleton as StarcSkeleton } from '@az/starc-ui';

type Props = {
  items?: number;
};

const WaveSectionSkeleton = ({ items = 2 }: Props) => {
  return (
    <View gap={5}>
      <StarcSkeleton borderRadius="small" width="30%" height="var(--st-unit-7)" />
      <View gap={2}>
        {Array(items)
          .fill(null)
          .map((_, index) => (
            <StarcSkeleton height="var(--st-unit-14)" key={index} />
          ))}
      </View>
    </View>
  );
};

export const ReplenishmentSkeleton = () => {
  return (
    <View gap={10}>
      <WaveSectionSkeleton />
      <WaveSectionSkeleton items={3} />
      <WaveSectionSkeleton />
    </View>
  );
};
