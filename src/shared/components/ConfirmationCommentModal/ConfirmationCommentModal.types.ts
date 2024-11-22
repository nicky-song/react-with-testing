/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { SchemaOptions } from '@ofm/schemas/confirmationModalSchema';
import { ReactNode } from 'react';

// Added a dynamic type since the form can take n amount of schemas
type DynamicType = any;

interface FormModalChildrenProps {
  control: DynamicType;
  register: DynamicType;
  formState: DynamicType;
  watch: DynamicType;
  fieldClassName?: string;
  errorClassName?: string;
}

export type Props = {
  isOpen: boolean;
  schema: SchemaOptions;
  onClose: (status: string | null) => void;
  onAction?: (data: unknown) => void;
  children: ({ ...props }: FormModalChildrenProps) => ReactNode;
};

export type SectionProps = {
  children?: ReactNode;
  className?: string;
};

export type ActionProps = SectionProps & {
  cancelText?: string;
  hideCancel?: boolean;
  actionText: string;
  disabled?: boolean;
  onAction?: () => void;
};

export type RenderSection = (args: {
  className?: string;
  child: DynamicType;
  index: number;
}) => ReactNode;
