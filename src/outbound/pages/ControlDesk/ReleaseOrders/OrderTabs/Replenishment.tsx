/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';

import { View } from '@az/starc-ui';

import {
  inLaneConfirmationAtom,
  laneConfirmationItemAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import { OrderReleaseAccordion } from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion';

import { releaseOrders, replenishmentOrders_Today, replenishmentOrders_Upcomming } from './data';
import styles from './OrderTabs.module.scss';
import { OrderSection } from '@outbound/components/OrderSection/OrderSection';

export const ReplenishmentOrders = () => {
  /*Atoms*/
  const [laneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  /* Constants */
  const { t } = useTranslation();

  return (
    <View direction="column" className={styles['order-release__content']}>
      {(!inLaneConfirmation || laneConfirmationItem) && (
        <OrderSection
          {...(!inLaneConfirmation && { title: t('OutboundMatrix.OrderRelease.Today') })}
        >
          {replenishmentOrders_Today.map((wave) => (
            <OrderReleaseAccordion item={wave} order={releaseOrders.storeOrders} />
          ))}
        </OrderSection>
      )}
      {(!inLaneConfirmation || laneConfirmationItem) && (
        <OrderSection
          {...(!inLaneConfirmation && { title: t('OutboundMatrix.OrderRelease.Upcoming') })}
        >
          {replenishmentOrders_Upcomming.map((wave) => (
            <OrderReleaseAccordion item={wave} order={releaseOrders.storeOrders} />
          ))}
        </OrderSection>
      )}
    </View>
  );
};
