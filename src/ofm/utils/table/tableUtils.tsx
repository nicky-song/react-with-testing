/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  Chat,
  Link,
  TableSortOptions,
  View,
  Text,
  Icon,
  Badge,
  Select,
  Popover,
  Button,
  classNames,
  Actionable,
  CustomOptionsProps,
} from '@az/starc-ui';
import {
  ColumnParam,
  ErrorRowTypes,
  OrderDetailsDrawerRowTypes,
  SortRowsParam,
  StoreDetailsRowTypes,
  WarehouseDetails,
  WillCallRowTypes,
} from '@shared/components/Table/Table.types';
import { generateDateString } from '@ofm/utils/utils';
import { t } from 'i18next';
import styles from '@shared/components/Table/Table.module.scss';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { TableVariants } from '@shared/components/Table/tableConstants';
import { Credited, Ellipses } from '@shared/assets/icons';
import { z } from 'zod';
import { OrderProductSchema } from '@ofm/schemas/orderProductSchema';
import { WarehouseDetailsSchema } from '@ofm/schemas/warehouseDetailsSchema';
import { ProductStatusTranslationMap } from '@ofm/constants/constants';
import { ExtendedStepper } from '@shared/components/ExtendedStepper/ExtendedStepper';
import { Dispatch, SetStateAction } from 'react';
import { FlaggedItem } from '@ofm/types/types';
import { EMPTY_VALUE } from '@shared/constants/constants';
import { AvatarGroup } from '@shared/components/AvatarGroup/AvatarGroup';

/**
 * @returns 0, so the sorting algorithm will not sort the columns that have this
 * sorting function attached. This is needed because the first column of the table
 * always tries to be sorted, so when we have a non sorting column at first, we need
 * to assign this function.
 */
export const noSort = () => {
  return 0;
};

/**
 *
 * @param a First date string to compare on the sort
 * @param b Second date string to compare on the sort
 * @param sortModifier: Sort modifier to correctly set the direction of the sort, ascendent or descendent
 * @returns Number to represent the sorting method to the table.
 */
export const dateSort = (a: string, b: string, sortModifier: number) => {
  const aDate = new Date(a);
  const bDate = new Date(b);

  if (aDate < bDate) return -1 * sortModifier;
  if (aDate > bDate) return 1 * sortModifier;
  else return 0;
};

/**
 *
 * @param a First string to compare on the sort
 * @param b Second string to compare on the sort
 * @param sortModifier: Sort modifier to correctly set the direction of the sort, ascendent or descendent
 * @returns Number to represent the sorting method to the table.
 */
export const alphaSort = (valueA: string, valueB: string, sortModifier: number) =>
  (valueA.toLowerCase() > valueB.toLowerCase() ? 1 : -1) * sortModifier;

/**
 *
 * @param a First number to compare on the sort
 * @param b Second number to compare on the sort
 * @param sortModifier: Sort modifier to correctly set the direction of the sort, ascendent or descendent
 * @returns Number to represent the sorting method to the table.
 */
