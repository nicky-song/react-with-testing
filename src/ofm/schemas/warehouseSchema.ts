/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const WarehouseSchema = z.object({ id: z.string(), name: z.string(), country: z.string() });
