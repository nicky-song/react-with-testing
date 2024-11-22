/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ChevronDown, Icon, Skeleton, View } from '@az/starc-ui';

type Props = {
  hasBorder?: boolean;
};

export const CommentsSkeleton = ({ hasBorder = false }: Props) => {
  return (
    <View
      direction="row"
      justify="space-between"
      padding={6}
      attributes={{
        style: { borderBottom: hasBorder ? '1px solid var(--st-color-gray-300)' : 'none' },
      }}
    >
      <Skeleton borderRadius="small" width="var(--st-unit-30)" height="var(--st-unit-6)" />
      <Icon
        svg={ChevronDown}
        attributes={{ style: { marginLeft: 'var(--st-unit-4)' } }}
        color="500"
      />
    </View>
  );
};
