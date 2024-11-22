/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Skeleton, Text, View } from '@az/starc-ui';

type Props = {
  tabs: string[];
};

export const CombinedTabsSkeleton = ({ tabs }: Props) => {
  return (
    <View
      direction="row"
      backgroundColor="secondary"
      height="auto"
      attributes={{
        style: {
          borderTop: '1px solid var(--st-color-gray-300)',
          borderBottom: '1px solid var(--st-color-gray-300)',
        },
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <View direction="row" align="center" padding={[4, 6]} key={index}>
            <View padding={[0, 2, 0, 0]}>
              <Skeleton
                borderRadius="round"
                width="var(--st-unit-6)"
                height="calc(var(--st-unit-6) + 2px)"
              />
            </View>
            <Text weight="bold">{tab}</Text>
          </View>
        );
      })}
    </View>
  );
};
