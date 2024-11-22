/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Skeleton as StarcSkeleton } from '@az/starc-ui';
import s from '@ofm/pages/Outbound/OrderRequestsBilling/OpeningAndBackup/OpeningAndBackup.module.scss';

type Props = {
  hasProgress?: boolean;
  hasTitle?: boolean;
  hasErrorSection?: boolean;
  items?: number;
};

const TitleSectionSkeleton = () => {
  return (
    <View padding={[0, 0, 6, 0]}>
      <StarcSkeleton
        borderRadius="small"
        width="calc(var(--st-unit-19) * 2)"
        height="var(--st-unit-6)"
      />
    </View>
  );
};

const ErrorTableSkeleton = () => {
  return <StarcSkeleton width="100%" height="var(--st-unit-14)" />;
};

export const CardGridSkeleton = ({
  hasProgress = false,
  hasTitle = false,
  hasErrorSection = false,
  items = 6,
}: Props) => {
  return (
    <>
      {hasProgress && (
        <View padding={[0, 0, 8, 0]}>
          <StarcSkeleton width="100%" height="var(--st-unit-20)" />
        </View>
      )}
      {hasTitle && <TitleSectionSkeleton />}
      <View padding={[0, 0, hasErrorSection ? 10 : 0, 0]}>
        <View as="ul" gap={4} className={s['orders-list']}>
          {Array(items)
            .fill(null)
            .map((_, index) => (
              <View.Item as="li" className={s['orders-list__item']} key={index}>
                <StarcSkeleton height="var(--st-unit-18)" />
              </View.Item>
            ))}
        </View>
        {hasErrorSection && (
          <>
            {hasTitle && <TitleSectionSkeleton />}
            <View gap={2}>
              <ErrorTableSkeleton />
              <ErrorTableSkeleton />
            </View>
          </>
        )}
      </View>
    </>
  );
};
