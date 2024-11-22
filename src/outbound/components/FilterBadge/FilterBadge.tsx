/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Button, View } from '@az/starc-ui';

type FilterBadgeType = {
  isActive: boolean;
  label: string;
  onClickHandler: () => void;
};

export const FilterBadge = (props: FilterBadgeType) => {
  const { isActive, label, onClickHandler } = props;

  return (
    <View>
      <Button variant={isActive ? 'pill' : 'pill-secondary'} onClick={onClickHandler}>
        {label}
      </Button>
    </View>
  );
};
