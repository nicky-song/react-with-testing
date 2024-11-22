/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, Store } from '@az/starc-ui';
import { CheckBoxCard } from '@shared/components/CheckBoxCard/CheckBoxCard';
import { useTranslation } from 'react-i18next';
import {
  StatusVariants,
  Props as StatusBadgeType,
} from '@shared/components/StatusBadge/StatusBadge.types';
import { Table } from '@shared/components/Table/Table';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import { Accordion } from '@shared/components/Accordion/Accordion';
import {
  DEFAULT_PAGE,
  NOTIFICATION_TYPES,
  PAGE_ERRORS,
  PAGE_SIZE,
} from '@shared/constants/constants';
import { OrderErrorType, OrderStatus, OrderType } from '@ofm/constants/constants';
import { ERROR_TABLE_COLUMNS, TableStylingVariants } from '@shared/components/Table/tableConstants';
import { mapErrorTableRows } from '@ofm/utils/table/tableUtils';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { OrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer';
import { useGetOrdersByStatus } from '@ofm/services/hooks/useGetOrdersByStatus';
import { CardGridSkeleton } from '@shared/components/Skeletons/CardGridSkeleton';
import { useAtom } from 'jotai';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { TableSorting } from '@shared/components/Table/Table.types';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { OrderDetailsType, SetChildErrorType } from '@ofm/types/types';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import s from './Flagged.module.scss';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';

export const Flagged = () => {
  const { waveId, setChildError } = useOutletContext<{
    waveId?: string;
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);
  const [flaggedOrders, setFlaggedOrders] = useState<OrderDetailsType[] | undefined>(undefined);

  /* Constants */
  const { t } = useTranslation();
  const ORDER_STATUS_TO_BADGE: Record<string, StatusBadgeType> = {
    QUANTITY_ANOMALY: {
      variant: StatusVariants.IN_PROGRESS,
      text: t('OrderStatus.QuantityAnomaly'),
    },
    ON_HOLD: {
      variant: StatusVariants.READY_FOR_ACTION,
      text: t('OrderStatus.OnHold'),
    },
  };

  const initialFlaggedOrdersRef = useRef(flaggedOrders);

  const { isInternational, key } = useInternationalDC({ warehouse });
  const { handleNotification } = useNotificationHandler();
  const navigate = useNavigate();

  const { orderId, orderType } = useParams();

  /* Queries */
  const {
    orders,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetOrdersByStatus([OrderStatus.ERROR]);

  /* Functions */
  const onSort = (_sorting: TableSorting[]) => {
    // TODO BFF INTEGRATION FOR SORTING
  };

  const onOrderClick = (orderId: SetStateAction<string>) => {
    const foundOrder = orders
      ?.filter((order) => {
        order.id === orderId;
      })
      .at(0);
    setOrderDetails({
      orderId: orderId.toString(),
      orderType: foundOrder?.type || OrderType.REPLENISHMENT,
    });
  };

  /* Hooks */
  usePageErrorHandler([{ name: PAGE_ERRORS.ORDERS, value: isOrderError }], setChildError);

  // Sets the flagged orders
  useEffect(() => {
    if (orders && !isOrderError) {
      const filteredFlaggedOrders = orders.filter((order) => order.status === OrderStatus.ERROR);

      // Calculates the solved flagged orders for the snack notification
      if (initialFlaggedOrdersRef.current?.length === 0) {
        initialFlaggedOrdersRef.current = filteredFlaggedOrders;
      } else {
        const solvedOrders = initialFlaggedOrdersRef.current?.filter(
          (order) => !filteredFlaggedOrders.includes(order)
        );

        if (solvedOrders?.length) {
          handleNotification(
            NOTIFICATION_TYPES.SNACK,
            t('OrdersFlaggedSummaryReady', { count: solvedOrders.length }),
            t('OrdersFlaggedSummary', {
              solved: solvedOrders.length,
              flagged: filteredFlaggedOrders.length,
            })
          );
        }
      }

      setFlaggedOrders(filteredFlaggedOrders);
    }
  }, [orders, isOrderError, handleNotification, t]);

  useEffect(() => {
    if (orderId && orderType) {
      setOrderDetails({
        orderId: orderId.toString(),
        orderType: OrderType[orderType as keyof typeof OrderType],
      });
      setShowOrderDetailsDrawer(true);
    }
  }, [orderId, orderType, setOrderDetails]);

  if (isOrderLoading) {
    return (
      <View justify="center" padding={6}>
        <CardGridSkeleton items={8} hasTitle hasErrorSection />
      </View>
    );
  } else {
    // TODO: This logic has to be updated when error type is returned in BFF

    const systemErrorOrders = flaggedOrders;

    const storeErrorOrders = flaggedOrders?.filter(
      (order) => order?.error[0]?.errorType === OrderErrorType.STORE_ERROR
    );

    const csrErrorOrders = flaggedOrders?.filter(
      (order) => order?.error[0]?.errorType === OrderErrorType.CSR_ERROR
    );

    const csrErrorRows =
      csrErrorOrders?.map((order) => ({
        storeId: order.error[0].storeNumber,
        errorStatus: order.error[0].status,
        attempts: order.error[0].attemptsCount,
        created: order.error[0].createdAt,
        lastAttempted: order.error[0].lastAttemptedAt,
        link: order.error[0].orderId,
      })) || [];

    const storeErrorRows =
      storeErrorOrders?.map((order) => ({
        storeId: order.error[0].storeNumber,
        errorStatus: order.error[0].status,
        attempts: order.error[0].attemptsCount,
        created: order.error[0].createdAt,
        lastAttempted: order.error[0].lastAttemptedAt,
        link: order.error[0].orderId,
      })) || [];

    const mappedCSRErrorRows = mapErrorTableRows(
      csrErrorRows,
      onOrderClick,
      setShowOrderDetailsDrawer
    );

    const mappedStoreErrorRows = mapErrorTableRows(
      storeErrorRows,
      onOrderClick,
      setShowOrderDetailsDrawer
    );

    return (
      <View padding={6} height="100%" className="scrollable-section">
        {systemErrorOrders && systemErrorOrders?.length > 0 && (
          <>
            <Text weight="bold" color="primary" className={s['heading']}>
              {t('ActionRequired')}
            </Text>
            <View as="ul" gap={4} className={s['orders-list']}>
              {systemErrorOrders?.map((order) => (
                <View.Item as="li" key={order.id} className={s['orders-list__item']}>
                  <CheckBoxCard
                    title={order.id}
                    // TODO: change the logic when we have error details from BFF
                    statusBadge={ORDER_STATUS_TO_BADGE['ON_HOLD']}
                    shouldHideCheckbox
                    onClick={() => {
                      setOrderDetails({
                        orderId: order.id,
                        orderType: order.type,
                      });
                      setShowOrderDetailsDrawer(true);
                      navigate(
                        `${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.FLAGGED}/${
                          ROUTES.ORDERS
                        }/${order.id.toString()}/${order.type}`
                      );
                    }}
                  />
                </View.Item>
              ))}
              <OrderDetailsDrawer
                drawerProps={{
                  show: showOrderDetailsDrawer,
                  handleClose: () => {
                    setShowOrderDetailsDrawer(false);
                    navigate(PAGE_URLS.WAVE_DETAILS(waveId || '') + `/${ROUTES.FLAGGED}`);
                  },
                }}
                isInternational={isInternational}
                key={key}
              />
            </View>
          </>
        )}
        <>
          <Text weight="bold" color="primary" className={s['heading']}>
            {t('SystemErrors')}
          </Text>
          <View padding={[0, 0, 2, 0]}>
            <Accordion
              header={{
                label: (
                  <StatusBadge
                    text={t('ErrorTables.StoreError')}
                    variant={StatusVariants.CANCELLED}
                  />
                ),
                auxiliaryLabel: (
                  <Text>{t('NumberOfOrders', { count: storeErrorRows.length })}</Text>
                ),
              }}
            >
              <Table
                columns={ERROR_TABLE_COLUMNS}
                rows={mappedStoreErrorRows}
                isPaginated={false}
                pageSize={PAGE_SIZE}
                defaultPage={DEFAULT_PAGE}
                styleVariant={TableStylingVariants.ERROR}
                isCheckboxTable={false}
                isCreditItem={false}
                totalPages={0}
                onSort={onSort}
              />
            </Accordion>
          </View>

          <Accordion
            header={{
              label: (
                <StatusBadge text={t('ErrorTables.CSRError')} variant={StatusVariants.CANCELLED} />
              ),
              auxiliaryLabel: <Text>{t('NumberOfOrders', { count: csrErrorRows.length })}</Text>,
            }}
          >
            <Table
              columns={ERROR_TABLE_COLUMNS}
              rows={mappedCSRErrorRows}
              isPaginated={false}
              pageSize={PAGE_SIZE}
              defaultPage={DEFAULT_PAGE}
              styleVariant={TableStylingVariants.ERROR}
              isCheckboxTable={false}
              isCreditItem={false}
              totalPages={0}
              onSort={onSort}
            />
          </Accordion>
        </>
        <>
          {flaggedOrders?.length === 0 && (
            <EmptyState
              svg={Store}
              subtitle={t('Empty.Store.Subtitle')}
              text={t('Empty.Store.Orders', { orderType: t('OrderType.Flagged') })}
            />
          )}
        </>
      </View>
    );
  }
};
