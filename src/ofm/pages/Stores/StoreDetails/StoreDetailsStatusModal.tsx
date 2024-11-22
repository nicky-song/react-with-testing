/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Dispatch, SetStateAction } from 'react';
import { DatePicker, FormControl, Text, TextArea, View } from '@az/starc-ui';
import { LogError } from '@ofm/classes/LogError';
import { ConfirmationCommentModal } from '@shared/components/ConfirmationCommentModal/ConfirmationCommentModal';
import { TextAreaCounter } from '@shared/components/TextAreaCounter/TextAreaCounter';
import { BFF_REQUEST_DATE_FORMAT, ErrorLogType, StoreStatus } from '@ofm/constants/constants';
import { ReasonDateSchema } from '@ofm/schemas/confirmationModalSchema';
import { usePostStoreStatus } from '@ofm/services/hooks/usePostStoreStatus';
import {
  formatErrorLog,
  getFormDateError,
  getFormInputError,
  isButtonDisabled,
} from '@ofm/utils/utils';
import { Controller } from 'react-hook-form';
import { ReasonDateType, StoreDetailsType } from '@ofm/types/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FormLabel } from '@shared/components/FormLabel/FormLabel';
import { useTranslation } from 'react-i18next';
dayjs.extend(customParseFormat);

type Props = {
  storeId: string;
  isOpen: boolean;
  isOnHold: boolean;
  setIsOnHold: Dispatch<SetStateAction<boolean>>;
  setStoreData: Dispatch<SetStateAction<StoreDetailsType | undefined>>;
  onClose: () => void;
};

export const StoreDetailsStatusModal = ({
  storeId,
  isOpen,
  isOnHold,
  setIsOnHold,
  setStoreData,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const { mutateStoreStatus } = usePostStoreStatus();

  const handleStoreStatusUpdate = (message: string, date?: string) => {
    mutateStoreStatus(
      {
        storeId,
        status: isOnHold ? StoreStatus.ACTIVE : StoreStatus.ON_HOLD,
        endDate: date
          ? dayjs(date, t('DateFormat.Short')).format(BFF_REQUEST_DATE_FORMAT)
          : undefined,
        message: message.trim(),
      },
      {
        onSuccess: (resp) => {
          if (resp) {
            setIsOnHold(!isOnHold);
            setStoreData(resp);
          }
        },
      }
    );
  };

  const triggerAction = async (data: ReasonDateType) => {
    const reasonDateResult = ReasonDateSchema.safeParse(data);

    if (!reasonDateResult.success) {
      throw new LogError(formatErrorLog(ErrorLogType.ZOD, reasonDateResult.error));
    } else {
      handleStoreStatusUpdate(reasonDateResult.data.reason, reasonDateResult.data.date);
    }
  };

  return (
    <>
      {isOpen && (
        <ConfirmationCommentModal
          isOpen={isOpen}
          schema={ReasonDateSchema}
          onClose={onClose}
          onAction={(data) => triggerAction(data as ReasonDateType)}
        >
          {({
            control,
            register,
            formState: { errors },
            watch,
            fieldClassName,
            errorClassName,
          }) => (
            <>
              <ConfirmationCommentModal.Header>
                <Text as="h2" size="175" weight="bold" color="primary">
                  {t(`ConfirmationComment.${isOnHold ? 'RemoveFromHoldTitle' : 'PutOnHoldTitle'}`, {
                    store: storeId,
                  })}
                </Text>
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
                {!isOnHold && (
                  <>
                    <FormControl hasError={errors.date}>
                      <Controller
                        control={control}
                        name="date"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <DatePicker
                            id="date-picker"
                            value={value}
                            dateFormat={t('DateFormat.Short')}
                            label={t('ConfirmationComment.DatePlaceholder')}
                            inputAttributes={{ ref, onBlur }}
                            onValueChange={(date) => onChange(date)}
                            className={fieldClassName}
                          />
                        )}
                      />
                      <View padding={[errors.date ? 2 : 0, 0, 0, 0]}>
                        <FormControl.Error className={errorClassName}>
                          {getFormDateError(errors.date?.type)}
                        </FormControl.Error>
                      </View>
                    </FormControl>
                    <View padding={[1, 0, 0, 0]} textAlign="center">
                      <Text color="500" size="087">
                        {t('ConfirmationComment.DateMessage')}
                      </Text>
                    </View>
                  </>
                )}
              </ConfirmationCommentModal.Body>
              <ConfirmationCommentModal.Actions
                cancelText={t('ConfirmationComment.Cancel')}
                actionText={t(`ConfirmationComment.${isOnHold ? 'RemoveOnHold' : 'PutOnHold'}`)}
                disabled={isButtonDisabled(watch('reason'))}
              />
            </>
          )}
        </ConfirmationCommentModal>
      )}
    </>
  );
};