export const numSort = (a: string, b: string, sortModifier: number) => {
  if (a < b) return -1 * sortModifier;
  if (a > b) return 1 * sortModifier;
  else return 0;
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Errors Table
 */
export const mapErrorTableRows = (
  rows: ErrorRowTypes[],
  setOrderId?: Dispatch<SetStateAction<string>>,
  setShowOrderDetailsDrawer?: Dispatch<SetStateAction<boolean>>
) => {
  return rows.map((order, index) => ({
    id: index.toString(),
    cells: [
      { value: order.storeId.toString(), sortValue: order.storeId.toString() },
      { value: order.errorStatus, sortValue: order.errorStatus },
      { value: order.attempts.toString(), sortValue: order.attempts.toString() },
      {
        value: generateDateString(order.created, t('DateFormat.ShortTimeSeconds')),
        sortValue: generateDateString(order.created, t('DateFormat.ShortTimeSeconds')),
      },
      {
        value: generateDateString(order.lastAttempted, t('DateFormat.ShortTimeSeconds')),
        sortValue: generateDateString(order.lastAttempted, t('DateFormat.ShortTimeSeconds')),
      },
      {
        value: (
          <Link
            className={styles['table__link']}
            onClick={() => {
              if (setOrderId && setShowOrderDetailsDrawer) {
                setOrderId(order.link);
                setShowOrderDetailsDrawer(true);
              }
            }}
          >
            {t('ErrorTables.ViewOrderDetails')}
          </Link>
        ),
      },
    ],
  }));
};

export const getCurrentWarehouseFromList = (
  warehouseDetails: z.infer<typeof WarehouseDetailsSchema>[],
  warehouseId: string
): z.infer<typeof WarehouseDetailsSchema> | null => {
  if (warehouseDetails && warehouseDetails.length > 0) {
    const warehouseDetailFiltered = warehouseDetails.filter(
      (warehouseDetailsItem) => warehouseDetailsItem.warehouseId === warehouseId
    );
    return warehouseDetailFiltered.length > 0 ? warehouseDetailFiltered[0] : null;
  }
  return null;
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Order Details Table
 */
export const mapOrderDetailsTableRows = (
  rows: z.infer<typeof OrderProductSchema>[],
  warehouseId: string,
  flaggedItems: FlaggedItem[],
  flaggedCallback?: (item: FlaggedItem) => void,
  isQuantityAnomaly = false
) => {
  return rows.map((part) => {
    const warehouseObj = getCurrentWarehouseFromList(part.warehouseDetails, warehouseId);
    const qoh = warehouseObj?.quantityOnHand;
    const isRowCredited = false; //TBD part.isRowCredited (?)
    const flaggedItem = flaggedItems.find((item) => item.id === part.id);
    const quantity = flaggedItem ? flaggedItem.quantity : part.quantity;
    const withError = !!qoh && quantity > qoh;
    return {
      id: part.sku,
      isDisabled: isRowCredited,
      cells: [
        { value: part.sku, sortValue: part.sku },
        { value: part.partNumber, sortValue: part.partNumber },
        { value: part.planogramId, sortValue: part.planogramId },
        { value: part.description, sortValue: part.description },
        { value: part.pack.toString(), sortValue: part.pack.toString() },
        { value: qoh || EMPTY_VALUE, sortValue: qoh || EMPTY_VALUE },
        {
          value: isQuantityAnomaly ? (
            <View gap={2}>
              <ExtendedStepper
                id={`quantitystepper-${part.id}${withError ? '-error' : ''}`}
                onValueChange={(value) =>
                  flaggedCallback?.({ id: part.id, quantity: value, hasError: withError })
                }
                minValue={1}
                value={flaggedItem?.quantity}
                maxValue={part.quantity}
                inputAttributes={{ style: { width: 'calc(var(--st-unit-17) + 1px)' } }}
                hasError={withError}
                errorText={withError ? t('Table.OrderDetails.QOHError', { qoh }) : undefined}
              />
            </View>
          ) : (
            part.quantity.toString()
          ),
          sortValue: part.quantity.toString(),
        },
        { value: isRowCredited ? <Icon svg={Credited} /> : '' },
      ],
    };
  });
};

export const mapOrderDetailsDrawerTableRows = (rows: OrderDetailsDrawerRowTypes[]) => {
  return rows.map((part) => {
    return {
      id: part.sku,
      cells: [
        { value: part.sku, sortValue: part.sku },
        { value: part.part, sortValue: part.part },
        { value: part.planogramId, sortValue: part.planogramId },
        { value: part.subzone, sortValue: part.subzone },
        { value: part.description, sortValue: part.description },
        { value: part.pack.toString(), sortValue: part.pack.toString() },
        { value: part.qoh },
        { value: part.quantity },
        {
          value:
            (part.users && (
              <View direction="row">
                <AvatarGroup users={part.users} size="small" />
              </View>
            )) ||
            EMPTY_VALUE,
        },
      ],
    };
  });
};

const WillCallDCOption = (optionProps: CustomOptionsProps) => {
  return (
    <View
      direction="row"
      height="100%"
      align="center"
      padding={[4, 0]}
      {...optionProps?.innerProps}
    >
      <View.Item>
        <Text weight="medium">{optionProps.data?.label}</Text>

        <View direction="row" gap={4} padding={[1, 0, 0, 0]}>
          <Text size="087">
            {t('Table.WillCall.QOH')} {optionProps.data?.quantityOnHand.toString()}
          </Text>
          <Text size="087">
            {t('Table.WillCall.MinPacks')} {optionProps.data?.minimumPack.toString()}
          </Text>
        </View>
      </View.Item>
    </View>
  );
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Order Details Table
 */
export const mapWillCallDetailsTableRows = (
  rows: WillCallRowTypes[],
  onChange: (row: WillCallRowTypes) => void
) => {
  return rows.map((part) => ({
    id: part.sku,
    cells: [
      { value: part.sku },
      {
        value: (
          <Badge
            variant="status"
            text={t(ProductStatusTranslationMap[part.status])}
            variantOptions={{
              backgroundColor: 'gray-100',
              textColor: 'gray-700',
            }}
            attributes={{
              style: {
                border: 'none',
                height: 'var(--st-unit-5)',
                padding: '0 calc(var(--st-unit-1) + 0.5px)',
              },
            }}
          />
        ),
      },
      { value: part.partNumber },
      { value: part.description },
      { value: part.pack.toString() },
      {
        value: (
          <ExtendedStepper
            withButtons={false}
            minValue={part.selectedWarehouse.minimumPack}
            value={part.numberOfPacksCurrent}
            correctOnBlur={false}
            maxValue={Math.floor(part.selectedWarehouse.quantityOnHand / part.pack)}
            step={part.pack}
            onValueChange={(value) => {
              onChange({
                ...part,
                quantityCurrent: value.valueOf() * part.pack,
                numberOfPacksCurrent: value.valueOf(),
              });
            }}
          />
        ),
      },
      {
        value: (
          <ExtendedStepper
            isValueRounded
            correctOnBlur={false}
            minValue={part.selectedWarehouse.minimumPack * part.pack}
            value={part.quantityCurrent}
            maxValue={part.selectedWarehouse.quantityOnHand}
            step={part.pack}
            onValueChange={(value) => {
              onChange({
                ...part,
                quantityCurrent: value.valueOf(),
                numberOfPacksCurrent: Math.floor(value.valueOf() / part.pack),
              });
            }}
          />
        ),
      },
      {
        value: (
          <View>
            <Select
              label=""
              options={part.warehouseDetails}
              name="dc"
              menuPosition="bottom"
              variant="no-label"
              size="small"
              value={part.selectedWarehouse}
              defaultValue={part.selectedWarehouse}
              customOptions={WillCallDCOption}
              className={styles['table__dropdown']}
              onValueChange={(value) => {
                if (value) {
                  onChange({
                    ...part,
                    selectedWarehouse: value as WarehouseDetails,
                  });
                }
              }}
            />
            <View padding={[4, 4, 0, 4]}>
              <Text color="500" size="087">
                {`${t('Table.WillCall.QOH')} ${part.selectedWarehouse.quantityOnHand}`}
                {part.selectedWarehouse.minimumPack != 0 &&
                  `, ${t('Table.WillCall.MinPacks')} ${part.selectedWarehouse.minimumPack}`}
              </Text>
            </View>
          </View>
        ),
      },
    ],
  }));
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Will Call Table Modal
 */
export const mapWillCallModalTableRows = (
  rows: WillCallRowTypes[],
  onSave: (row: WillCallRowTypes) => void,
  onChange: (row: WillCallRowTypes) => void,
  onDelete: (row: WillCallRowTypes) => void
) => {
  return rows.map((part) => ({
    id: part.sku,
    cells: [
      { value: part.sku },
      {
        value: t(ProductStatusTranslationMap[part.status]),
      },
      { value: part.partNumber },
      { value: part.description },
      { value: part.pack.toString() },
      {
        value: part.isRowBeingEdited ? (
          <ExtendedStepper
            withButtons={false}
            minValue={part.selectedWarehouse.minimumPack}
            value={part.numberOfPacksCurrent}
            maxValue={Math.floor(part.selectedWarehouse.quantityOnHand / part.pack)}
            step={part.pack}
            onValueChange={(value) => {
              onChange({
                ...part,
                quantityCurrent: value.valueOf() * part.pack,
                numberOfPacksCurrent: value.valueOf(),
              });
            }}
          />
        ) : (
          part.numberOfPacksCurrent
        ),
      },
      {
        value: part.isRowBeingEdited ? (
          <ExtendedStepper
            isValueRounded
            minValue={part.selectedWarehouse.minimumPack * part.pack}
            value={part.quantityCurrent}
            maxValue={part.selectedWarehouse.quantityOnHand}
            step={part.pack}
            onValueChange={(value) => {
              onChange({
                ...part,
                quantityCurrent: value.valueOf(),
                numberOfPacksCurrent: Math.floor(value.valueOf() / part.pack),
              });
            }}
          />
        ) : (
          part.quantityCurrent
        ),
      },
      {
        value: part.isRowBeingEdited ? (
          <Button
            onClick={() => {
              onSave({
                ...part,
                isRowBeingEdited: false,
              });
            }}
          >
            {t('Table.Save')}
          </Button>
        ) : (
          <Popover width="calc(var(--st-unit-19) * 2)" position="bottom-end" padding={2}>
            <Popover.Trigger>
              {(attributes) => (
                <View>
                  <Button
                    ref={attributes.ref}
                    startIcon={<Icon svg={Ellipses} color="secondary" />}
                    variant="icon"
                    attributes={attributes}
                    className={classNames(styles['table__menu-button'], styles['menu-button'])}
                  />
                </View>
              )}
            </Popover.Trigger>
            <Popover.Content>
              <View backgroundColor="secondary" width="100%">
                <Actionable
                  className={styles['table__popover-button']}
                  onClick={() => onDelete(part)}
                >
                  {t('Table.DeleteItem')}
                </Actionable>
                <Actionable
                  className={styles['table__popover-button']}
                  onClick={() => {
                    onChange({
                      ...part,
                      isRowBeingEdited: true,
                    });
                  }}
                >
                  {t('Table.EditItem')}
                </Actionable>
              </View>
            </Popover.Content>
          </Popover>
        ),
      },
    ],
  }));
};

/**
 *
 * @param rows: The rows to populate the table, that are raw data.
 * @returns Rows mapped to the Table STARC format and specific for the Store Details Table
 */
export const mapStoreDetailsTableRows = (rows: StoreDetailsRowTypes[]) => {
  const today = new Date();
  today.setHours(0, 0, 0);
  return rows.map((order) => ({
    id: order.orderId,
    cells: [
      {
        value: <Text weight="bold">{order.invoiceId || EMPTY_VALUE}</Text>,
        sortValue: order.invoiceId,
      },
      {
        value:
          order.requestBy === undefined
            ? EMPTY_VALUE
            : order.requestBy.getTime() >= today.getTime()
            ? generateDateString(
                order.requestBy,
                t('DateFormat.TimeHoursMinutes'),
                t('Table.StoreDetails.Today')
              )
            : generateDateString(order.requestBy, t('DateFormat.ShortTime')),
        sortValue:
          order.requestBy === undefined
            ? EMPTY_VALUE
            : generateDateString(order.requestBy, t('DateFormat.ShortTime')),
      },
      { value: t(`OrderType.${order.orderType}`), sortValue: order.orderType },
      {
        value: (
          <StatusBadge text={t(`OrderStatus.${order.badgeText}`)} variant={order.badgeVariant} />
        ),
        sortValue: order.badgeText,
      },
      {
        value: generateDateString(order.requestedAt, t('DateFormat.ShortTimeSeconds')),
        sortValue: generateDateString(order.requestedAt, t('DateFormat.ShortTimeSeconds')),
      },
      {
        value:
          order.billedAt === undefined
            ? EMPTY_VALUE
            : generateDateString(order.billedAt, t('DateFormat.ShortTimeSeconds')),
        sortValue:
          order.billedAt === undefined
            ? EMPTY_VALUE
            : generateDateString(order.billedAt, t('DateFormat.ShortTimeSeconds')),
      },
      { value: t('Table.Number', { val: order.lines }), sortValue: order.lines },
      { value: t('Table.Number', { val: order.pieces }), sortValue: order.pieces },
      {
        value: order.hasComments ? <Icon svg={Chat} /> : '',
      },
    ],
  }));
};

/**
 *
 * @param variant: The variant of the table, in order to map correctly the rows for sorting.
 * @param rows: Mapped rows of the table.
 * @param columns: Columns of the table.
 * @param sortOptions: SortOptions parameter needed for the STARC table to sort correctly.
 * @param sortModifier: Modifier provided on the STARC table to get the sort direction.
 * @returns Rows sorted depending on the Sort state of the STARC table.
 */
export const sortTableRows = (
  variant: TableVariants,
  rows: SortRowsParam[],
  columns: ColumnParam[],
  sortOptions: TableSortOptions,
  sortModifier: number
) => {
  return [...rows].sort((rowA, rowB) => {
    const columnId = sortOptions.columnID;
    const columnIndex = columns.findIndex((column) => column.id === columnId);

    const valueA = rowA.cells[columnIndex]?.sortValue?.toString() || '';
    const valueB = rowB.cells[columnIndex]?.sortValue?.toString() || '';

    switch (variant) {
      case TableVariants.ERROR:
        return {
          storeId: numSort,
          errorStatus: alphaSort,
          attempts: numSort,
          created: dateSort,
          lastAttempted: dateSort,
        }[columnId as 'storeId' | 'errorStatus' | 'attempts' | 'created' | 'lastAttempted'](
          valueA,
          valueB,
          sortModifier
        );
      case TableVariants.ORDER_DETAILS:
        return {
          checkbox: noSort,
          sku: alphaSort,
          partNumber: alphaSort,
          planogramId: alphaSort,
          description: alphaSort,
          pack: numSort,
          qoh: numSort,
          quantity: numSort,
        }[
          columnId as
            | 'checkbox'
            | 'sku'
            | 'partNumber'
            | 'planogramId'
            | 'description'
            | 'pack'
            | 'qoh'
            | 'quantity'
        ](valueA, valueB, sortModifier);
      case TableVariants.STORE_DETAILS:
        return {
          invoiceId: alphaSort,
          requestBy: dateSort,
          orderType: alphaSort,
          status: alphaSort,
          requestedAt: dateSort,
          billedAt: dateSort,
          lines: numSort,
          pieces: numSort,
        }[
          columnId as
            | 'invoiceId'
            | 'requestBy'
            | 'orderType'
            | 'status'
            | 'requestedAt'
            | 'billedAt'
            | 'lines'
            | 'pieces'
        ](valueA, valueB, sortModifier);
      case TableVariants.WILL_CALL:
        return {
          checkbox: noSort,
          sku: numSort,
          status: alphaSort,
          part: alphaSort,
          description: alphaSort,
          pack: numSort,
          numOfPacks: noSort,
          quantity: numSort,
          dc: noSort,
        }[
          columnId as
            | 'checkbox'
            | 'sku'
            | 'status'
            | 'part'
            | 'description'
            | 'pack'
            | 'numOfPacks'
            | 'quantity'
            | 'dc'
        ](valueA, valueB, sortModifier);
      default:
        return { storeId: numSort }[columnId as 'storeId'](valueA, valueB, sortModifier);
    }
  });
};
