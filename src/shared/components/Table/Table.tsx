/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  Button,
  Checkbox,
  Pagination,
  Table as StarcTable,
  View,
  classNames,
  Text,
  Popover,
} from '@az/starc-ui';
import styles from './Table.module.scss';
import * as T from './Table.types';
import { useTranslation } from 'react-i18next';
import { TableStylingVariants } from './tableConstants';
import { useRef, ChangeEvent, useState, KeyboardEvent, useLayoutEffect, useEffect } from 'react';
import { KEY } from '@shared/constants/keyConstants';
import { TextDivider } from '@inbound/components/TextDivider/TextDivider';

type ItemProps = {
  text: string;
};

const Item = ({ text }: ItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isToolTipEnabled, setIsToolTipEnabled] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) {
      if (ref.current.scrollHeight > ref.current.clientHeight) {
        setIsToolTipEnabled(true);
      }
    }
  }, [text]);

  return !isToolTipEnabled ? (
    <Text
      attributes={{
        ref,
      }}
      maxLines={1}
    >
      {text}
    </Text>
  ) : (
    <Popover position="bottom" triggerType="hover">
      <Popover.Trigger>
        {(attributes) => (
          <Text className={styles[`table__description`]} maxLines={1} attributes={attributes}>
            {text}
          </Text>
        )}
      </Popover.Trigger>
      <Popover.Content>{text}</Popover.Content>
    </Popover>
  );
};

