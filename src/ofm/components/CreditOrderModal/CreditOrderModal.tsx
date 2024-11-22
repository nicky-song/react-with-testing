/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './CreditOrderModal.types';
import styles from './CreditOrderModal.module.scss';
import { Button, Close, Icon, Modal, Pagination, Text, View, classNames } from '@az/starc-ui';
import { CreditOrderTable } from '../CreditOrderTable/CreditOrderTable';
import { useState } from 'react';
import { CreditOrderType } from '../CreditOrderTable/CreditOrderTable.types';
import { useTranslation } from 'react-i18next';

export const CreditOrderModal = ({
  pageSize = 5,
  isOpen,
  creditOrders,
  onClose,
  onCreditItems,
}: T.Props) => {
  /* State variables */
  const [editable, setEditable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [internalOrders, setInternalOrders] = useState(creditOrders);

  /* Constants */
  const paginatedData = internalOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const { t } = useTranslation();

  /* Functions */
  const getOrdersWithErrors = () => {
    const ordersWithErrors = internalOrders.filter((order) => {
      const { packReceivedCurrent, packReceivedMax, quantityReceivedCurrent, quantityReceivedMax } =
        order;
      const isInvalidReceived = isNaN(packReceivedCurrent) || isNaN(quantityReceivedCurrent);

      const isReceivedOverMax =
        packReceivedCurrent >= packReceivedMax || quantityReceivedCurrent >= quantityReceivedMax;

      const isReceivedBelowZero = packReceivedCurrent < 0 || quantityReceivedCurrent < 0;

      return isInvalidReceived || isReceivedOverMax || isReceivedBelowZero;
    });

    return ordersWithErrors;
  };

  const handleDataChange = (newOrder: CreditOrderType) => {
    setInternalOrders(internalOrders.map((order) => (order.id === newOrder.id ? newOrder : order)));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClose = () => {
    onClose();
    setCurrentPage(1);
    setEditable(true);
  };

  const handleBackCreditItems = () => {
    setCurrentPage(1);
    setEditable(true);
  };

  const isReviewable = () => {
    const invalidOrders = getOrdersWithErrors();
    return invalidOrders.length === 0;
  };

  const handleCreditItems = () => {
    onCreditItems(internalOrders);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={styles['credit-order-modal']}
      attributes={{
        style: {
          '--st-modal-max-width': '73%',
        },
      }}
    >
      <View
        direction="row"
        justify="space-between"
        className={styles['credit-order-modal__header']}
      >
        <View direction="column" gap={2}>
          <Text
            as="h2"
            color="primary"
            size="175"
            weight="bold"
            className={styles['credit-order-modal__title']}
          >
            {t('CreditOrder.ModalTitle')}
          </Text>
          <Text
            color="primary"
            size="100"
            weight="regular"
            className={styles['credit-order-modal__subtitle']}
          >
            {t('CreditOrder.Items', { count: creditOrders.length })}
          </Text>
        </View>
        <View>
          <Button
            className={classNames(
              styles['credit-icon-button'],
              styles['credit-order-modal__icon-button']
            )}
            variant="ghost"
            onClick={handleClose}
          >
            <Icon svg={Close} />
          </Button>
        </View>
      </View>
      <View className={styles['credit-order-modal__table']}>
        <CreditOrderTable isEditable={editable} data={paginatedData} onChange={handleDataChange} />
      </View>
      <View
        direction="row"
        justify="end"
        align="end"
        height="fit-content"
        width="100%"
        className={styles['credit-order-modal__footer']}
      >
        {creditOrders.length > pageSize && (
          <View className={styles['credit-order-modal__pagination-wrapper']}>
            <Pagination
              onPageChange={handlePageChange}
              totalPages={Math.ceil(creditOrders.length / pageSize)}
              initialPage={currentPage}
            />
          </View>
        )}
        <View>
          {editable ? (
            <Button
              className={classNames(
                styles['credit-order-button'],
                styles['credit-order-modal__button']
              )}
              disabled={!isReviewable()}
              onClick={() => setEditable(false)}
            >
              <Text className={styles['credit-order-modal__button-text']}>
                {t('CreditOrder.ReviewButton')}
              </Text>
            </Button>
          ) : (
            <View gap={3} direction="row">
              <Button
                className={classNames(
                  styles['credit-order-button'],
                  styles['credit-order-modal__button']
                )}
                variant="secondary"
                onClick={handleBackCreditItems}
              >
                <Text className={styles['credit-order-modal__button-text']}>
                  {t('WillCallDrawer.Back')}
                </Text>
              </Button>
              <Button
                className={classNames(
                  styles['credit-order-button'],
                  styles['credit-order-modal__button']
                )}
                onClick={handleCreditItems}
              >
                <Text className={styles['credit-order-modal__button-text']}>
                  {t('CreditOrder.CreditButton', { count: creditOrders.length })}
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
