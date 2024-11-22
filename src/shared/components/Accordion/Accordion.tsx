/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Accordion as StarcAccordion } from '@az/starc-ui';
import { AccordionProps } from './Accordion.types';
import styles from './Accordion.module.scss';

export const Accordion = ({ header, children, ...props }: AccordionProps) => {
  return (
    // TODO: pending className prop from AZ side
    <StarcAccordion className={styles['root']} headerOptions={header} {...props}>
      {children}
    </StarcAccordion>
  );
};
