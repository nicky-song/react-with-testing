/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  CreditOrderDetailsType,
  FlaggedItem,
  OrderDetailsType,
  OrderProductsType,
} from '@ofm/types/types';
import { DrawerProps } from '@shared/components/Drawer/Drawer.types';

export enum ModalActions {
  DELETE = 'delete',
  DELETE_ALL = 'deleteAll',
  REQUEST = 'request',
  REQUEST_MANY = 'requestMany',
  REQUEST_AHEAD = 'requestAhead',
  BILL = 'bill',
  EMAIL = 'email',
  CREDIT = 'credit',
  VERIFY = 'verify',
}

export type ModalActionProp = ModalActions | undefined;
export type OrderProp = CreditOrderDetailsType | OrderDetailsType | undefined;

export type OrderDetailsDrawerProps = {
  drawerProps: Pick<DrawerProps, 'show' | 'handleClose' | 'hasNoItems'>;
  isInternational?: boolean;
  hasNoItems?: boolean; // TODO: Remove prop once the Orders are integrated to the backend
};

export type OrderDetailsDrawerModalProps = {
  action: ModalActionProp;
  handleClose: () => void;
  order: OrderProp;
  selectedRows?: OrderProductsType[] | undefined;
  orders?: never;
  requestManyAction?: never;
  waveDueDate?: never;
  flaggedItems: FlaggedItem[];
  refetchOnSucess?: () => void;
};

export type OrderDetailsDrawerModalPropsVariant = {
  action: ModalActionProp;
  handleClose: () => void;
  requestManyAction: (message: string) => void;
  orders: OrderDetailsType[];
  order?: never;
  waveDueDate?: Date;
  selectedRows?: never;
  flaggedItems: FlaggedItem[];
  refetchOnSucess?: () => void;
};
