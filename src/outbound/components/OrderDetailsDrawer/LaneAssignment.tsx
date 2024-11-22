/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { t } from 'i18next';
import { useAtom } from 'jotai';

import { Text, View, Icon, Actionable } from '@az/starc-ui';
import { ChevronDown, ChevronUp } from '@az/starc-ui-icons';

import type { SingleValue } from '@az/starc-ui';

import { Accordion } from '@shared/components/Accordion/Accordion';
import { Table } from '@shared/components/Table/Table';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';

import { mapStoreOrderReleaseTableRows } from '@outbound/utils/table/tableUtils';
import {
  selectedStoresAtom,
  inLaneConfirmationAtom,
  selectedStoresLaneAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import {
  allLaneOptions,
  waveStatus,
} from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';

import { generateDateString } from '@ofm/utils/utils';

import { Props } from './../OrderReleaseAccordion/OrderReleaseAccordion.types';
import Styles from './LaneAssignment.module.scss';

export const LaneAssignment = ({ item, order, laneOptions = allLaneOptions }: Props) => {
  const { label, columns, collapsible = true } = order;
  const { id, stores = [], pcs, pallets, releaseBy, status } = item;

  /*Atoms*/
  const [selectedStores] = useAtom(selectedStoresAtom);
  const [selectedStoresLane, setSelectedStoresLane] = useAtom(selectedStoresLaneAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  /* State variables */
  const [itemStatus] = useState(status);
  const [open, setOpen] = useState(false);
  const [rows, setData] = useState(stores);

  /* Constants */
  const { handleNotification } = useNotificationHandler();

  /* Functions */
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
      return laneOptions.filter((option) => !selectedOption.includes(option.value));
    }
    return laneOptions;
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
    rows,
    selectedStores,
    inLaneConfirmation,
    onLaneSelect,
    getAvailableOptions,
    onReplenishment,
    itemStatus
  );

  // useEffect added to open accordion if its in laneconfitmation page
  useEffect(() => {
    inLaneConfirmation && setOpen(true);
  }, [inLaneConfirmation]);

  if (!orderRows.length) return null;

  return (
    <View
      className={classNames(
        Styles['lane-assignment-accordion'],
        open && Styles['lane-assignment-accordion-open']
      )}
    >
      <Accordion
        open={open}
        header={{
          label: (
            <View direction="row" align="center">
              <View
                direction="row"
                align="center"
                className={Styles['lane-assignment-accordion__left']}
              >
                <View
                  direction="row"
                  align="center"
                  padding={[4, 22, 4, 0]}
                  className={Styles['lane-assignment-accordion__left--label']}
                >
                  <Text size="100" weight="bold">{`${t(label)} ${id}`}</Text>
                </View>
                <View padding={[4, 10, 4, 2]}>
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.NumberOfStores', { count: 8 })}
                  </Text>
                </View>
                {pallets && (
                  <View padding={[4, 10, 4, 2]}>
                    <Text size="100" weight="regular">
                      {t('OutboundMatrix.OrderRelease.Pallet', { count: pcs })}
                    </Text>
                  </View>
                )}
                <View padding={[4, 10, 4, 2]}>
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.Pieces', { count: pcs })}
                  </Text>
                </View>
                {releaseBy && (
                  <View padding={[4, 10, 4, 2]}>
                    <Text size="100" weight="regular">
                      {t('OutboundMatrix.OrderRelease.ReleaseBy', {
                        date: releaseBy && generateDateString(releaseBy, t('DateFormat.ShortTime')),
                      })}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ),
          auxiliaryLabel: (
            <>
              <View
                direction="row"
                align="center"
                className={Styles['lane-assignment-accordion__right']}
              >
                <View height="100%">
                  <StatusBadge variant={itemStatus.variant} text={itemStatus.label} />
                </View>
                {collapsible && (
                  <Actionable onClick={() => setOpen(!open)}>
                    <Icon size={6} svg={open ? ChevronUp : ChevronDown} />
                  </Actionable>
                )}
              </View>
            </>
          ),
        }}
      >
        <Table
          columns={columns}
          rows={orderRows}
          isPaginated={false}
          pageSize={0}
          defaultPage={0}
          isCreditItem={false}
          isCheckboxTable={false}
          styleVariant={TableStylingVariants.SIMPLE}
          totalPages={0}
          onSort={(_sorting) => {
            return;
          }}
        />
      </Accordion>
    </View>
  );
};
