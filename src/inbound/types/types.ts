/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';

import { PurchaseOrderEditSchema } from '@inbound/schemas/purchaseOrderEditSchema';
import { PurchaseOrderRemoveSchema } from '@inbound/schemas/purchaseOrderRemoveSchema';
import { UserSchema } from '@inbound/schemas/userSchema';

export type PODashboardDataRowType = {
  priority?: boolean;
  arrivalTime: Date;
  vendorName: string;
  poNumber: number;
  door?: string;
  location: string;
  lines: number;
  totalLines: number;
  pieces: number;
  totalPices: number;
  commodity: string;
  poType: string;
  skusWithFPS: number;
  totalSkusWithFPS: number;
  users: User[];
  status: string;
};

export type PODashboardDividerRowType = {
  dividerLabel: string | undefined;
  priority: boolean | undefined;
  arrivalTime: Date | undefined;
  vendorName: string | undefined;
  poNumber: number;
  door?: string;
  location: string | undefined;
  lines: number | undefined;
  totalLines: number | undefined;
  pieces: number | undefined;
  totalPices: number | undefined;
  commodity: string | undefined;
  poType: string | undefined;
  skusWithFPS: number | undefined;
  totalSkusWithFPS: number | undefined;
  users: User[] | undefined;
  status: string | undefined;
};

export type PODetailProductRowType = {
  productName: string;
  putLocations: string;
  sku: string;
  partNumber: string;
  lines: number;
  totalLines: number;
  pieces: number;
  totalPices: number;
};

export type PurchaseOrderEditType = z.infer<typeof PurchaseOrderEditSchema>;
export type PurchaseOrderRemoveType = z.infer<typeof PurchaseOrderRemoveSchema>;
export type UserType = z.infer<typeof UserSchema>;