export const Table = ({
  styleVariant,
  columns,
  rows,
  isPaginated,
  pageSize,
  defaultPage,
  isCheckboxTable,
  isCheckboxDisabled,
  isCreditItem,
  totalPages,
  onClick,
  onSort,
  showTotalRows,
  onRowAction,
  isFullHeight,
}: T.Props) => {
  const { t } = useTranslation();

  /* State variables */
  const [page, setPage] = useState(defaultPage);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedCheckBoxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [sorting, setSorting] = useState<T.TableSorting[]>(
    columns.map((column) => ({
      id: column.id,
      direction: T.DIRECTION.ASCENDING,
    }))
  );

  /* Constants */
  const totalRows = rows.length;

  if (isCheckboxTable) {
    rows = rows.map((row, index) => ({
      id: index.toString(),
      isDisabled: row.isDisabled,
      cells: [
        {
          value: (
            <Checkbox
              value={index.toString()}
              checked={selectedCheckBoxes.includes(index.toString())}
              className={styles[`table__checkbox`]}
              disabled={isCheckboxDisabled || row.isDisabled}
            />
          ),
        },
        ...row.cells,
      ],
    }));
  }

  /* Functions */
  const handleCheckAll = () => {
    isAllChecked ? setSelectedCheckboxes([]) : setSelectedCheckboxes(rowIDs);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    checked
      ? setSelectedCheckboxes([...selectedCheckBoxes, value])
      : setSelectedCheckboxes(selectedCheckBoxes.filter((item) => item !== value));
  };

  const sortMethod = (columnID: string) => {
    const mappedSorting = sorting.map((column) => {
      const sortDirection =
        column.direction === T.DIRECTION.ASCENDING ? T.DIRECTION.DESCENDING : T.DIRECTION.ASCENDING;
      return column.id === columnID ? { ...column, direction: sortDirection } : column;
    });
    onSort(mappedSorting);
    setSorting(mappedSorting);
  };

  const onKeyDown = (row: T.SortRowsParam) => (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === KEY.ENTER) {
      e.preventDefault();
      onRowAction && onRowAction(row);
    }
  };

  const handleSelectedCheckboxes = () => {
    onClick && onClick(selectedCheckBoxes);
    setSelectedCheckboxes([]);
  };

  const getSortDirection = (columnId: string) => {
    const foundColumn = sorting.find((column) => column.id === columnId);
    return foundColumn?.direction || T.DIRECTION.ASCENDING;
  };

  if (isPaginated) {
    rows = [...rows].slice((page - defaultPage) * pageSize, page * pageSize);
  }

  const rowIDs = rows.filter((row) => !row.isDisabled).map((row) => row.id);

  /* Hooks */
  //  Updates the select state for the select all checkbox
  useEffect(() => {
    setIsAllChecked(selectedCheckBoxes.length === rows.length && rows.length > 0);
  }, [rows, selectedCheckBoxes]);

  const renderTableRows = (rows: T.SortRowsParam[]) => {
    return rows.map((row) =>
      row.dividerLabel ? (
        <StarcTable.Row key={row.id} attributes={{ 'data-type': 'divider-row' }}>
          <StarcTable.Cell
            attributes={{
              colSpan: columns.length * 2 - 1,
              'data-type': 'divider-row-cell',
            }}
          >
            <TextDivider label={row.dividerLabel} />
          </StarcTable.Cell>
        </StarcTable.Row>
      ) : (
        <StarcTable.Row
          key={row.id}
          attributes={{
            onClick: () => {
              onRowAction && onRowAction(row);
            },
            onKeyDown: onKeyDown(row),
            tabIndex: onRowAction ? 0 : -1,
            role: onRowAction && 'row',
          }}
          className={classNames(
            onRowAction && styles['table__row--clickable'],
            row.isStoreGroupParent && styles['table__row--group-parent'],
            row.inGroup &&
              (row.isStoreGroupParent && styles['table__row--group-parent'],
              row.inLaneConfirmation
                ? (styles['table__row--ingroup'], styles['table__row--inlane'])
                : styles['table__row--ingroup'])
          )}
        >
          {row.cells.map((cell, index) => (
            <StarcTable.Cell
              key={columns[index].id}
              textAlign={columns[index].textAlign}
              hasSpacer={index < row.cells.length - 1}
              className={classNames(row.isDisabled && styles['table__disabled'])}
            >
              {typeof cell.value === 'string' ? (
                columns[index].id !== 'description' ? (
                  <Text maxLines={1}>{cell.value}</Text>
                ) : (
                  <Item text={cell.value} />
                )
              ) : (
                cell.value
              )}
            </StarcTable.Cell>
          ))}
        </StarcTable.Row>
      )
    );
  };

  return (
    <View className={styles['table']} direction="column" height={isFullHeight ? '100%' : undefined}>
      {selectedCheckBoxes.length != 0 && (
        <Button
          variant="secondary"
          className={classNames(
            'table__button-row-selection',
            styles['table__button-delete'],
            styles['table__button']
          )}
          onClick={handleSelectedCheckboxes}
          attributes={{ style: { backgroundColor: 'transparent' } }}
        >
          {isCreditItem
            ? selectedCheckBoxes.length > 1
              ? t('Table.OrderDetails.CreditItems_other', { count: selectedCheckBoxes.length })
              : t('Table.OrderDetails.CreditItems_one', { count: selectedCheckBoxes.length })
            : t('Table.OrderDetails.DeleteSelectedItems', { count: selectedCheckBoxes.length })}
        </Button>
      )}
      {showTotalRows && (
        <View direction="row" align="center" gap={2}>
          <View
            direction="row"
            align="center"
            className={styles['table__billed-badge']}
            padding={[0.5, 2]}
          >
            <Text color="secondary" size="087" className={styles['table__billed-badge-text']}>
              {rows.length}
            </Text>
          </View>
          <Text weight="bold">{t('Table.ItemsToBeBilled', { count: rows.length })}</Text>
        </View>
      )}
      <View
        className={styles['table__wrapper']}
        direction="column"
        height={isFullHeight ? '100%' : undefined}
      >
        <StarcTable className={styles[`table__${styleVariant}`]}>
          <colgroup>
            {columns.map((column, index) => (
              <StarcTable.Col
                key={column.id}
                width={column.width}
                hasSpacer={index < columns.length - 1}
              />
            ))}
          </colgroup>
          <thead className={styles[`table__${styleVariant}-header`]}>
            <StarcTable.Row>
              {columns.map((column, index) => (
                <StarcTable.HeaderCell
                  key={column.id}
                  id={column.id}
                  {...(column.isSorted
                    ? { sort: { status: getSortDirection(column.id), method: sortMethod } }
                    : {})}
                  textAlign={column.textAlign}
                  hasSpacer={index < columns.length - 1}
                >
                  {column.isCheckbox ? (
                    <Checkbox
                      name="select-all"
                      value="all"
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                      className={styles[`table__checkbox`]}
                      disabled={isCheckboxDisabled}
                      indeterminate={selectedCheckBoxes.length > 0 && !isAllChecked}
                    />
                  ) : (
                    column.label && t(column.label)
                  )}
                </StarcTable.HeaderCell>
              ))}
            </StarcTable.Row>
          </thead>
          <tbody
            className={classNames(
              styles[`table__tbody${styleVariant === TableStylingVariants.MODAL ? '-modal' : ''}`],
              styles[`table__${styleVariant}-body`]
            )}
          >
            {isCheckboxTable ? (
              <Checkbox.Group
                name="order-details-checkbox-group"
                disabled={isCheckboxDisabled}
                value={selectedCheckBoxes}
                onChange={(e) => handleCheck(e)}
              >
                {renderTableRows(rows)}
              </Checkbox.Group>
            ) : (
              renderTableRows(rows)
            )}
          </tbody>
        </StarcTable>
      </View>
      {isPaginated && totalRows > pageSize && (
        <Pagination
          attributes={{ style: { display: 'flex', justifyContent: 'center' } }}
          totalPages={totalPages}
          initialPage={defaultPage}
          onPageChange={(currentPage) => setPage(currentPage)}
        />
      )}
    </View>
  );
};
