/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import { useAtom } from 'jotai';

import { Text, View, Checkbox, Icon, Star, Chat, Actionable } from '@az/starc-ui';
import type { SingleValue } from '@az/starc-ui';
import { ChevronDown, ChevronUp } from '@az/starc-ui-icons';

import { Accordion } from '@shared/components/Accordion/Accordion';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { Table } from '@shared/components/Table/Table';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';

import { mapStoreOrderReleaseTableRows } from '@outbound/utils/table/tableUtils';
import {
  selectedStoresAtom,
  laneConfirmationItemAtom,
  inLaneConfirmationAtom,
  selectedStoresLaneAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';

import { allLaneOptions } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';
import { WaveAccordianProps } from './WaveAccordion.types';

import Styles from './WaveAccordion.module.scss';
import { TableSorting } from '@shared/components/Table/Table.types';

export const WaveAccordion = ({ item, order }: WaveAccordianProps) => {
  const { id, stores = [], due, status, pcs, comment = null } = item;
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStores, setSelectedStores] = useAtom(selectedStoresAtom);
  const [, setLaneConfirmation] = useAtom(laneConfirmationItemAtom);
  const [selectedStoresLane, setSelectedStoresLane] = useAtom(selectedStoresLaneAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);
  const rowIDs = stores.map((item) => item.storeNumber);

  const orderRows = useMemo(() => {
    inLaneConfirmation && setOpen(true);
    const getAvailableOptions = () => {
      const selectedOption = selectedStoresLane.map((option) => option.lane);
      if (selectedOption) {
        // Remove the selected option from the available options
        return allLaneOptions.filter((option) => !selectedOption.includes(option.value));
      }
      return allLaneOptions;
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

    return mapStoreOrderReleaseTableRows(
      inLaneConfirmation
        ? stores.filter(({ storeNumber }) => selectedStores.includes(storeNumber))
        : stores,
      selectedStores,
      inLaneConfirmation,
      onLaneSelect,
      getAvailableOptions
    );
  }, [inLaneConfirmation, stores, selectedStores, selectedStoresLane, setSelectedStoresLane]);

  const handleCheckAll = () => {
    setSelectAllChecked(!selectAllChecked);
    selectAllChecked ? setSelectedStores([]) : setSelectedStores(rowIDs);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    checked
      ? setSelectedStores([...selectedStores, value])
      : setSelectedStores(selectedStores.filter((item) => item !== value));
  };

  useEffect(() => {
    const checkWave = stores.filter(({ storeNumber }) => selectedStores.includes(storeNumber));
    checkWave?.length && setLaneConfirmation(item);
  }, [item, selectedStores, setLaneConfirmation, stores]);

  const onSort = (_columnId: TableSorting[]) => {
    // TODO BFF INTEGRATION FOR SORTING
  };

  return (
    <View gap={2} className={Styles['wave-accordion']}>
      <Accordion
        open={open}
        header={{
          label: (
            <View direction="row" align="center">
              {!inLaneConfirmation && (
                <Checkbox
                  name="select-all"
                  value="all"
                  onChange={handleCheckAll}
                  checked={selectAllChecked}
                  className={Styles['wave-accordion__checkbox']}
                  label=""
                />
              )}
              <View direction="row" align="center" className={Styles['wave-accordion__left']}>
                <Icon svg={Star} color="400" size={8} />
                <View>
                  <Text size="100" lineHeight="140">{`${order.label} ${id}`}</Text>
                  <View direction="row" gap={4}>
                    {stores && (
                      <Text
                        size="087"
                        weight="regular"
                        lineHeight="140"
                      >{`${stores?.length} stores`}</Text>
                    )}
                    <Text size="087" weight="regular" lineHeight="140">
                      {t('OutboundMatrix.OrderRelease.Due', { date: due })}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ),
          auxiliaryLabel: (
            <View direction="row" align="center" className={Styles['wave-accordion__right']}>
              <View direction="row" gap={2} align="center">
                {comment && <Icon svg={Chat} color="600" />}
                <Text size="087" weight="medium">
                  {comment}
                </Text>
              </View>
              <StatusBadge variant={status.variant} text={status.label} />
              <Text size="087" weight="medium">
                {t('OutboundMatrix.OrderRelease.Pieces', { count: pcs })}
              </Text>
              <Actionable onClick={() => setOpen(!open)}>
                <Icon size={6} svg={open ? ChevronUp : ChevronDown} />
              </Actionable>
            </View>
          ),
        }}
      >
        <Checkbox.Group name="storeOrders" value={selectedStores} onChange={(e) => handleCheck(e)}>
          <Table
            columns={order.columns}
            rows={orderRows}
            isPaginated={false}
            pageSize={0}
            defaultPage={0}
            isCreditItem={false}
            isCheckboxTable={false}
            styleVariant={TableStylingVariants.SIMPLE}
            totalPages={0}
            onSort={onSort}
          />
        </Checkbox.Group>
      </Accordion>
    </View>
  );
};
