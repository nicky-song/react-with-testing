/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ReactNode } from 'react';

import type { ClassName } from '@az/starc-ui/dist/types/global';

export interface AccordionProps {
  header: {
    // TO DO: Remove after STARC changes for Accordion accepting Badges as label is done
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label: ReactNode | ReactNode[] | any;
    // TO DO: Remove after STARC changes for Accordion accepting Badges as auxiliaryLabel is done
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auxiliaryLabel: ReactNode | ReactNode[] | any;
  };
  children: ReactNode | ReactNode[];
  open?: boolean;
  className?: ClassName;
}
