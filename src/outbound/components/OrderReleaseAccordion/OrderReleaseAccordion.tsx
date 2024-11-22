/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { t } from 'i18next';
import { useAtom } from 'jotai';

import { Text, View, Checkbox, Icon, Star, Actionable, Button } from '@az/starc-ui';
import { Chat, ChevronDown, ChevronUp } from '@az/starc-ui-icons';

import type { SingleValue } from '@az/starc-ui';

import { Accordion } from '@shared/components/Accordion/Accordion';
import { Table } from '@shared/components/Table/Table';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';
import { Tag } from '@shared/components/Tag/Tag';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';

import { mapStoreOrderReleaseTableRows } from '@outbound/utils/table/tableUtils';
import {
  selectedStoresAtom,
  laneConfirmationItemAtom,
  inLaneConfirmationAtom,
  selectedStoresLaneAtom,
  ltdGroupedStoresAtom,
} from '@outbound/atoms/releaseOrder/releaseOrderAtom';
import {
  allLaneOptions,
  waveStatus,
} from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';

import { generateDateString } from '@ofm/utils/utils';

import { Props } from './OrderReleaseAccordion.types';
import Styles from './OrderReleaseAccordion.module.scss';

export const OrderReleaseAccordion = ({ item, order, laneOptions = allLaneOptions }: Props) => {
  /*Atoms*/
  const [selectedStores, setSelectedStores] = useAtom(selectedStoresAtom);
  const [selectedItem, setLaneConfirmationItem] = useAtom(laneConfirmationItemAtom);
  const [selectedStoresLane, setSelectedStoresLane] = useAtom(selectedStoresLaneAtom);
  const [inLaneConfirmation] = useAtom(inLaneConfirmationAtom);
  const [groupedStores] = useAtom(ltdGroupedStoresAtom);

  /* variables */
  const { label, columns, collapsible = true, isSelectAll = true } = order;
  const { id, stores = [], pcs, pallets, releaseBy, status, comment } = item;
  const rowIDs = stores.map((item) => item.storeNumber);

  /* Constants */
  const { handleNotification } = useNotificationHandler();

  /* State variables */
  const [itemStatus, setItemStatus] = useState(status);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [open, setOpen] = useState(collapsible ? false : true);
  const [rows, setData] = useState(stores);

  /* Functions */
  const getStoreGroup = (storeNumber: string): string[] => {
    const storeGroup = groupedStores?.find((subGroup) => subGroup.includes(storeNumber));
    return storeGroup ? storeGroup : [];
  };

  const onReplenishment = (id: string) => {
    const replenishedStores = getStoreGroup(id);
    setData(
      rows.map((item) =>
        item.storeNumber === id ? { ...item, status: waveStatus.readyForRelease } : item
      )
    );

    handleNotification(
      NOTIFICATION_TYPES.SUCCESS,
      t('OutboundMatrix.OrderRelease.ReplenishmentRun', {
        item: t('OutboundMatrix.OrderRelease.Store'),
        id: replenishedStores?.length ? replenishedStores : id,
      })
    );
  };

  const onReplenishmentAll = (id: number) => {
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
    inLaneConfirmation
      ? rows.filter(({ storeNumber }) => selectedStores.includes(storeNumber))
      : rows,
    selectedStores,
    inLaneConfirmation,
    onLaneSelect,
    getAvailableOptions,
    onReplenishment,
    itemStatus,
    groupedStores
  );

  const handleCheckAll = () => {
    setSelectAllChecked(!selectAllChecked);
    selectAllChecked ? setSelectedStores([]) : setSelectedStores(rowIDs);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const storeGroup = getStoreGroup(value);

    if (!selectedItem || selectedItem?.id === id) {
      if (checked) {
        setSelectedStores([...selectedStores, ...(storeGroup.length ? storeGroup : [value])]);
      } else {
        setSelectedStores(
          selectedStores.filter((id) =>
            storeGroup.length ? !storeGroup.includes(id) : id !== value
          )
        );
      }
    } else {
      checked && setSelectedStores([...(storeGroup.length ? storeGroup : [value])]);
    }
  };

  // useEffect added to set lane confirmation item (Wave or store)
  useEffect(() => {
    const checkItem = stores.filter(({ storeNumber }) => selectedStores.includes(storeNumber));
    checkItem?.length && setLaneConfirmationItem(item);
    !selectedStores?.length && setLaneConfirmationItem(null);
  }, [item, selectedStores, setLaneConfirmationItem, stores]);

  // useEffect to set select all false if selected stores are not from current scope
  useEffect(() => {
    selectedItem?.id !== id && setSelectAllChecked(false);
  }, [id, selectedItem]);

  // useEffect added to open accordion if its in laneconfitmation page
  useEffect(() => {
    inLaneConfirmation && setOpen(true);
  }, [inLaneConfirmation]);

  if (!orderRows.length) return null;

  return (
    <View
      className={classNames(
        Styles['order-release-accordion'],
        open && Styles['order-release-accordion-open']
      )}
    >
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
                  padding={[4, 22, 4, 0]}
                  className={Styles['order-release-accordion__left--label']}
                >
                  <Icon svg={Star} color="400" size={8} />
                  <Text size="100" weight="bold">{`${t(label)} ${id}`}</Text>
                </View>
                <View padding={[4, 10, 4, 2]}>
                  <Text size="100" weight="regular">
                    {t('OutboundMatrix.OrderRelease.NumberOfStores', { count: rows?.length })}
                  </Text>
                </View>
                {pallets && (
                  <View padding={[4, 10, 4, 2]}>
                    <Text size="100" weight="regular">
                      {t('OutboundMatrix.OrderRelease.Pallet', { count: pallets })}
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
          auxiliaryLabel: collapsible ? (
            <View
              direction="row"
              align="center"
              className={Styles['order-release-accordion__right']}
            >
              {stores.some((store) => store?.willCall) && <Tag text="WC" variant="order" />}
              {comment && <Icon svg={Chat} color="600" />}
              <View height="100%">
                {itemStatus === waveStatus.replenishmentNotRun && !inLaneConfirmation ? (
                  <Button variant="secondary" onClick={() => onReplenishmentAll(id)}>
                    <Text size="100">{t('OutboundMatrix.OrderRelease.RunReplenishment')}</Text>
                  </Button>
                ) : (
                  <StatusBadge variant={itemStatus.variant} text={itemStatus.label} />
                )}
              </View>
              <Actionable onClick={() => setOpen(!open)}>
                <Icon size={6} svg={open ? ChevronUp : ChevronDown} />
              </Actionable>
            </View>
          ) : (
            <></>
          ),
        }}
      >
        <Checkbox.Group name="storeOrders" value={selectedStores} onChange={(e) => handleCheck(e)}>
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
