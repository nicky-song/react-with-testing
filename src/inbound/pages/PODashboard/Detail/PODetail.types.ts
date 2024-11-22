/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Dispatch, SetStateAction } from 'react';

export type StatusModalProps = {
  poId: number;
  isOpen: boolean;
  isOnHold: boolean;
  setIsOnHold: Dispatch<SetStateAction<boolean>>;
  onClose: (status: string | null) => void;
};

export type RemoveModalProps = {
  poId: number;
  isOpen: boolean;
  onClose: () => void;
};
