/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ChangeEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';

import { Checkbox, View, Text, type SingleValue } from '@az/starc-ui';

import { Table } from '@shared/components/Table/Table';
import {
  ORDER_RELEASE_WILL_CALL_UNSCHEDULED_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { TableSorting } from '@shared/components/Table/Table.types';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';

import { mapStoreOrderReleaseTableRows } from '@outbound/utils/table/tableUtils';
import {
  selectedStoresAtom,
  inLaneConfirmationAtom,
  selectedStoresLaneAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';

import {
  wcLaneOptions,
  waveStatus,
} from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';
import { Store } from '@outbound/components/WaveAccordion/WaveAccordion.types';

import styles from './OrderTabs.module.scss';

export type WillCallUnscheduleOrdersProps = {
  stores: Store[];
};

export const WillCallUnscheduleOrders = ({ stores = [] }: WillCallUnscheduleOrdersProps) => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const [rows, setData] = useState(stores);
  const [selectedStores, setSelectedStores] = useAtom(selectedStoresAtom);
  const [selectedStoresLane, setSelectedStoresLane] = useAtom(selectedStoresLaneAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  const onReplenishment = (id: string) => {
    setData(
      rows.map((item) =>
        item.storeNumber === id ? { ...item, status: waveStatus.readyForRelease } : item
      )
    );

    handleNotification(
      NOTIFICATION_TYPES.SUCCESS,
      t('OutboundMatrix.OrderRelease.ReplenishmentRun', {
        item: t('OutboundMatrix.OrderRelease.Store'),
        id: id,
      })
    );
  };

  const getAvailableOptions = () => {
    const selectedOption = selectedStoresLane.map((option) => option.lane);
    if (selectedOption) {
      // Remove the selected option from the available options
      return wcLaneOptions.filter((option) => !selectedOption.includes(option.value));
    }
    return wcLaneOptions;
  };

  const onLaneSelect = (storeNumber: string, option: SingleValue) => {
    setSelectedStoresLane((selectedStoresLane) => {
      const index = selectedStoresLane.findIndex((item) => item.store === storeNumber);
      if (index !== -1) {
        selectedStoresLane[index] = { store: storeNumber, lane: option?.value };
        return [...selectedStoresLane];
      } else {
        return [...selectedStoresLane, { store: storeNumber, lane: option?.value }];
      }
    });
  };

  const orderRows = mapStoreOrderReleaseTableRows(
    inLaneConfirmation
      ? rows.filter(({ storeNumber }) => selectedStores.includes(storeNumber))
      : rows,
    selectedStores,
    inLaneConfirmation,
    onLaneSelect,
    getAvailableOptions,
    onReplenishment
  );

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    checked
      ? setSelectedStores([...selectedStores, value])
      : setSelectedStores(selectedStores.filter((item) => item !== value));
  };

  const onSort = (_columnId: TableSorting[]) => {
    // TODO BFF INTEGRATION FOR SORTING
  };

  return orderRows.length ? (
    <View direction="column" className={styles['order-release__section']}>
      <Text size="125" weight="bold">
        {t('OutboundMatrix.OrderRelease.UnScheduled')}
      </Text>
      <Checkbox.Group name="storeOrders" value={selectedStores} onChange={(e) => handleCheck(e)}>
        <Table
          columns={ORDER_RELEASE_WILL_CALL_UNSCHEDULED_TABLE_COLUMNS}
          rows={orderRows}
          isPaginated={false}
          pageSize={0}
          defaultPage={0}
          isCreditItem={false}
          isCheckboxTable={false}
          styleVariant={TableStylingVariants.DETAILS}
          totalPages={0}
          onSort={onSort}
        />
      </Checkbox.Group>
    </View>
  ) : null;
};
