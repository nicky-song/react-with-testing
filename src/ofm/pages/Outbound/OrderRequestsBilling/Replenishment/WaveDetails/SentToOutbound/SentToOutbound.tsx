/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { ItemLayout } from '@shared/components/ItemLayout/ItemLayout';
import { OrderDetailsDrawer } from '@ofm/components/OrderDetailsDrawer/OrderDetailsDrawer';
import { OrderSecondaryStatus, OrderStatus, OrderType } from '@ofm/constants/constants';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderDetailsType, SetChildErrorType } from '@ofm/types/types';
import { useGetOrdersByStatus } from '@ofm/services/hooks/useGetOrdersByStatus';
import { orderDetailsAtom } from '@ofm/atoms/orderDetails/orderDetailsAtom';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { PAGE_ERRORS } from '@shared/constants/constants';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';

export const SentToOutbound = () => {
  const { waveId, setChildError } = useOutletContext<{
    waveId?: string;
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setOrderDetails] = useAtom(orderDetailsAtom);

  /* State variables */
  const [showOrderDetailsDrawer, setShowOrderDetailsDrawer] = useState<boolean>(false);

  /* Constants */
  const { t } = useTranslation();
  const { isInternational, key } = useInternationalDC({ warehouse });
  const navigate = useNavigate();
  const { orderId } = useParams();

  /* Queries */
  const {
    orders,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetOrdersByStatus([OrderStatus.SENT_TO_OUTBOUND]);

  /* Functions */
  // Sets the secondary status label to each order
  const generateOrderSecondaryStatus = (order: OrderDetailsType): string | null => {
    const secondaryStatus = order.secondaryStatus;

    if (secondaryStatus === OrderSecondaryStatus.FILL_IN) {
      return t('OrderSecondaryStatus.FillIn');
    } else if (secondaryStatus === OrderSecondaryStatus.WILL_CALL) {
      return t('OrderSecondaryStatus.WillCall');
    }
    return null;
  };

  const outboundOrderItems = orders?.map((order) => {
    if (order.secondaryStatus) {
      return {
        ...order,
        secondaryStatus: generateOrderSecondaryStatus(order),
      };
    }
    return order;
  });

  /* Hooks */
  usePageErrorHandler([{ name: PAGE_ERRORS.ORDERS, value: isOrderError }], setChildError);

  useEffect(() => {
    if (orderId) {
      setOrderDetails({ orderId: orderId.toString(), orderType: OrderType.REPLENISHMENT });
      setShowOrderDetailsDrawer(true);
    }
  }, [orderId, setOrderDetails]);

  return (
    <>
      <ItemLayout
        items={outboundOrderItems}
        isLoading={isOrderLoading}
        setItemId={(id) => {
          setOrderDetails({ orderId: id.toString(), orderType: OrderType.REPLENISHMENT });
          navigate(
            `${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.SENT_TO_OUTBOUND}/${
              ROUTES.ORDERS
            }/${id.toString()}`
          );
        }}
        setShowOrderDetailsDrawer={setShowOrderDetailsDrawer}
        emptySubtitle={t('Empty.Store.Subtitle')}
        emptyText={t('Empty.Store.Text', { orderType: t('OrderStatus.SentToOutbound') })}
      />
      <OrderDetailsDrawer
        drawerProps={{
          show: showOrderDetailsDrawer,
          handleClose: () => {
            setShowOrderDetailsDrawer(false);
            navigate(`${PAGE_URLS.WAVE_DETAILS(waveId || '')}/${ROUTES.SENT_TO_OUTBOUND}`);
          },
        }}
        isInternational={isInternational}
        key={key}
      />
    </>
  );
};
