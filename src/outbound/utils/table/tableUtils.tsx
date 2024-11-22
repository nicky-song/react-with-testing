/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { t } from 'i18next';

import { Button, Checkbox, Select, View, Text } from '@az/starc-ui';
import type { SingleValue } from '@az/starc-ui';

import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import {
  OrderReleaseStoreOrderRowTypes,
  OrderReleaseNewStoreOrderRowTypes,
} from '@shared/components/Table/Table.types';
import { Tag } from '@shared/components/Tag/Tag';
import { generateDateString } from '@ofm/utils/utils';

import { DropdownMenu } from '@inbound/components/DropdownMenu/DropdownMenu';
import { OrderReleaseStatus } from '@outbound/constants/constants';
import { OrderStatus } from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion.types';

/**
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Store Details Table
 */
export const mapStoreOrderReleaseTableRows = (
  rows: OrderReleaseStoreOrderRowTypes[],
  selectedSubItem: string[],
  inLaneConfirmation: boolean,
  onLaneSelect: (storeNumber: string, lane: SingleValue) => void,
  getAvailableOptions: () => { label: string; value: string }[],
  onReplenishment?: (id: string) => void,
  itemStatus?: OrderStatus,
  groupedStores?: string[][]
) => {
  const menuOptions = [{ id: '1', name: t('OutboundMatrix.MenuOptions.ViewOrderDetails') }];

  const inGroup = (id: string) => {
    return groupedStores?.flat().includes(id);
  };

  const firstInGroup = (id: string) => {
    return groupedStores?.some((subGroup) => subGroup.length > 0 && subGroup[0] === id);
  };

  const row = rows.map((store, index) => {
    const isStoreGroupParent = firstInGroup(store.storeNumber) || !inGroup(store.storeNumber);
    const isItemReadyToRelease = itemStatus?.value === OrderReleaseStatus.READY_FOR_RELEASE;
    const isStoreReadyToRelease = store.status?.value === OrderReleaseStatus.READY_FOR_RELEASE;

    return {
      id: index.toString(),
      inGroup: inGroup(store.storeNumber),
      inLaneConfirmation,
      isStoreGroupParent,
      cells: [
        {
          value: inLaneConfirmation ? (
            <View direction="row" align="center" wrap={false}>
              <View width="var(--st-unit-18)">{store.storeNumber}</View>
              {store.willCall && <Tag text="WC" variant="order" />}
            </View>
          ) : isStoreGroupParent ? (
            <View direction="row" align="center" wrap={false}>
              <Checkbox
                id={store.storeNumber}
                value={store.storeNumber}
                checked={selectedSubItem.includes(store.storeNumber)}
                label={<View width="var(--st-unit-18)">{store.storeNumber}</View>}
              />
              {store.willCall && <Tag text="WC" variant="order" />}
            </View>
          ) : (
            <View direction="row" align="center" padding={[0, 0, 0, 10]} wrap={false}>
              <View width="var(--st-unit-18)">{store.storeNumber}</View>
              {store.willCall && <Tag text="WC" variant="order" />}
            </View>
          ),
        },
        { value: t('Table.Number', { val: store.pallets }) },
        { value: t('Table.Number', { val: store.pieces }) },
        { value: store.route },
        {
          value:
            store.dispatchTime && generateDateString(store.dispatchTime, t('DateFormat.ShortTime')),
        },
        { value: store.activity },
        {
          value: !inLaneConfirmation ? (
            store?.status && !isItemReadyToRelease ? (
              isStoreReadyToRelease ? (
                <View align="end" justify="center" height="calc(var(--st-unit-10) + 2px)">
                  <StatusBadge variant={store.status.variant} text={store.status.label} />
                </View>
              ) : (
                isStoreGroupParent && (
                  <View align="end">
                    <View width="fit-content">
                      {!isItemReadyToRelease && (
                        <Button
                          variant="secondary"
                          onClick={() => onReplenishment && onReplenishment(store.storeNumber)}
                        >
                          <Text variant="button">
                            {t('OutboundMatrix.OrderRelease.RunReplenishment')}
                          </Text>
                        </Button>
                      )}
                    </View>
                  </View>
                )
              )
            ) : (
              <></>
            )
          ) : isStoreGroupParent ? (
            <View gap={4} direction="row" justify="end" align="center">
              {!isItemReadyToRelease &&
                store.status?.value === OrderReleaseStatus.READY_FOR_RELEASE && (
                  <StatusBadge variant={store.status.variant} text={store.status.label} />
                )}
              <View width="calc(var(--st-unit-28) * 2)">
                <Select
                  label="Lane"
                  variant="no-label"
                  name={store.storeNumber}
                  size="small"
                  onValueChange={(value) => onLaneSelect(store.storeNumber, value)}
                  defaultValue={getAvailableOptions()[index]}
                  options={getAvailableOptions()}
                />
              </View>
            </View>
          ) : (
            <View height="var(--st-unit-10)" />
          ),
        },
        {
          value: !inLaneConfirmation && isStoreGroupParent && (
            <View justify="center" height="var(--st-unit-5)">
              <DropdownMenu
                width={234}
                options={menuOptions}
                onChange={() => {
                  return;
                }}
              />
            </View>
          ),
        },
      ],
    };
  });

  return row;
};

export const mapNewStoreOrderReleaseTableRows = (
  rows: OrderReleaseNewStoreOrderRowTypes[],
  selectedSubItem: string[],
  inLaneConfirmation: boolean,
  itemStatus: OrderStatus,
  onReplenishment?: (id: string) => void
) => {
  const row = rows.map((subzone, index) => ({
    id: index.toString(),
    cells: [
      {
        value: inLaneConfirmation ? (
          <View direction="row" align="center" wrap={false}>
            <View width="var(--st-unit-18)">
              <Text weight="bold">{subzone.subzone}</Text>
            </View>
          </View>
        ) : (
          <View direction="row" align="center" wrap={false}>
            <Checkbox
              id={subzone.subzone}
              value={subzone.subzone}
              checked={selectedSubItem.includes(subzone.subzone)}
              label={
                <View width="var(--st-unit-18)">
                  <Text weight="bold">{subzone.subzone}</Text>
                </View>
              }
            />
          </View>
        ),
      },
      { value: t('Table.Number', { val: subzone.sku }) },
      { value: t('Table.Number', { val: subzone.pallets }) },
      { value: t('Table.Number', { val: subzone.pieces }) },
      {
        value:
          !inLaneConfirmation &&
          (subzone?.status ? (
            subzone.status?.value === OrderReleaseStatus.READY_FOR_RELEASE ? (
              <View align="end" justify="center" height="calc(var(--st-unit-10) + 2px)">
                <StatusBadge variant={subzone.status.variant} text={subzone.status.label} />
              </View>
            ) : (
              <View align="end">
                <View width="fit-content">
                  {itemStatus?.value !== OrderReleaseStatus.READY_FOR_RELEASE && (
                    <Button
                      variant="secondary"
                      onClick={() => onReplenishment && onReplenishment(subzone.subzone)}
                    >
                      <Text variant="button">
                        {t('OutboundMatrix.OrderRelease.RunReplenishment')}
                      </Text>
                    </Button>
                  )}
                </View>
              </View>
            )
          ) : (
            <></>
          )),
      },
      {
        value: (
          <View justify="center" height="var(--st-unit-10)">
            {!inLaneConfirmation && (
              <DropdownMenu
                options={[]}
                onChange={() => {
                  return;
                }}
              />
            )}
          </View>
        ),
      },
    ],
  }));

  return row;
};
