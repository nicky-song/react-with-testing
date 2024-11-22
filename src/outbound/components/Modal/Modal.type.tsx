/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ReactNode } from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  hasHeaderBackButton?: boolean;
  hasCloseButton?: boolean;
  size?: 'large' | 'medium' | 'small' | 'auto';
  title: string;
  subTitle?: string;
  onSuccess?: () => void;
  primaryBtnText?: string;
  isPrimaryBtnDisabled?: boolean;
  isCancelBtn?: boolean;
  children: ReactNode | ReactNode[];
};
