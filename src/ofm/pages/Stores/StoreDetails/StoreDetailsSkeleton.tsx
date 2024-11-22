/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View } from '@az/starc-ui';
import { Footer } from '@shared/components/Footer/Footer';
import { ButtonSkeleton } from '@shared/components/Skeletons/ButtonSkeleton';
import { CommentsSkeleton } from '@shared/components/Skeletons/CommentsSkeleton';
import { DetailsSectionSkeleton } from '@shared/components/Skeletons/DetailsSectionSkeleton';
import { DetailsTableSkeleton } from '@shared/components/Skeletons/DetailsTableSkeleton';
import { MasterTitleSkeleton } from '@shared/components/Skeletons/MasterTitleSkeleton';
import { ScheduleSectionSkeleton } from '@shared/components/Skeletons/ScheduleSectionSkeleton';
import s from './StoreDetails.module.scss';
import { useTranslation } from 'react-i18next';

export const StoreDetailsSkeleton = () => {
  /* Constants */
  const { t } = useTranslation();

  return (
    <View height="100%">
      <View
        padding={6}
        backgroundColor="secondary"
        className={s['store-details__loading-container']}
      >
        <MasterTitleSkeleton hideSomeOptions />
      </View>
      <View direction="row" height="100%">
        <View.Item columns={{ l: 4, xl: 3 }} className={s['store-details__information']}>
          <View className={s['store-details__details']}>
            <DetailsSectionSkeleton items={6} />
          </View>
          <View className={s['store-details__loading-container']}>
            <ScheduleSectionSkeleton />
          </View>
          <View className={s['store-details__loading-container']}>
            <ScheduleSectionSkeleton />
          </View>
          <CommentsSkeleton hasBorder />
        </View.Item>
        <View.Item grow className={s['store-details__invoice-history']}>
          <View padding={[2, 6, 2, 6]}>
            <View padding={[4, 0]}>
              <DetailsTableSkeleton
                searchPlaceholder={t('Search.InvoiceNumber')}
                hasSearchComponents
                hasSearchSection
                hasWillCallBtn
                hasNoPadding
                hasTitle
              />
            </View>
          </View>
        </View.Item>
      </View>
      <Footer>
        <ButtonSkeleton />
      </Footer>
    </View>
  );
};
