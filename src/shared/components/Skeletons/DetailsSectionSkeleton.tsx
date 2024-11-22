/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Skeleton, View } from '@az/starc-ui';

const SectionSkeleton = () => {
  return (
    <View direction="row" justify="space-between" padding={[0, 0, 3, 0]}>
      <View.Item grow attributes={{ style: { marginRight: 'var(--st-unit-6)' } }}>
        <Skeleton borderRadius="small" height="var(--st-unit-6)" />
      </View.Item>
      <View.Item grow>
        <Skeleton borderRadius="small" height="var(--st-unit-6)" />
      </View.Item>
    </View>
  );
};

export const DetailsSectionSkeleton = ({
  items,
  shouldHideHeader,
}: {
  items: number;
  shouldHideHeader?: boolean;
}) => {
  return (
    <View padding={(!shouldHideHeader && 6) || undefined}>
      {!shouldHideHeader && (
        <Skeleton
          borderRadius="small"
          width={{ xl: '40%', l: '40%', m: '50%', s: '60%' }}
          height="24px"
        />
      )}
      <View padding={shouldHideHeader ? [0, 0, 4, 0] : [4, 0, 0, 0]}>
        {Array(items)
          .fill(null)
          .map((_, index) => (
            <SectionSkeleton key={index} />
          ))}
      </View>
    </View>
  );
};
