/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ReactNode } from 'react';

export type DetailRow = {
  label: string;
  text: string | string[];
  isMandatory?: boolean;
  children?: ReactNode;
  buttonText?: string;
  onClick?: () => void;
};

// TODO: Change storeDetails prop to general Store type once BFF is set up
export type DetailsSectionProps = {
  header: string;
  rows: DetailRow[];
  children?: ReactNode;
  loading?: ReactNode;
};

export type CustomTextProps = {
  text: string;
  buttonText?: string;
  onClick?: () => void;
  index?: number;
};
