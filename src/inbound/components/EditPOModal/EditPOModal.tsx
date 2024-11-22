/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Divider,
  FormControl,
  Icon,
  Modal,
  Select,
  Text,
  TextField,
  View,
  classNames,
} from '@az/starc-ui';
import { Close } from '@az/starc-ui-icons';

import { PAGE_URLS } from '@shared/constants/routes';

import { LogError } from '@ofm/classes/LogError';
import { ErrorLogType } from '@ofm/constants/constants';
import { formatErrorLog, getFormInputError } from '@ofm/utils/utils';

import { PriorityToggle } from '@inbound/components/PriorityToggle/PriorityToggle';
import { PurchaseOrderEditType } from '@inbound/types/types';
import { PurchaseOrderEditSchema } from '@inbound/schemas/purchaseOrderEditSchema';
import { YARD, DOOR, LANE, AISLE } from '@inbound/constants/constants';
import { COMMODITY_TYPES, LANES, LOCATION_TYPES } from '@inbound/constants/dataConstants';
import { getFormAlphaNumericInputError } from '@inbound/utils/utils';

import * as T from './EditPOModal.types';
import s from './EditPOModal.module.scss';

export const EditPOModal = ({ isOpen, poData, onClose }: T.Props) => {
  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    reset,
    watch,
    control,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset: poReset,
  } = useForm<PurchaseOrderEditType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(PurchaseOrderEditSchema),
  });

  const locationType = watch('locationType');

  /* Functions */
  const resetForm = () => {
    reset();
    clearErrors();
    onClose();
  };

  const onSubmit = (data: PurchaseOrderEditType) => {
    resetForm();

    const purchaseOrderResult = PurchaseOrderEditSchema.safeParse(data);

    if (!purchaseOrderResult.success) {
      throw new LogError(formatErrorLog(ErrorLogType.ZOD, purchaseOrderResult.error));
    } else {
      navigate(PAGE_URLS.PO_DASHBOARD);
    }
  };

  /* Hooks */
  useEffect(() => {
    poReset(poData);
  }, [poData, poReset]);

  return (
    <Modal open={isOpen} onClose={() => onClose()} className={s['edit-po-modal']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className={s['edit-po-modal__header']}>
          <View direction="column">
            <Text as="h2" size="175" weight="bold" color="primary">
              {t('PODashboard.EditPODetails')}
            </Text>
          </View>
          <Button
            variant="ghost"
            onClick={onClose}
            className={classNames(s['close-icon'], s['edit-po-modal__header__close-button'])}
          >
            <Icon svg={Close} />
          </Button>
        </header>

        <View direction="column" className={s['edit-po-modal__body']}>
          <View.Item>
            <View direction="column" className={s['edit-po-modal__body__section']}>
              <View.Item>
                <Text
                  weight="medium"
                  size="100"
                  className={s['edit-po-modal__body__section__title']}
                >
                  {t('PODashboard.LocationDetails')}
                </Text>
              </View.Item>

              <View.Item>
                <View direction="column" className={s['edit-po-modal__body__section__item']}>
                  <Text
                    weight="medium"
                    size="087"
                    className={s['edit-po-modal__body__form-field-label--required']}
                  >
                    {t('PODashboard.CarrierName')}
                  </Text>
                  <FormControl hasError={!!errors.carrierName}>
                    <TextField inputAttributes={register('carrierName')} defaultValue="" />
                    {errors.carrierName && (
                      <View direction="row" justify="space-between">
                        <FormControl.Error
                          className={s['edit-po-modal__body__form-field-error-messages']}
                        >
                          {getFormAlphaNumericInputError(errors.carrierName.type)}
                        </FormControl.Error>
                      </View>
                    )}
                  </FormControl>
                </View>
              </View.Item>

              <View.Item>
                <View direction="column" className={s['edit-po-modal__body__section__item']}>
                  <Text
                    weight="medium"
                    size="087"
                    className={s['edit-po-modal__body__form-field-label--required']}
                  >
                    {t('PODashboard.TrailerNumber')}
                  </Text>
                  <FormControl hasError={!!errors.trailerNumber}>
                    <TextField inputAttributes={register('trailerNumber')} defaultValue="" />
                    {errors.trailerNumber && (
                      <View direction="row" justify="space-between">
                        <FormControl.Error
                          className={s['edit-po-modal__body__form-field-error-messages']}
                        >
                          {getFormAlphaNumericInputError(errors.trailerNumber.type)}
                        </FormControl.Error>
                      </View>
                    )}
                  </FormControl>
                </View>
              </View.Item>

              <View.Item>
                <View direction="row" gap={3}>
                  <View.Item columns={6}>
                    <View direction="column" className={s['edit-po-modal__body__section__item']}>
                      <Text
                        weight="medium"
                        size="087"
                        className={s['edit-po-modal__body__form-field-label--required']}
                      >
                        {t('PODashboard.LocationType')}
                      </Text>
                      <FormControl hasError={!!errors.locationType}>
                        <Controller
                          control={control}
                          name="locationType"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('PODashboard.LocationType')}
                              placeholder={t('PODashboard.LocationType')}
                              name="locationType"
                              variant="no-label"
                              options={LOCATION_TYPES.map((locationOption) => ({
                                label: locationOption.label,
                                value: locationOption.value,
                              }))}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(locationType) => onChange(locationType?.value)}
                            />
                          )}
                        />
                        {errors.locationType && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error
                              className={s['edit-po-modal__body__form-field-error-messages']}
                            >
                              {getFormInputError(errors.locationType.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>

                  {locationType === LANE && (
                    <View.Item columns={6}>
                      <View direction="column" className={s['edit-po-modal__body__section__item']}>
                        <Text
                          weight="medium"
                          size="087"
                          className={s['edit-po-modal__body__form-field-label--required']}
                        >
                          {t('PODashboard.LaneNumber')}
                        </Text>
                        <FormControl hasError={!!errors.locationType}>
                          <Controller
                            control={control}
                            name="location"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <Select
                                label={t('PODashboard.LaneNumber')}
                                placeholder={t('PODashboard.LaneNumber')}
                                name="location"
                                variant="no-label"
                                options={LANES.map((laneOption) => ({
                                  label: laneOption.label,
                                  value: laneOption.value,
                                }))}
                                required
                                value={{ label: value, value }}
                                inputAttributes={{ onBlur }}
                                onValueChange={(lane) => onChange(lane?.value)}
                              />
                            )}
                          />
                          {errors.locationType && (
                            <View direction="row" justify="space-between">
                              <FormControl.Error
                                className={s['edit-po-modal__body__form-field-error-messages']}
                              >
                                {getFormInputError(errors.locationType.type)}
                              </FormControl.Error>
                            </View>
                          )}
                        </FormControl>
                      </View>
                    </View.Item>
                  )}

                  {locationType && locationType !== LANE && (
                    <View.Item columns={6}>
                      <View direction="column" className={s['edit-po-modal__body__section__item']}>
                        <Text
                          weight="medium"
                          size="087"
                          className={s['edit-po-modal__body__form-field-label--required']}
                        >
                          {locationType === YARD && t('PODashboard.YardNumber')}
                          {locationType === DOOR && t('PODashboard.DoorNumber')}
                          {locationType === AISLE && t('PODashboard.AisleNumber')}
                        </Text>
                        <FormControl hasError={!!errors.location}>
                          <TextField inputAttributes={register('location')} defaultValue="" />
                          {errors.location && (
                            <View direction="row" justify="space-between">
                              <FormControl.Error
                                className={s['edit-po-modal__body__form-field-error-messages']}
                              >
                                {getFormAlphaNumericInputError(errors.location.type)}
                              </FormControl.Error>
                            </View>
                          )}
                        </FormControl>
                      </View>
                    </View.Item>
                  )}
                </View>
              </View.Item>
            </View>
          </View.Item>

          <View.Item>
            <View padding={[6, 0]}>
              <Divider color="300" />
            </View>
          </View.Item>

          <View.Item>
            <View direction="column" className={s['edit-po-modal__body__section']}>
              <View.Item>
                <Text
                  weight="medium"
                  size="100"
                  className={s['edit-po-modal__body__section__title']}
                >
                  {t('PODashboard.CommodityAndReceivingDoor')}
                </Text>
              </View.Item>

              <View.Item>
                <View direction="row" gap={3}>
                  <View.Item columns={6}>
                    <View direction="column" className={s['edit-po-modal__body__section__item']}>
                      <Text
                        weight="medium"
                        size="087"
                        className={s['edit-po-modal__body__form-field-label--required']}
                      >
                        {t('PODashboard.Commodity')}
                      </Text>
                      <FormControl hasError={!!errors.commodity}>
                        <Controller
                          control={control}
                          name="commodity"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('PODashboard.Commodity')}
                              placeholder={t('PODashboard.Commodity')}
                              name="commodity"
                              variant="no-label"
                              options={COMMODITY_TYPES.map((commodityOption) => ({
                                label: commodityOption.label,
                                value: commodityOption.value,
                              }))}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(commodity) => onChange(commodity?.value)}
                            />
                          )}
                        />
                        {errors.locationType && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error
                              className={s['edit-po-modal__body__form-field-error-messages']}
                            >
                              {getFormInputError(errors.locationType.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>

                  <View.Item columns={6}>
                    <View direction="column" className={s['edit-po-modal__body__section__item']}>
                      <Text
                        weight="medium"
                        size="087"
                        className={s['edit-po-modal__body__form-field-label--required']}
                      >
                        {t('PODashboard.ReceivingDoor')}
                      </Text>
                      <FormControl hasError={!!errors.receivingDoor}>
                        <TextField inputAttributes={register('receivingDoor')} defaultValue="" />
                        {errors.receivingDoor && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error
                              className={s['edit-po-modal__body__form-field-error-messages']}
                            >
                              {getFormAlphaNumericInputError(errors.receivingDoor.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                </View>
              </View.Item>
            </View>
          </View.Item>

          <View.Item>
            <View padding={[6, 0]}>
              <Divider color="300" />
            </View>
          </View.Item>

          <View.Item>
            <View direction="column" className={s['edit-po-modal__body__section']}>
              <View.Item>
                <Text
                  weight="medium"
                  size="100"
                  className={s['edit-po-modal__body__section__title']}
                >
                  {t('PODashboard.Priority')}
                </Text>
              </View.Item>

              <View.Item>
                <View direction="column" className={s['edit-po-modal__body__section__item']}>
                  <FormControl hasError={!!errors.priority}>
                    <Controller
                      control={control}
                      name="priority"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View direction="row" gap={4}>
                          <PriorityToggle
                            name="priority"
                            checked={value ? true : false}
                            inputAttributes={{ onBlur }}
                            onValueChange={(priority) => onChange(priority)}
                          />
                          <View justify="center" padding={[2, 0]}>
                            <Text weight="medium" size="087">
                              {t('PODashboard.HighPriorityPurchaseOrder')}
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                    {errors.priority && (
                      <View direction="row" justify="space-between">
                        <FormControl.Error>
                          {getFormInputError(errors.priority.type)}
                        </FormControl.Error>
                      </View>
                    )}
                  </FormControl>
                </View>
              </View.Item>
            </View>
          </View.Item>
        </View>

        <footer className={s['edit-po-modal__footer']}>
          <View
            width="100%"
            direction="row"
            justify="end"
            className={s['edit-po-modal__footer__actions']}
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
            >
              <Text>{t('Update')}</Text>
            </Button>
          </View>
        </footer>
      </form>
    </Modal>
  );
};
