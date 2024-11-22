/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { CreditOrderDetailsType, OrderDetailsType } from '@ofm/types/types';
import { DrawerProps } from '@shared/components/Drawer/Drawer.types';

export type OrderProp = CreditOrderDetailsType | OrderDetailsType | undefined;

export type OrderDetailsDrawerProps = {
  drawerProps: Pick<DrawerProps, 'show' | 'handleClose' | 'hasNoItems'>;
  isInternational?: boolean;
  hasNoItems?: boolean; // TODO: Remove prop once the Orders are integrated to the backend
};
