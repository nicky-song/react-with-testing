/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useSessionStorage } from '@shared/hooks/useStorage.ts';
import { SESSION_DC_ID_KEY } from '@shared/constants/storageConstants.ts';
import { z } from 'zod';
import { ConsolidationLocationSchema } from '@mdm/schemas/consolidationLocationSchema.ts';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { getFormFieldIndexByKey } from '@mdm/utils/form/formUtils.tsx';
import { SUBZONE_TABLE_ROWS, ZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { FormControl, Select, Text, TextField, View } from '@az/starc-ui';
import styles from '@mdm/pages/RDM/LocationManager/ConsolidationLocation/Detail/ConsolidationLocationDetail.module.scss';
import { FormLabel } from '@shared/components/FormLabel/FormLabel.tsx';
import { getFormInputError } from '@ofm/utils/utils.ts';
import { displayAttributeFieldValidationMessage } from '@mdm/utils/form/validationUtils.tsx';
import {
  CONSOLIDATION_STATUS_OPTIONS,
  DEFAULT_DIMENSION_UNIT,
  LOCATION_TYPES,
} from '@mdm/constants/constants.ts';

export const ConsolidationLocationDetailForm = () => {
  /* State variables */
  const [selectedDC] = useSessionStorage<string>(SESSION_DC_ID_KEY);

  /* Constants */
  type FormData = z.infer<typeof ConsolidationLocationSchema>;
  const { t } = useTranslation();

  const {
    control,
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext<FormData>();

  const selectedZoneId = watch('zoneName');

  return (
    <View>
      <form>
        <View direction="row" gap={4}>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel text={t('Warehouse')} isRequired={true} />
              <FormControl>
                <Select
                  label={t('Warehouse')}
                  name="warehouse"
                  variant="no-label"
                  defaultValue={{
                    label: 'DC ' + selectedDC?.toString(),
                    value: 'DC ' + selectedDC?.toString(),
                  }}
                  options={[]}
                  disabled
                />
              </FormControl>
              <Text weight="regular" color="600" size="087">
                {t('ConsolidationLocationDetails.WarehouseInstruction')}
              </Text>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel
                text={t('ConsolidationLocationDetails.ZoneName.Label')}
                isRequired={true}
              />
              <FormControl hasError={!!errors.zoneName}>
                <Controller
                  control={control}
                  name="zoneName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label={t('ConsolidationLocationDetails.ZoneName.Placeholder')}
                      placeholder={t('ConsolidationLocationDetails.ZoneName.Placeholder')}
                      name="zoneName"
                      variant="no-label"
                      options={ZONE_TABLE_ROWS.map((zone) => ({
                        label: zone.zoneId,
                        value: zone.zoneId,
                      }))}
                      required
                      value={{ label: value, value }}
                      inputAttributes={{ onBlur }}
                      onValueChange={(zoneName) => onChange(zoneName?.value)}
                    />
                  )}
                />
                {errors.zoneName && (
                  <View direction="row" justify="space-between">
                    <FormControl.Error>{getFormInputError(errors.zoneName.type)}</FormControl.Error>
                  </View>
                )}
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel
                text={t('ConsolidationLocationDetails.SubzoneName.Label')}
                isRequired={true}
              />
              <FormControl hasError={!!errors.subzoneName}>
                <Controller
                  control={control}
                  name="subzoneName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label={t('ConsolidationLocationDetails.SubzoneName.Placeholder')}
                      name="subzoneName"
                      variant="no-label"
                      disabled={!selectedZoneId}
                      options={SUBZONE_TABLE_ROWS.map((zone) => ({
                        label: zone.name,
                        value: zone.name,
                      }))}
                      required
                      value={{ label: value, value }}
                      inputAttributes={{ onBlur }}
                      onValueChange={(zoneName) => onChange(zoneName?.value)}
                    />
                  )}
                />
                {errors.subzoneName && (
                  <View direction="row" justify="space-between">
                    <FormControl.Error>
                      {getFormInputError(errors.subzoneName.type)}
                    </FormControl.Error>
                  </View>
                )}
              </FormControl>
            </View>
          </View.Item>
        </View>

        <View
          direction="row"
          gap={4}
          className={styles['consolidation-location-detail__form-field-section']}
        >
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel
                text={t('ConsolidationLocationDetails.LocationType.Label')}
                isRequired={true}
              />
              <FormControl
                hasError={
                  !!(
                    errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'locationType')
                    )
                  )
                }
              >
                <Controller
                  control={control}
                  name={`attributes.${getFormFieldIndexByKey(
                    getValues()['attributes'],
                    'locationType'
                  )}.value`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label={t('ConsolidationLocationDetails.LocationType.Placeholder')}
                      variant="no-label"
                      options={LOCATION_TYPES.map((type) => ({
                        label: type.label,
                        value: type.value,
                      }))}
                      value={{ label: value, value: value }}
                      inputAttributes={{ onBlur }}
                      onValueChange={(locationType) => onChange(locationType?.label)}
                    />
                  )}
                />

                <FormControl.Error>
                  {errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'locationType')
                    )}
                </FormControl.Error>
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel
                text={t('ConsolidationLocationDetails.ConsolidationLocationId.Label')}
                isRequired={true}
              />
              <FormControl hasError={!!errors.locationId}>
                <TextField
                  inputAttributes={{
                    placeholder: t(
                      'ConsolidationLocationDetails.ConsolidationLocationId.Placeholder'
                    ),
                    ...register('locationId'),
                  }}
                  defaultValue=""
                />
                {errors.locationId && (
                  <View direction="row" justify="space-between">
                    <FormControl.Error>
                      {getFormInputError(errors.locationId.type)}
                    </FormControl.Error>
                  </View>
                )}
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel text={t('ConsolidationLocationDetails.Status.Label')} isRequired={true} />
              <FormControl
                hasError={
                  !!(
                    errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'status')
                    )
                  )
                }
              >
                <Controller
                  control={control}
                  name={`attributes.${getFormFieldIndexByKey(
                    getValues()['attributes'],
                    'status'
                  )}.value`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label={t('ConsolidationLocationDetails.Status.Placeholder')}
                      variant="no-label"
                      options={CONSOLIDATION_STATUS_OPTIONS.map((type) => ({
                        label: type.label,
                        value: type.value,
                      }))}
                      value={{ label: value, value: value }}
                      inputAttributes={{ onBlur }}
                      onValueChange={(status) => onChange(status?.label)}
                    />
                  )}
                />

                <FormControl.Error>
                  {errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'status')
                    )}
                </FormControl.Error>
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel text={t('ConsolidationLocationDetails.Order.Label')} />
              <FormControl
                hasError={
                  !!(
                    errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'order')
                    )
                  )
                }
              >
                <TextField
                  defaultValue=""
                  inputAttributes={register(
                    `attributes.${getFormFieldIndexByKey(getValues()['attributes'], 'order')}.value`
                  )}
                />
                <FormControl.Error>
                  {errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'order')
                    )}
                </FormControl.Error>
              </FormControl>
            </View>
          </View.Item>
        </View>
        <View
          direction="row"
          gap={4}
          className={styles['consolidation-location-detail__form-field-section']}
        >
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel text={t('ConsolidationLocationDetails.Height.Label')} isRequired={true} />
              <FormControl
                hasError={
                  !!(
                    errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'height')
                    )
                  )
                }
              >
                <TextField
                  defaultValue=""
                  inputAttributes={register(
                    `attributes.${getFormFieldIndexByKey(
                      getValues()['attributes'],
                      'height'
                    )}.value`
                  )}
                  endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                />
                <FormControl.Error>
                  {errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'height')
                    )}
                </FormControl.Error>
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel text={t('ConsolidationLocationDetails.Width.Label')} isRequired={true} />
              <FormControl
                hasError={
                  !!(
                    errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'width')
                    )
                  )
                }
              >
                <TextField
                  defaultValue=""
                  inputAttributes={register(
                    `attributes.${getFormFieldIndexByKey(getValues()['attributes'], 'width')}.value`
                  )}
                  endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                />
                <FormControl.Error>
                  {errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'width')
                    )}
                </FormControl.Error>
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel text={t('ConsolidationLocationDetails.Depth.Label')} isRequired={true} />
              <FormControl
                hasError={
                  !!(
                    errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'depth')
                    )
                  )
                }
              >
                <TextField
                  defaultValue=""
                  inputAttributes={register(
                    `attributes.${getFormFieldIndexByKey(getValues()['attributes'], 'depth')}.value`
                  )}
                  endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                />
                <FormControl.Error>
                  {errors.attributes &&
                    displayAttributeFieldValidationMessage(
                      errors,
                      getFormFieldIndexByKey(getValues()['attributes'], 'depth')
                    )}
                </FormControl.Error>
              </FormControl>
            </View>
          </View.Item>
        </View>

        <View
          direction="row"
          gap={4}
          className={styles['consolidation-location-detail__form-field-section']}
        >
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel
                text={`${t('ConsolidationLocationDetails.DocumentPrinterLocation.Label')} (${t(
                  'Optional'
                )})`}
              />
              <FormControl>
                <Controller
                  control={control}
                  name={`attributes.${getFormFieldIndexByKey(
                    getValues()['attributes'],
                    'documentPrinterLocation'
                  )}.value`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label={t('ConsolidationLocationDetails.DocumentPrinterLocation.Placeholder')}
                      variant="no-label"
                      options={[]}
                      required
                      value={{ label: value, value }}
                      inputAttributes={{ onBlur }}
                      onValueChange={(zoneName) => onChange(zoneName?.value)}
                    />
                  )}
                />
              </FormControl>
            </View>
          </View.Item>
          <View.Item columns={{ s: 12, l: 3 }}>
            <View gap={2}>
              <FormLabel
                text={`${t('ConsolidationLocationDetails.LabelPrinterLocation.Label')} (${t(
                  'Optional'
                )})`}
              />
              <FormControl>
                <Controller
                  control={control}
                  name={`attributes.${getFormFieldIndexByKey(
                    getValues()['attributes'],
                    'labelPrinterLocation'
                  )}.value`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      label={t('ConsolidationLocationDetails.LabelPrinterLocation.Placeholder')}
                      variant="no-label"
                      options={[]}
                      required
                      value={{ label: value, value }}
                      inputAttributes={{ onBlur }}
                      onValueChange={(zoneName) => onChange(zoneName?.value)}
                    />
                  )}
                />
              </FormControl>
            </View>
          </View.Item>
        </View>
      </form>
    </View>
  );
};
