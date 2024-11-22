/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { t } from 'i18next';
import { useAtom } from 'jotai';

import { Text, View, Checkbox, Icon, Actionable, Button, Select, SingleValue } from '@az/starc-ui';

import { Accordion } from '@shared/components/Accordion/Accordion';
import { Table } from '@shared/components/Table/Table';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';

import { mapNewStoreOrderReleaseTableRows } from '@outbound/utils/table/tableUtils';
import {
  selectedSubzonesAtom,
  laneConfirmationItemAtom,
  inLaneConfirmationAtom,
  selectedStoresLaneAtom,
  selectedStoresAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import {
  allLaneOptions,
  waveStatus,
} from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';

import { Props } from './NewStore.types';
import Styles from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion.module.scss';
import { ChevronDown, ChevronUp } from '@az/starc-ui-icons';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { generateDateString } from '@ofm/utils/utils';

export const NewStoreAccordion = ({ item, order }: Props) => {
  /*Atoms*/
  const [, setSelectedStores] = useAtom(selectedStoresAtom);
  const [selectedSubzones, setSelectedSubzones] = useAtom(selectedSubzonesAtom);
  const [selectedItem, setLaneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [selectedStoresLane, setSelectedStoresLane] = useAtom(selectedStoresLaneAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);

  /* variables */
  const { label, columns, collapsible = true, isSelectAll = true } = order;
  const { id, subzones = [], pallets, pcs, closeBy, status } = item;
  const rowIDs = subzones.map((item) => item.subzone);

  /* State variables */
  const [itemStatus, setItemStatus] = useState(status);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [open, setOpen] = useState(collapsible ? false : true);
  const [rows, setData] = useState(subzones);

  /* Constants */
  const { handleNotification } = useNotificationHandler();

  /* Functions */
  const onReplenishment = (id: string) => {
    setData(
      rows.map((item) =>
        item.subzone === id ? { ...item, status: waveStatus.readyForRelease } : item
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

  const orderRows = mapNewStoreOrderReleaseTableRows(
    inLaneConfirmation ? rows.filter(({ subzone }) => selectedSubzones.includes(subzone)) : rows,
    selectedSubzones,
    inLaneConfirmation,
    itemStatus,
    onReplenishment
  );

  const onReplenishmentAll = (id: string) => {
    setItemStatus(waveStatus.readyForRelease);

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

  const handleCheckAll = () => {
    setSelectAllChecked(!selectAllChecked);
    selectAllChecked ? setSelectedSubzones([]) : setSelectedSubzones(rowIDs);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (selectedItem?.id === id) {
      checked
        ? setSelectedSubzones([...selectedSubzones, value])
        : setSelectedSubzones(selectedSubzones.filter((item) => item !== value));
    } else {
      checked && setSelectedSubzones([value]);
    }
  };

  // useEffect added to set lane confirmation item (Wave or store)
  useEffect(() => {
    const checkItem = subzones.filter(({ subzone }) => selectedSubzones.includes(subzone));
    checkItem?.length && setLaneConfirmationItem(item);
    item?.subzones?.length === selectedSubzones?.length
      ? setSelectedStores([item.id])
      : setSelectedStores([]);
  }, [item, selectedSubzones, setLaneConfirmationItem, setSelectedStores, subzones]);

  // useEffect to set select all false if selected subzones are not from current scope
  useEffect(() => {
    selectedItem?.id !== id && setSelectAllChecked(false);
  }, [id, selectedItem]);

  // useEffect added to open accordion if its in laneconfitmation page
  useEffect(() => {
    inLaneConfirmation && setOpen(true);
  }, [inLaneConfirmation]);

  if (!orderRows.length) return null;

  return (
    <View gap={2} className={classNames(Styles['order-release-accordion'])}>
      <Accordion
        open={open}
        header={{
          label: (
            <View direction="row" align="center">
              {!inLaneConfirmation && isSelectAll && (
                <Checkbox
                  name="select-all"
                  value="all"
                  onChange={handleCheckAll}
                  checked={selectAllChecked}
                  className={Styles['order-release-accordion__checkbox']}
                />
              )}
              <View
                direction="row"
                align="center"
                className={Styles['order-release-accordion__left']}
              >
                <View
                  direction="row"
                  align="center"
                  padding={[4, 0]}
                  width="calc(var(--st-unit-16) * 2)"
                  className={Styles['order-release-accordion__left--label']}
                >
                  <Text size="100" weight="bold">{`${t(label)} ${id}`}</Text>
                </View>
                <View padding={[4, 2]} width="var(--st-unit-30)">
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.Subzone', { count: orderRows?.length })}
                  </Text>
                </View>
                <View padding={[4, 2]} width="var(--st-unit-30)">
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.Pallet', { count: pallets })}
                  </Text>
                </View>
                <View padding={[4, 2]} width="var(--st-unit-30)">
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.Pieces', { count: pcs })}
                  </Text>
                </View>
                <View padding={[4, 2]} width="calc(var(--st-unit-30) * 2)">
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.CloseBy', {
                      date: closeBy && generateDateString(closeBy, t('DateFormat.ShortTime')),
                    })}
                  </Text>
                </View>
              </View>
            </View>
          ),
          auxiliaryLabel: (
            <View
              direction="row"
              align="center"
              className={Styles['order-release-accordion__right']}
            >
              <View height="100%">
                {inLaneConfirmation ? (
                  <Actionable onClick={(e) => e.stopPropagation()}>
                    <View className={Styles['order-release-accordion__right-select']}>
                      <Select
                        label="Lane"
                        variant="no-label"
                        name={id}
                        size="small"
                        onValueChange={(value) => onLaneSelect(id, value)}
                        defaultValue={getAvailableOptions()[0]}
                        options={getAvailableOptions()}
                      />
                    </View>
                  </Actionable>
                ) : itemStatus === waveStatus.replenishmentNotRun ? (
                  <Button variant="secondary" onClick={() => onReplenishmentAll(id)}>
                    <Text size="100">{t('OutboundMatrix.OrderRelease.RunReplenishment')}</Text>
                  </Button>
                ) : (
                  <StatusBadge variant={itemStatus.variant} text={itemStatus.label} />
                )}
              </View>
              {!inLaneConfirmation && (
                <Actionable onClick={() => setOpen(!open)}>
                  <Icon size={6} svg={open ? ChevronUp : ChevronDown} />
                </Actionable>
              )}
            </View>
          ),
        }}
      >
        <Checkbox.Group
          name="storeOrders"
          value={selectedSubzones}
          onChange={(e) => handleCheck(e)}
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
        </Checkbox.Group>
      </Accordion>
    </View>
  );
};
