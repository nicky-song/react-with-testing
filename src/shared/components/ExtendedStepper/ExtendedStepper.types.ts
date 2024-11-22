/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { StepperProps } from '@az/starc-ui';

type BaseProps = {
  withButtons?: boolean;
  maxTextValue?: number;
  isEditable?: boolean;
  isValueRounded?: boolean;
  correctOnBlur?: boolean;
  helperText?: string;
  errorText?: string;
};

export type Props = BaseProps & (StepperProps | undefined);
