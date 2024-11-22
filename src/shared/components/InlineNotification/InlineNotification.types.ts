/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

type HoldOrderProps = { variant: 'hold-order' };

type HoldStoreProps = { variant: 'hold-store'; suggestedDate: Date };

type QuantityAnomalyProps = {
  variant: 'quantity-anomaly';
  requestedPieces: number;
  part: string;
  averageRequestedPieces: number;
};

type StoreErrorProps = {
  variant: 'store-error';
  timesTried: number;
  date: Date;
};

type CSRErrorProps = {
  variant: 'csr-error';
  timesTried: number;
  date: Date;
};

export type Props =
  | HoldStoreProps
  | HoldOrderProps
  | QuantityAnomalyProps
  | StoreErrorProps
  | CSRErrorProps;
