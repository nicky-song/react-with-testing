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
import { OrderSection } from '@outbound/components/OrderSection/OrderSection';

import { releaseOrders, newStoreOrders, backupStoreOrders } from '../data';
import { NewStoreAccordion } from './NewStoreAccordion';

import styles from '../OrderTabs.module.scss';

export const NewStore = () => {
  /*Atoms*/
  const [laneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  /* Constants */
  const { t } = useTranslation();

  return (
    <View direction="column">
      <View direction="column" className={styles['order-release__content']}>
        {(!inLaneConfirmation || laneConfirmationItem) && (
          <OrderSection
            {...(!inLaneConfirmation && { title: t('OutboundMatrix.OrderRelease.NewStore') })}
          >
            {newStoreOrders.map((store) => (
              <NewStoreAccordion item={store} order={releaseOrders.newStoreOrders} />
            ))}
          </OrderSection>
        )}
        {(!inLaneConfirmation || laneConfirmationItem) && (
          <OrderSection
            {...(!inLaneConfirmation && { title: t('OutboundMatrix.OrderRelease.BackupStore') })}
          >
            {backupStoreOrders.map((store) => (
              <NewStoreAccordion item={store} order={releaseOrders.newStoreOrders} />
            ))}
          </OrderSection>
        )}
      </View>
    </View>
  );
};
