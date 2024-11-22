/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './CreditOrderTable.types';
import { Table, Text, classNames } from '@az/starc-ui';
import { ColumnParam, RowParam } from '@az/starc-ui/dist/components/table/Table.types';
import { ExtendedStepper } from '../../../shared/components/ExtendedStepper/ExtendedStepper';
import styles from './CreditOrderTable.module.scss';
import { useTranslation } from 'react-i18next';

export const CreditOrderTable = ({ data, onChange, isEditable = true }: T.Props) => {
  /* Functions */
  const handleOrderChange = (creditOrder: T.CreditOrderType) => {
    onChange(creditOrder);
  };

  /* Constants */
  const { t } = useTranslation();
  const CREDIT_ORDER_COLUMNS: ColumnParam[] = [
    { id: 'sku', label: t('CreditOrder.SKU'), width: '6rem' },
    { id: 'partNumber', label: t('CreditOrder.PartNumber'), width: '6rem' },
    { id: 'description', label: t('CreditOrder.Description'), width: '25rem' },
    { id: 'pack', label: t('CreditOrder.Pack'), width: '4rem' },
    { id: 'packReceived', label: t('CreditOrder.PacksReceived'), width: '10rem' },
    { id: 'quantityReceived', label: t('CreditOrder.QuantityReceived'), width: '15rem' },
  ];

  const creditOrderRows: RowParam[] = data.map((creditOrder) => {
    const row: RowParam = {
      id: creditOrder.id,
      cells: [
        { value: creditOrder.sku },
        { value: creditOrder.partNumber },
        { value: creditOrder.description },
        { value: creditOrder.pack },
        {
          value: (
            <ExtendedStepper
              isEditable={isEditable}
              className={styles['credit-order-table__stepper']}
              withButtons={false}
              minValue={0}
              value={creditOrder.packReceivedCurrent}
              maxValue={creditOrder.packReceivedMax - 1}
              maxTextValue={creditOrder.packReceivedMax}
              step={creditOrder.pack}
              onValueChange={(value) => {
                handleOrderChange({
                  ...creditOrder,
                  packReceivedCurrent: value.valueOf(),
                  quantityReceivedCurrent: value.valueOf() * creditOrder.pack,
                });
              }}
            />
          ),
        },
        {
          value: (
            <ExtendedStepper
              isValueRounded
              isEditable={isEditable}
              className={styles['credit-order-table__stepper--large']}
              minValue={0}
              step={creditOrder.pack}
              inputAttributes={{
                'data-testid': 'stepper-input-large',
              }}
              value={creditOrder.quantityReceivedCurrent}
              maxValue={creditOrder.quantityReceivedMax - 1}
              maxTextValue={creditOrder.quantityReceivedMax}
              onValueChange={(value) => {
                handleOrderChange({
                  ...creditOrder,
                  quantityReceivedCurrent: value.valueOf(),
                  packReceivedCurrent: Math.floor(value.valueOf() / creditOrder.pack),
                });
              }}
            />
          ),
        },
      ],
    };
    return row;
  });

  return (
    <Table className={styles['credit-order-table']}>
      <colgroup>
        {CREDIT_ORDER_COLUMNS.map((column) => (
          <Table.Col key={column.id} width={column.width} />
        ))}
      </colgroup>
      <thead>
        <Table.Row
          className={classNames(styles['credit-order-table__columns'], styles['credit-order'])}
        >
          {CREDIT_ORDER_COLUMNS.map((column) => (
            <Table.HeaderCell
              className={styles['credit-order-table__column']}
              key={column.id}
              id={column.id}
              textAlign="start"
            >
              <Text
                color="600"
                size="087"
                weight="medium"
                className={styles['credit-order-table__column-text']}
              >
                {column.label}
              </Text>
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </thead>
      <tbody className={styles['credit-order-table__rows']}>
        {creditOrderRows.map((row) => (
          <Table.Row
            className={classNames(
              styles['credit-order-table__row'],
              styles['credit-order-row'],
              styles['credit-order']
            )}
            key={row.id}
            attributes={{
              'data-testid': 'credit-order-row',
            }}
          >
            {row.cells.map((cell, index) => (
              <Table.Cell key={CREDIT_ORDER_COLUMNS[index].id}>
                <Text
                  size="100"
                  weight="regular"
                  className={styles['credit-order-table__row-text']}
                >
                  {cell.value}
                </Text>
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </tbody>
    </Table>
  );
};
