/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { z } from 'zod';

export const SimpleUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  jobTitle: z.string(),
  profilePictureUrl: z
    .string()
    .nullish()
    .transform((url) => url ?? undefined),
});
