/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Actionable,
  Button,
  FormControl,
  Icon,
  Modal,
  Text,
  TextArea,
  TextField,
  View,
  classNames,
} from '@az/starc-ui';
import { Close, PasswordHidden, PasswordShow } from '@az/starc-ui-icons';

import { PAGE_URLS } from '@shared/constants/routes';
import { INPUT_TYPES, MAX_REASON_LENGTH } from '@shared/constants/constants';
import { TextAreaCounter } from '@shared/components/TextAreaCounter/TextAreaCounter';

import { LogError } from '@ofm/classes/LogError';
import { ErrorLogType } from '@ofm/constants/constants';
import { formatErrorLog, getFormInputError, isButtonDisabled } from '@ofm/utils/utils';

import { PurchaseOrderRemoveType } from '@inbound/types/types';
import { PurchaseOrderRemoveSchema } from '@inbound/schemas/purchaseOrderRemoveSchema';

import * as T from './RemovePOModal.types';
import s from './RemovePOModal.module.scss';
import { getFormAlphaNumericInputError } from '@inbound/utils/utils';

export const RemovePOModal = ({ isOpen, onClose }: T.Props) => {
  /* Constants */
  const [passwordFieldType, setPasswordFieldType] = useState<string>(INPUT_TYPES.PASSWORD);
  const [isValidAutoZoneId, setIsValidAutoZoneId] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    reset,
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseOrderRemoveType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(PurchaseOrderRemoveSchema),
  });

  /* Functions */
  const togglePasswordFieldType = () => {
    if (passwordFieldType === INPUT_TYPES.PASSWORD) {
      setPasswordFieldType(INPUT_TYPES.TEXT);
    } else {
      setPasswordFieldType(INPUT_TYPES.PASSWORD);
    }
  };

  const resetForm = () => {
    reset();
    clearErrors();
    onClose();
  };

  const onSubmit = (data: PurchaseOrderRemoveType) => {
    const purchaseOrderRemoveResult = PurchaseOrderRemoveSchema.safeParse(data);

    if (!purchaseOrderRemoveResult.success) {
      throw new LogError(formatErrorLog(ErrorLogType.ZOD, purchaseOrderRemoveResult.error));
    } else {
      setIsValidAutoZoneId(true);
      setIsValidPassword(true);

      // @todo : This need to be replaced when backend integration for user validation added
      if (data.autoZoneId !== '12345678') {
        setIsValidAutoZoneId(false);
      } else if (data.password !== 'password') {
        setIsValidAutoZoneId(true);
        setIsValidPassword(false);
      } else {
        resetForm();
        navigate(PAGE_URLS.PO_DASHBOARD);
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={() => onClose()} className={s['remove-po-modal']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <View direction="column" className={s['remove-po-modal__form-wrapper']}>
          <header className={s['remove-po-modal__header']}>
            <View direction="column">
              <Text as="h2" size="175" weight="bold" color="primary">
                {t('PODashboard.RemovePO.Title')}
              </Text>
              <View padding={[2, 0, 0, 0]}>
                <Text color="primary" lineHeight="140">
                  {t('PODashboard.RemovePO.SubTitle')}
                </Text>
              </View>
            </View>
            <Button
              variant="ghost"
              onClick={onClose}
              className={classNames(s['close-icon'], s['remove-po-modal__header__close-button'])}
            >
              <Icon svg={Close} />
            </Button>
          </header>

          <View direction="column" className={s['remove-po-modal__body']}>
            <View.Item>
              <View direction="column" className={s['remove-po-modal__body__section']}>
                <View.Item>
                  <View direction="column" className={s['remove-po-modal__body__section__item']}>
                    <Text
                      weight="medium"
                      size="087"
                      className={s['remove-po-modal__body__form-field-label--required']}
                    >
                      {t('Auth.AutoZoneID')}
                    </Text>
                    <FormControl hasError={!!errors.autoZoneId || !isValidAutoZoneId}>
                      <TextField
                        inputAttributes={register('autoZoneId')}
                        defaultValue=""
                        label={t('Auth.EnterYourAutoZoneID')}
                      />
                      {errors.autoZoneId && (
                        <View direction="row" justify="space-between">
                          <FormControl.Error
                            className={s['remove-po-modal__body__form-field-error-messages']}
                          >
                            {getFormAlphaNumericInputError(errors.autoZoneId.type)}
                          </FormControl.Error>
                        </View>
                      )}
                      {!errors.autoZoneId && !isValidAutoZoneId && (
                        <View direction="row" justify="space-between">
                          <View className={s['remove-po-modal__body__form-field-error-messages']}>
                            <Text size="087" lineHeight="140" color="error">
                              {t('Auth.AutoZoneIDDoesNotExists')}
                            </Text>
                          </View>
                        </View>
                      )}
                    </FormControl>
                  </View>
                </View.Item>

                <View.Item>
                  <View direction="column" className={s['remove-po-modal__body__section__item']}>
                    <Text
                      weight="medium"
                      size="087"
                      className={s['remove-po-modal__body__form-field-label--required']}
                    >
                      {t('Auth.Password')}
                    </Text>
                    <FormControl hasError={!!errors.password || !isValidPassword}>
                      <TextField
                        inputAttributes={register('password')}
                        defaultValue=""
                        type={passwordFieldType}
                        label={t('Auth.EnterYourPassword')}
                        endElement={
                          <View direction="row" gap={4}>
                            <Actionable onClick={() => togglePasswordFieldType()}>
                              <Icon
                                key={passwordFieldType}
                                svg={
                                  passwordFieldType === INPUT_TYPES.PASSWORD
                                    ? PasswordShow
                                    : PasswordHidden
                                }
                                size={6}
                                color="on-secondary"
                              />
                            </Actionable>
                          </View>
                        }
                      />
                      {errors.password && (
                        <View direction="row" justify="space-between">
                          <FormControl.Error
                            className={s['remove-po-modal__body__form-field-error-messages']}
                          >
                            {getFormAlphaNumericInputError(errors.password.type)}
                          </FormControl.Error>
                        </View>
                      )}
                      {!errors.password && !isValidPassword && (
                        <View direction="row" justify="space-between">
                          <View className={s['remove-po-modal__body__form-field-error-messages']}>
                            <Text size="087" lineHeight="140" color="error">
                              {t('Auth.PasswordIsIncorrect')}
                            </Text>
                          </View>
                        </View>
                      )}
                    </FormControl>
                  </View>
                </View.Item>

                <View.Item>
                  <View direction="column" className={s['remove-po-modal__body__section__item']}>
                    <Text
                      weight="medium"
                      size="087"
                      className={s['remove-po-modal__body__form-field-label--required']}
                    >
                      {t('PODashboard.RemovePO.Reason')}
                    </Text>

                    <FormControl hasError={!!errors.reason}>
                      <TextArea
                        variant="alt"
                        resize="vertical"
                        id="remove-reason"
                        label={t('ConfirmationComment.Placeholder')}
                        defaultValue=""
                        inputAttributes={register('reason')}
                      />

                      <View direction="row" justify={errors.reason ? 'space-between' : 'end'}>
                        {errors.reason && (
                          <FormControl.Error
                            className={s['remove-po-modal__body__form-field-error-messages']}
                          >
                            {getFormInputError(errors.reason?.type, MAX_REASON_LENGTH)}
                          </FormControl.Error>
                        )}

                        <TextAreaCounter
                          count={watch('reason')?.length}
                          maxCount={MAX_REASON_LENGTH}
                        />
                      </View>
                    </FormControl>
                  </View>
                </View.Item>
              </View>
            </View.Item>
          </View>

          <footer className={s['remove-po-modal__footer']}>
            <View
              width="100%"
              direction="row"
              justify="end"
              className={s['remove-po-modal__footer__actions']}
            >
              <Button
                variant="secondary"
                attributes={{ style: { width: 'fit-content' } }}
                onClick={onClose}
              >
                <Text>{t('Cancel')}</Text>
              </Button>

              <Button
                variant="primary"
                attributes={{ style: { width: 'fit-content' } }}
                type="submit"
                disabled={
                  isButtonDisabled(watch('autoZoneId')) ||
                  isButtonDisabled(watch('password')) ||
                  isButtonDisabled(watch('reason'))
                }
              >
                <Text>{t('PODashboard.RemovePO.ActionText')}</Text>
              </Button>
            </View>
          </footer>
        </View>
      </form>
    </Modal>
  );
};
