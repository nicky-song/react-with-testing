/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ReactNode } from 'react';
export interface ActionDropdownProps {
  children: ReactNode | ReactNode[];
  isOpen?: boolean | null;
}
