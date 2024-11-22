/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const PingUserSchema = z.object({
  sub: z.string(),
  mail: z.string(),
  givenName: z.string(),
  sn: z.string(),
});
