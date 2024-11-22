/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Skeleton } from '@az/starc-ui';

export const POSuggestionSkeleton = () => {
  return (
    <View padding={[2, 4]} direction="column">
      <View direction="row" align="center">
        <View.Item grow>
          <Skeleton />
        </View.Item>
      </View>
    </View>
  );
};
