/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  CheckmarkCircle,
  InfoCircle,
  ExclamationTriangle,
  ExclamationCircle,
} from '@az/starc-ui-icons';

export const WMSNotification = {
  snack: {
    type: 'custom',
    customNotification: {
      svg: InfoCircle,
      iconColor: 'on-primary',
      color: 'on-primary',
      style: 'inline',
      bgColor: '500',
      borderRadius: 'small',
      closeColor: 'on-primary',
    },
  },
  error: {
    type: 'custom',
    customNotification: {
      svg: ExclamationTriangle,
      iconColor: 'on-primary',
      color: 'on-primary',
      style: 'inline',
      bgColor: 'error',
      borderRadius: 'small',
      closeColor: 'on-primary',
    },
  },
  warning: {
    type: 'custom',
    customNotification: {
      svg: ExclamationTriangle,
      iconColor: 'primary',
      color: 'primary',
      style: 'inline',
      bgColor: 'warning',
      borderRadius: 'small',
    },
  },
  success: {
    type: 'custom',
    customNotification: {
      svg: CheckmarkCircle,
      iconColor: 'on-primary',
      color: 'on-primary',
      style: 'inline',
      bgColor: 'success',
      borderRadius: 'small',
      closeColor: 'on-primary',
    },
  },
} as const;

export const WMSInlineNotification = {
  info: {
    type: 'custom',
    customNotification: {
      svg: InfoCircle,
      iconColor: 'focus',
      color: 'primary',
      bgColor: 'blue-50',
      barColor: 'focus',
    },
  },
  warning: {
    type: 'custom',
    customNotification: {
      svg: ExclamationTriangle,
      iconColor: 'yellow-100',
      color: 'primary',
      bgColor: 'yellow-50',
      barColor: 'yellow-100',
    },
  },
  error: {
    type: 'custom',
    customNotification: {
      svg: ExclamationCircle,
      iconColor: 'error',
      color: 'primary',
      bgColor: 'red-50',
      barColor: 'error',
    },
  },
  snack: {
    type: 'custom',
    customNotification: {
      svg: ExclamationTriangle,
      closeColor: 'on-primary',
      color: 'on-primary',
      bgColor: '500',
      iconColor: 'yellow-100',
    },
  },
} as const;
