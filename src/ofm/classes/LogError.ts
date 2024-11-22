/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ErrorLogType, LogSource } from '@ofm/constants/constants';
import { LogType } from '@ofm/types/types';

export class LogError extends Error {
  timestamp: Date;
  id: number;
  details: unknown;
  type: ErrorLogType;
  code?: number;
  source: LogSource.UI;

  constructor(error: LogType) {
    super(error.type);
    this.id = error.id;
    this.timestamp = error.timestamp;
    this.details = error.details;
    this.code = error.code;
    this.type = error.type;
    this.source = error.source;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
