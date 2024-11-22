/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { FormControl, Text, TextArea, View } from '@az/starc-ui';

import { ConfirmationCommentModal } from '@shared/components/ConfirmationCommentModal/ConfirmationCommentModal';
import { TextAreaCounter } from '@shared/components/TextAreaCounter/TextAreaCounter';
import { FormLabel } from '@shared/components/FormLabel/FormLabel';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';

import { ReasonDateSchema } from '@ofm/schemas/confirmationModalSchema';
import { getFormInputError, isButtonDisabled } from '@ofm/utils/utils';
import { NOTIFICATION_TYPES } from '@shared/constants/constants';

import { StatusModalProps as Props } from './PODetail.types';

export const PODetailStatusModal = ({ poId, isOpen, isOnHold, setIsOnHold, onClose }: Props) => {
  const { t } = useTranslation();
  const { handleNotification } = useNotificationHandler();

  const triggerAction = async () => {
    setIsOnHold(!isOnHold);
    handleNotification(
      NOTIFICATION_TYPES.SUCCESS,
      isOnHold
        ? t('PODashboard.Notification.RemovePOOnHoldSuccess')
        : t('PODashboard.Notification.PutPOOnHoldSuccess')
    );
  };

  return (
    <>
      {isOpen && (
        <ConfirmationCommentModal
          isOpen={isOpen}
          schema={ReasonDateSchema}
          onClose={(status) => onClose(status)}
          onAction={() => triggerAction()}
        >
          {({ register, formState: { errors }, watch, fieldClassName, errorClassName }) => (
            <>
              <ConfirmationCommentModal.Header>
                <Text as="h2" size="175" weight="bold" color="primary">
                  {t(
                    `ConfirmationComment.${
                      isOnHold ? 'RemovePOFromHoldTitle' : 'PutPOOnHoldTitle'
                    }`,
                    {
                      poId: poId,
                    }
                  )}
                </Text>

                <View padding={[2, 0, 0, 0]}>
                  <Text color="primary" lineHeight="140">
                    {t('ConfirmationComment.PutPOOnHoldSubTitle')}
                  </Text>
                </View>
              </ConfirmationCommentModal.Header>
              <ConfirmationCommentModal.Body>
                <View padding={[6, 0, 0, 0]}>
                  <FormLabel
                    text={t(
                      `ConfirmationComment.${isOnHold ? 'ReasonRemoveFromHold' : 'ReasonPutOnHold'}`
                    )}
                    isRequired
                  />
                </View>
                <View padding={[0, 0, isOnHold ? 0 : 4, 0]} textAlign="end">
                  <FormControl hasError={errors.reason}>
                    <TextArea
                      variant="alt"
                      resize="vertical"
                      id="onhold-reason"
                      label={t('ConfirmationComment.Placeholder')}
                      defaultValue=""
                      inputAttributes={register('reason')}
                      className={fieldClassName}
                    />
                    <View direction="row" justify={errors.reason ? 'space-between' : 'end'}>
                      <FormControl.Error className={errorClassName}>
                        {getFormInputError(errors.reason?.type)}
                      </FormControl.Error>
                      <TextAreaCounter count={watch('reason')?.length} />
                    </View>
                  </FormControl>
                </View>
              </ConfirmationCommentModal.Body>
              <ConfirmationCommentModal.Actions
                cancelText={t('ConfirmationComment.Cancel')}
                actionText={t(`ConfirmationComment.${isOnHold ? 'RemoveOnHold' : 'PutOnHold'}`)}
                disabled={isButtonDisabled(watch('reason')) || errors.reason}
              />
            </>
          )}
        </ConfirmationCommentModal>
      )}
    </>
  );
};
