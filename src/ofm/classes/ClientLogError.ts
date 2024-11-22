/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ErrorLogType } from '@ofm/constants/constants';
import { ClientLogType } from '@ofm/types/types';

export class ClientLogError extends Error {
  timestamp: Date;
  type: ErrorLogType;
  id: number;

  constructor(error: ClientLogType) {
    super(error.type);
    this.timestamp = error.timestamp;
    this.type = error.type;
    this.id = error.id;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
