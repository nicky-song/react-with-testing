/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

export type ShipmentMasterCardTypes = {
  trailer: string;
  route: string;
  trailerDispatchTime: Date;
  hazmat?: string;
  dispatchTime?: string;
  numberLoaded: number;
  totalLoaded: number;
  status: string;
  priority?: boolean;
  users?: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
};

export type SHIPMENT_TIME_TYPES = {
  label: string;
  value: string;
  fullForm: string;
};
