/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import { View } from '@az/starc-ui';

import {
  inLaneConfirmationAtom,
  selectedStoresAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import { OrderReleaseAccordion } from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion';

import {
  releaseOrders,
  wcLaneOptions,
  willCallScheduleOrders,
  willCallUnscheduleOrders,
} from './data';

import { WillCallUnscheduleOrders } from './WillCallUnscheduleOrders';

import styles from './OrderTabs.module.scss';
import { OrderSection } from '@outbound/components/OrderSection/OrderSection';

export const WillCallOrders = () => {
  /*Atoms*/
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);
  const [selectedStores] = useAtom(selectedStoresAtom);

  /* Constants */
  const { t } = useTranslation();

  /* Functions */
  const scheduledStores = willCallScheduleOrders.flatMap((order) =>
    order.stores.map((store) => store.storeNumber)
  );

  const isSelectedScheduledStores = () => {
    return inLaneConfirmation
      ? scheduledStores.some((store) => selectedStores.includes(store))
      : true;
  };

  return (
    <>
      <View direction="column">
        <View direction="column" className={styles['order-release__content']}>
          {isSelectedScheduledStores() && (
            <OrderSection title={t('OutboundMatrix.OrderRelease.Scheduled')}>
              {willCallScheduleOrders.map((order) => (
                <OrderReleaseAccordion
                  item={order}
                  order={releaseOrders.willCallOrders}
                  laneOptions={wcLaneOptions}
                />
              ))}
            </OrderSection>
          )}
          <WillCallUnscheduleOrders stores={willCallUnscheduleOrders} />
        </View>
      </View>
    </>
  );
};
