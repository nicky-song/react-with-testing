/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import type { DrawerProps as StarcDrawerProps } from '@az/starc-ui';
import { UseFormHandleSubmit } from 'react-hook-form';

interface DrawerSharedProps extends Omit<StarcDrawerProps, 'size' | 'open' | 'onClose'> {
  show: boolean;
  headerTitle?: string;
  headerDescription?: string;
  CustomHeader?: React.ReactNode;
  primaryButtonText?: string;
  primaryButtonHandler?: () => void;
  shouldPrimaryButtonSubmit?: boolean;
  handleSubmit?: UseFormHandleSubmit<{ fullName: string }, undefined>;
  isPrimaryButtonDisabled?: boolean;
  secondaryButtonText?: string;
  secondaryButtonHandler?: () => void;
  isSecondaryButtonDisabled?: boolean;
  className?: string;
  contentClassName?: string;
  handleClose: () => void;
  removeInnerPadding?: boolean;
  previousButtonVariant?: 'primary' | 'secondary' | 'super' | 'tertiary' | 'ghost';
  isLoading?: boolean;
  hasNoItems?: boolean; // TODO: remove prop once the Orders are integrated with the backend
}

export interface DrawerProps extends DrawerSharedProps {
  size: 'large' | 'medium' | 'custom';
  previousLinkText?: string;
  previousButtonHandler?: () => void;
  nextLinkText?: string;
  nextButtonHandler?: () => void;
}

export interface DrawerPropsVariant extends DrawerSharedProps {
  size: 'small' | 'custom';
  previousLinkText?: never;
  nextLinkText?: never;
  previousButtonHandler?: never;
  nextButtonHandler?: never;
}
