/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { UserSchema } from '@ofm/schemas/userSchema';
import { z } from 'zod';

export type UserAtomType = z.infer<typeof UserSchema> | undefined;
