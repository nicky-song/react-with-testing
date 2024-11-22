/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { OrderStatus, OrderType } from '@ofm/constants/constants';
import { OrderDetailsType } from '@ofm/types/types';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useAtom } from 'jotai';
import { useOutletContext } from 'react-router-dom';
import { useGetOrders } from '@ofm/services/hooks/useGetOrders';

export const useGetOrdersByStatus = (orderStatus: OrderStatus[]) => {
  const { waveId } = useOutletContext<{ waveId?: string }>();

  const [warehouse] = useAtom(warehouseAtom);
  const [orders, setOrders] = useState<OrderDetailsType[] | undefined>(undefined);

  const { ordersData, isLoading, isError } = useGetOrders(
    {
      warehouseId: warehouse.id,
      waveId,
      type: OrderType.REPLENISHMENT,
      status: orderStatus,
    },
    !!warehouse.id
  );

  useEffect(() => {
    if (ordersData?.results) {
      setOrders(ordersData.results);
    }
  }, [ordersData]);

  return { orders, isLoading, isError };
};
