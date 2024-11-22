/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './WillCallTableModal.types';
import styles from './WillCallTableModal.module.scss';
import { Actionable, Close, Icon, Modal, Text, View, classNames } from '@az/starc-ui';
import { useEffect, useState } from 'react';
import {
  TableStylingVariants,
  WILL_CALL_TABLE_MODAL_COLUMNS,
  WILL_CALL_TABLE_MODAL_EDIT_COLUMNS,
} from '@shared/components/Table/tableConstants';
import { Table } from '@shared/components/Table/Table';
import { mapWillCallModalTableRows } from '@ofm/utils/table/tableUtils';
import { TableSorting, WillCallRowTypes } from '@shared/components/Table/Table.types';
import { MODAL_TABLE_PAGE_SIZE, DEFAULT_PAGE } from '@shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const WillCallTableModal = ({
  isOpen,
  onClose,
  dcName,
  willCallRowsData,
  handleRowChange,
  handleRowDelete,
}: T.Props) => {
  /* State variables */
  const [willCallRows, setWillCallRows] = useState(willCallRowsData);
  const [willCallColumns, setWillCallColumns] = useState(WILL_CALL_TABLE_MODAL_COLUMNS);
  const [isEditing, setIsEditing] = useState(false);

  /* Constants */
  const { t } = useTranslation();

  /* Functions */
  const onSort = (_sorting: TableSorting[]) => {
    // TODO BFF INTEGRATION FOR SORTING
  };

  const handleDataChange = (newWillCallOrder: WillCallRowTypes) => {
    const newWillCallRows = willCallRows.map((order) =>
      newWillCallOrder.sku === order.sku ? newWillCallOrder : order
    );
    setWillCallRows(newWillCallRows);
  };

  const handleRowSave = (newWillCallOrder: WillCallRowTypes) => {
    setWillCallRows(
      willCallRows.map((row) => (newWillCallOrder.sku === row.sku ? newWillCallOrder : row))
    );
    handleRowChange && handleRowChange(newWillCallOrder);
  };

  const handleDeleteItem = (item: WillCallRowTypes) => {
    const newWillCallRows = willCallRows.filter((willCallItem) => willCallItem !== item);
    if (willCallRows.length) {
      setWillCallRows(newWillCallRows);
      handleRowDelete && handleRowDelete(item, newWillCallRows.length === 0);
    }
  };

  /* Hooks */
  // Sets the will call product rows
  useEffect(() => {
    setWillCallRows(willCallRowsData);
  }, [willCallRowsData]);

  // Handles the logic in case the row is being edited or not
  useEffect(() => {
    for (const order of willCallRows) {
      if (order.isRowBeingEdited) {
        if (!isEditing) {
          setIsEditing(true);
          setWillCallColumns(WILL_CALL_TABLE_MODAL_EDIT_COLUMNS);
        }
        return;
      }
    }

    if (isEditing) {
      setIsEditing(false);
      setWillCallColumns(WILL_CALL_TABLE_MODAL_COLUMNS);
    }
  }, [willCallRows, isEditing]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={styles['will-call-table-modal']}
      attributes={{
        style: { '--st-modal-max-width': '73%' },
      }}
    >
      <View
        direction="row"
        justify="space-between"
        className={styles['will-call-table-modal__header']}
      >
        <View direction="column" gap={2}>
          <Text
            as="h2"
            color="primary"
            size="175"
            weight="bold"
            className={styles['will-call-table-modal__title']}
          >
            {dcName}
          </Text>
          <Text
            color="primary"
            size="100"
            weight="regular"
            className={styles['will-call-table-modal__subtitle']}
          >
            {t('WillCallTableItem', { count: willCallRows.length })}
          </Text>
        </View>
        <View>
          <Actionable
            className={classNames(styles['will-call-table-modal__icon-button'])}
            onClick={onClose}
          >
            <Icon svg={Close} />
          </Actionable>
        </View>
      </View>
      <Table
        styleVariant={TableStylingVariants.MODAL}
        columns={willCallColumns}
        rows={mapWillCallModalTableRows(
          willCallRows,
          handleRowSave,
          handleDataChange,
          handleDeleteItem
        )}
        isPaginated={true}
        pageSize={MODAL_TABLE_PAGE_SIZE}
        defaultPage={DEFAULT_PAGE}
        isCreditItem={false}
        isCheckboxTable={false}
        totalPages={Math.ceil(willCallRows.length / MODAL_TABLE_PAGE_SIZE)}
        onSort={onSort}
      />
    </Modal>
  );
};
