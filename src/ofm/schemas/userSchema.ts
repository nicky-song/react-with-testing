/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';
import { SimpleUserSchema } from './simpleUserSchema';
import { WarehouseSchema } from './warehouseSchema';
import { UserRoleSchema } from './userRoleSchema';
import { FavoriteOptionSchema } from './favoriteOptionSchema';

export const UserSchema = SimpleUserSchema.merge(
  z.object({
    warehouses: z.array(WarehouseSchema),
    roles: z.array(UserRoleSchema),
    favoriteOptions: z.array(FavoriteOptionSchema),
  })
);
