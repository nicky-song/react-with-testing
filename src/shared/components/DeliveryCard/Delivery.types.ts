/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { DeliveryMethod } from '@ofm/constants/constants';

export type DeliveryOptionType = {
  value: DeliveryMethod;
  title: string;
  deliveryDays?: number;
  hasOutboundAlert: boolean;
};

export type DeliveryChangeValue = {
  warehouseId: string;
  deliveryOption: DeliveryMethod;
};

export type DeliveryCardProps = {
  warehouseId: string;
  itemQuantity: number;
  deliveryList: DeliveryOptionType[];
  radioGroupName: string;
  isPrimary?: boolean;
  onValueChange?: (option: DeliveryChangeValue) => void;
  onButtonClick?: (warehouseId: string) => void;
};
