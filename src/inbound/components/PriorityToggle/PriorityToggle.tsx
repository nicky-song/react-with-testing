/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { classNames, Toggle } from '@az/starc-ui';

import { PriorityToggleProps } from './PriorityToggle.types';
import styles from './PriorityToggle.module.scss';

export const PriorityToggle = ({ className, ...props }: PriorityToggleProps) => {
  return <Toggle className={classNames(styles['priority-toggle'], className)} {...props} />;
};
