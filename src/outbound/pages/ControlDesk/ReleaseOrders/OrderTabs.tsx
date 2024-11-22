/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAtom } from 'jotai';
import { t } from 'i18next';

import { View, Text } from '@az/starc-ui';

import { CombinedTabs } from '@shared/components/CombinedTabs/CombinedTabs';
import { PAGE_URLS } from '@shared/constants/routes';
import {
  inLaneConfirmationAtom,
  laneConfirmationItemAtom,
  selectedStoresAtom,
  selectedStoresLaneAtom,
  selectedSubzonesAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import { OrderReleaseTabTitles } from '@outbound/constants/constants';

import styles from './OrderTabs/OrderTabs.module.scss';

export const OrderTabs = () => {
  /*Atoms*/
  const [selectedStores, setSelectedStores] = useAtom(selectedStoresAtom);
  const [selectedSubzones, setSelectedSubzones] = useAtom(selectedSubzonesAtom);
  const [inLaneConfirmation, setInLaneConfirmation] = useAtom(inLaneConfirmationAtom);
  const [, setLaneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [, setSelectedStoresLane] = useAtom(selectedStoresLaneAtom);

  /* Constants */
  const location = useLocation();

  const tabs = [
    {
      name: t(OrderReleaseTabTitles.REPLENISHMENT),
      numberOfItems: 156,
      value: 'replenishment',
    },
    {
      name: t(OrderReleaseTabTitles.WILL_CALL),
      numberOfItems: 3,
      value: 'will-call',
    },
    {
      name: t(OrderReleaseTabTitles.NEW_STORE),
      numberOfItems: 1,
      value: 'new-store-and-backup',
    },
    {
      name: t(OrderReleaseTabTitles.LTD),
      numberOfItems: 24,
      value: 'long-tail-distribution',
    },
    {
      name: t(OrderReleaseTabTitles.TRANSFER),
      numberOfItems: 0,
      value: 'transfer',
    },
    {
      name: t(OrderReleaseTabTitles.CROSS_DOCK),
      numberOfItems: 0,
      value: 'cross-dock',
    },
  ];

  const getSelectionStatusLabel = () => {
    if (!selectedStores.length && !selectedSubzones.length) {
      return t('OutboundMatrix.OrderRelease.StoreSelected', {
        count: selectedStores.length,
      });
    } else {
      if (selectedStores.length) {
        return t('OutboundMatrix.OrderRelease.StoreSelected', {
          count: selectedStores.length,
        });
      } else {
        return t('OutboundMatrix.OrderRelease.SubzoneSelected', {
          count: selectedSubzones.length,
        });
      }
    }
  };

  // useEffect added to clear order release states
  useEffect(() => {
    setInLaneConfirmation(false);
    setSelectedStores([]);
    setSelectedSubzones([]);
    setLaneConfirmationItem(null);
    setSelectedStoresLane([]);
  }, [
    location.pathname,
    setInLaneConfirmation,
    setLaneConfirmationItem,
    setSelectedStores,
    setSelectedStoresLane,
    setSelectedSubzones,
  ]);

  return (
    <View>
      {!inLaneConfirmation && <CombinedTabs tabs={tabs} rootPath={PAGE_URLS.ORDER_RELEASE} />}
      <View direction="column" padding={6} className={styles['order-release']}>
        {!inLaneConfirmation && <Text>{getSelectionStatusLabel()}</Text>}
        <Outlet />
      </View>
    </View>
  );
};
