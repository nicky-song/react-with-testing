/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useNotification } from '@az/starc-ui';
import { useCallback, useEffect, useRef } from 'react';
import { ActionNotificationType, CtaNotificationType } from '@ofm/types/types';
import { WMSNotification } from '@shared/components/Notification/Notification';

export const useNotificationHandler = () => {
  const notification = useNotification();
  const notificationRef = useRef<string | null>(null);

  const handleNotification = useCallback(
    (
      type: ActionNotificationType,
      notificationTitle?: string,
      notificationText?: string,
      ctaType?: CtaNotificationType,
      ctaLabel?: string,
      ctaOnClick?: () => void
    ) => {
      if (notificationRef.current !== null) {
        notification.hide(notificationRef.current);
      }

      const notificationType = {
        snack: WMSNotification.snack,
        success: WMSNotification.success,
        error: WMSNotification.error,
        warning: WMSNotification.warning,
      }[type];

      const id = notification.show({
        ...notificationType,
        title: notificationTitle,
        text: notificationText,
        position: 'bottom-end',
        hasCloseButton: true,
        closeButtonTitle: 'close',
        onClose: () => notification.hide(id),
        ctaType,
        ctaLabel,
        ctaOnClick,
      });

      notificationRef.current = id;
    },
    [notification]
  );

  useEffect(() => {
    return () => {
      if (notificationRef.current !== null) {
        notification.hide(notificationRef.current);
      }
    };
  }, [notification]);

  return { handleNotification };
};
