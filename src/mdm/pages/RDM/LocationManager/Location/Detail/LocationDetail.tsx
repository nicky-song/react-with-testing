/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailsSectionSkeleton } from '@shared/components/Skeletons/DetailsSectionSkeleton.tsx';
import {
  Accordion,
  Actionable,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  FormControl,
  Link,
  Radio,
  Select,
  Text,
  TextField,
  View,
} from '@az/starc-ui';
import { z } from 'zod';

import styles from '@mdm/pages/RDM/LocationManager/Location/Detail/LocationDetail.module.scss';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';
import { PAGE_URLS } from '@shared/constants/routes.ts';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.tsx';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBreadcrumb } from '@mdm/hooks/useBreadcrumb.ts';
import { LocationSchema } from '@mdm/schemas/locationSchema.ts';
import { useSessionStorage } from '@shared/hooks/useStorage.ts';
import { SESSION_DC_ID_KEY } from '@shared/constants/storageConstants.ts';
import { FormLabel } from '@shared/components/FormLabel/FormLabel.tsx';
import { LOCATION_TABLE_ROWS, SUBZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { getFormDefaults, getFormFieldIndexByKey } from '@mdm/utils/form/formUtils.tsx';
import { DEFAULT_DIMENSION_UNIT, FIELD_EVENT } from '@mdm/constants/constants.ts';
import { generateDateString, getFormInputError } from '@ofm/utils/utils.ts';
import { displayAttributeFieldValidationMessage } from '@mdm/utils/form/validationUtils';

export const LocationDetail = () => {
  /* State variables */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* Constants */
  type FormData = z.infer<typeof LocationSchema>;
  const [selectedDC] = useSessionStorage<string>(SESSION_DC_ID_KEY);
  const { t } = useTranslation();
  const { locationId } = useParams();
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumb(locationId ? PAGE_URLS.LOCATION_CREATE : '');

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    watch,
    reset: locationReset,
    setValue,
  } = useForm<FormData>({
    defaultValues: getFormDefaults(LocationSchema),
    mode: 'onBlur',
    resolver: zodResolver(LocationSchema),
  });

  /* Functions */
  const locationName = watch('locationId');

  const onSubmit = () => ({});

  const removeLocation = () => ({});

  const stockroomOptions = [
    {
      label: 'LXDB',
      value: 'LXDB',
    },
    {
      label: 'LXDC',
      value: 'LXDC',
    },
    {
      label: 'LXDD',
      value: 'LXDD',
    },
  ];

  /* Hooks */
  // Todo remove this after api integration
  const setStockOnSubzoneChange = useCallback(
    (subzoneId: string) => {
      const selectedSubzone = SUBZONE_TABLE_ROWS.find((subzone) => subzone.name === subzoneId);
      if (selectedSubzone) {
        const stockroom = selectedSubzone.stockRoom;
        const stockroomIndex = getFormFieldIndexByKey(getValues()['attributes'], 'stockroom');
        setValue(`attributes.${stockroomIndex}`, { key: 'stockroom', value: stockroom });
      }
    },
    [getValues, setValue]
  );

  const fetchLocationDetails = useCallback(() => {
    if (locationId) {
      const foundLocation = LOCATION_TABLE_ROWS.find(
        (location) => location.id === parseInt(locationId)
      );

      if (foundLocation) {
        locationReset(foundLocation);
      }
    }

    return null;
  }, [locationId, locationReset]);

  useEffect(() => {
    // fetch location details
    if (locationId) {
      fetchLocationDetails();
    }
  }, [fetchLocationDetails, setValue, locationId]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // watch for subzone change and set stockroom
      if (name === 'subzoneName' && type === FIELD_EVENT.CHANGE && value.subzoneName) {
        setStockOnSubzoneChange(value.subzoneName);
      }
    });
    return () => subscription.unsubscribe();
  }, [setStockOnSubzoneChange, watch]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // fake the api delay
    }, 2000);
  }, []);

  if (isLoading && locationId) {
    return <DetailsSectionSkeleton items={10} />;
  } else {
    return (
      <View className={styles['location-detail']} backgroundColor="secondary" direction="column">
        <View
          attributes={{
            'data-testid': 'location-detail-header',
          }}
        >
          <MasterTitle
            title={`${t('Location')}: ${locationName ? locationName : t('Untitled')}`}
            breadcrumbProps={breadcrumbs}
          >
            <View
              attributes={{
                'data-testid': 'location-detail-action',
              }}
              direction="row"
              justify="end"
              align="center"
              gap={4}
            >
              <View.Item>
                <View direction="row" gap={4}>
                  <View.Item>
                    <Button
                      variant="secondary"
                      size="large"
                      onClick={() => navigate(PAGE_URLS.LOCATION_LIST)}
                    >
                      <View direction="row" align="center" justify="center" gap={2}>
                        <Text>{t('Cancel')}</Text>
                      </View>
                    </Button>
                  </View.Item>
                </View>
              </View.Item>
              <View.Item>
                <View direction="row" gap={4}>
                  <View.Item>
                    <Button
                      size="large"
                      disabled={!locationName}
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      <View direction="row" align="center" justify="center" gap={2}>
                        <Text>{t('SaveEdits')}</Text>
                      </View>
                    </Button>
                  </View.Item>
                </View>
              </View.Item>
              {locationId ? (
                <ActionDropdownMenu>
                  <View padding={[1, 0]}>
                    <View.Item>
                      <View padding={[3, 4]}>
                        <Actionable fullWidth onClick={removeLocation}>
                          <Text color="error">{t('RemoveLocation')}</Text>
                        </Actionable>
                      </View>
                    </View.Item>
                  </View>
                </ActionDropdownMenu>
              ) : null}
            </View>
          </MasterTitle>
        </View>

        <View padding={[4, 6]}>
          <Accordion
            className={styles['location-detail__accordion-wrapper']}
            defaultOpen={true}
            headerOptions={{
              headerElement: (
                <View direction="row">
                  <View.Item grow>
                    <Text color="primary" size="125" weight="bold">
                      {t('LocationDetails.Title')}
                    </Text>
                  </View.Item>
                </View>
              ),
            }}
          >
            <View backgroundColor="secondary" height="100%">
              <View className={styles['location-detail__content-section']}>
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
                              multiSelect={false}
                              defaultValue={{
                                label: 'DC ' + selectedDC?.toString(),
                                value: 'DC ' + selectedDC?.toString(),
                              }}
                              options={[]}
                              disabled
                            />
                          </FormControl>
                          <Text weight="regular" color="600" size="087">
                            {t('LocationDetails.WarehouseInstruction')}
                          </Text>
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={t('LocationDetails.SubzoneName.Label')}
                            isRequired={true}
                          />
                          <FormControl>
                            <Controller
                              control={control}
                              name="subzoneName"
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                  label={t('LocationDetails.SubzoneName.Placeholder')}
                                  name="subzoneName"
                                  variant="no-label"
                                  options={SUBZONE_TABLE_ROWS.map((row) => ({
                                    label: row.name,
                                    value: row.id.toString(),
                                  }))}
                                  value={{ label: value || '', value: value || '' }}
                                  inputAttributes={{ onBlur }}
                                  onValueChange={(subzone) => onChange(subzone?.label)}
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

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={t('LocationDetails.Stockroom.Label')}
                            isRequired={true}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'stockroom')
                                )
                              )
                            }
                          >
                            <Controller
                              control={control}
                              name={`attributes.${getFormFieldIndexByKey(
                                getValues()['attributes'],
                                'stockroom'
                              )}`}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                  label={t('LocationDetails.Stockroom.Placeholder')}
                                  name={`attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'stockroom'
                                  )}.value`}
                                  variant="no-label"
                                  options={stockroomOptions}
                                  value={{ label: value.value, value: value.value }}
                                  inputAttributes={{ onBlur }}
                                  onValueChange={(stockroomOption) => onChange(stockroomOption)}
                                />
                              )}
                            />

                            {errors.attributes &&
                              displayAttributeFieldValidationMessage(
                                errors,
                                getFormFieldIndexByKey(getValues()['attributes'], 'stockroom')
                              ) && (
                                <View direction="row" justify="space-between">
                                  <FormControl.Error>
                                    {displayAttributeFieldValidationMessage(
                                      errors,
                                      getFormFieldIndexByKey(getValues()['attributes'], 'stockroom')
                                    )}
                                  </FormControl.Error>
                                </View>
                              )}
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>

                    <View className={[styles['form__field-row']]} direction="row" gap={4}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.Location.Label')} isRequired={true} />
                          <FormControl>
                            <TextField
                              inputAttributes={{
                                placeholder: t('LocationDetails.Location.Placeholder'),
                                ...register('locationId'),
                              }}
                              defaultValue=""
                            />
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={t('LocationDetails.LocationType.Label')}
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
                                  label={t('LocationDetails.LocationType.Placeholder')}
                                  name={`attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'locationType'
                                  )}.value`}
                                  variant="no-label"
                                  multiSelect={false}
                                  options={[]}
                                  value={{ value, label: value }}
                                  inputAttributes={{ onBlur }}
                                  onValueChange={(locationType) => onChange(locationType?.value)}
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
                            text={t('LocationDetails.CheckDigit.Label')}
                            isRequired={true}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'checkDigit')
                                )
                              )
                            }
                          >
                            <TextField
                              placeholder={t('LocationDetails.CheckDigit.Placeholder')}
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.CheckDigit.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'checkDigit'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'checkDigit')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>

                    <View className={[styles['form__field-row']]} direction="row" gap={4}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.Sku.Label')} isRequired={true} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'sku')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.Sku.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'sku'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'sku')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.Lot.Label')} (${t('Optional')})`}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'lot')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.Lot.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'lot'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'lot')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>

                    <View className={[styles['form__field-row']]} direction="row" gap={4}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={t('LocationDetails.QuantityUnits.Label')}
                            isRequired={true}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'quantityUnits')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              disabled={true}
                              inputAttributes={{
                                placeholder: t('LocationDetails.QuantityUnits.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'quantityUnits'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'quantityUnits')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={t('LocationDetails.QuantityReserved.Label')}
                            isRequired={true}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'quantityReserved'
                                  )
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.QuantityUnits.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'quantityReserved'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'quantityReserved'
                                  )
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.Minimum.Label')} isRequired={true} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'minimum')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.Minimum.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'minimum'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'minimum')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.Maximum.Label')} isRequired={true} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'maximum')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.Maximum.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'maximum'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'maximum')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>

                    <View className={[styles['form__field-row']]} direction="row" gap={4}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.PackSize.Label')} (${t('Optional')})`}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'packSize')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.PackSize.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'packSize'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'packSize')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.LocationFlag.Label')} (${t('Optional')})`}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'locationFlag')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.LocationFlag.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'locationFlag'
                                  )}.value`
                                ),
                              }}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'locationFlag')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 4 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.LocationLock.Label')} (${t('Optional')})`}
                          />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'locationLock')
                                )
                              )
                            }
                          >
                            <Controller
                              control={control}
                              name={`attributes.${getFormFieldIndexByKey(
                                getValues()['attributes'],
                                'locationLock'
                              )}.value`}
                              render={({ field: { onChange, value } }) => (
                                <View direction="row" gap={4}>
                                  <Radio
                                    value="locked"
                                    label={t('LocationDetails.Locked')}
                                    checked={value === 'locked'}
                                    onChange={(isMultiplePartsAllowedWithinLocation) =>
                                      onChange(isMultiplePartsAllowedWithinLocation)
                                    }
                                  />
                                  <Radio
                                    value="unlocked"
                                    label={t('LocationDetails.Unlocked')}
                                    checked={value === 'unlocked'}
                                    onChange={(isMultiplePartsAllowedWithinLocation) =>
                                      onChange(isMultiplePartsAllowedWithinLocation)
                                    }
                                  />

                                  <View>
                                    <Link onClick={() => onChange('unlocked')}>{t('Clear')}</Link>
                                  </View>
                                </View>
                              )}
                            />

                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'locationLock')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>
                    <View className={[styles['form__field-row']]} direction="row" gap={4}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.SlotFronts.Label')} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'slotFronts')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.SlotFronts.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'slotFronts'
                                  )}.value`
                                ),
                              }}
                              endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'slotFronts')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.SlotLayers.Label')} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'slotLayers')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.SlotLayers.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'slotLayers'
                                  )}.value`
                                ),
                              }}
                              endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'slotLayers')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.SlotDeeps.Label')} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'slotDeeps')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.SlotDeeps.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'slotDeeps'
                                  )}.value`
                                ),
                              }}
                              endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'slotDeeps')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CurrentWidth.Label')} />
                          <FormControl
                            hasError={
                              !!(
                                errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'currentWidth')
                                )
                              )
                            }
                          >
                            <TextField
                              defaultValue=""
                              inputAttributes={{
                                placeholder: t('LocationDetails.CurrentWidth.Placeholder'),
                                ...register(
                                  `attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'currentWidth'
                                  )}.value`
                                ),
                              }}
                              endElement={<Text color="400">{DEFAULT_DIMENSION_UNIT}</Text>}
                            />
                            <FormControl.Error>
                              {errors.attributes &&
                                displayAttributeFieldValidationMessage(
                                  errors,
                                  getFormFieldIndexByKey(getValues()['attributes'], 'currentWidth')
                                )}
                            </FormControl.Error>
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>

                    <View className={styles['form__field-row']}>
                      <FormControl
                        hasError={
                          !!(
                            errors.attributes &&
                            errors.attributes[
                              getFormFieldIndexByKey(getValues()['attributes'], 'isFullPallet')
                            ]
                          )
                        }
                      >
                        <Controller
                          control={control}
                          name={`attributes.${getFormFieldIndexByKey(
                            getValues()['attributes'],
                            'isFullPallet'
                          )}.value`}
                          render={({ field: { onChange, value } }) => (
                            <Checkbox
                              name={`attributes.${getFormFieldIndexByKey(
                                getValues()['attributes'],
                                'isFullPallet'
                              )}.value`}
                              value="true"
                              checked={value?.toString() === 'true'}
                              label={t('LocationDetails.FullPallet.Label')}
                              onChange={(value) => onChange(value)}
                            />
                          )}
                        />
                        {errors.attributes &&
                          errors.attributes[
                            getFormFieldIndexByKey(getValues()['attributes'], 'isFullPallet')
                          ] && (
                            <View direction="row" justify="space-between">
                              <FormControl.Error>
                                {
                                  errors.attributes[
                                    getFormFieldIndexByKey(
                                      getValues()['attributes'],
                                      'isFullPallet'
                                    )
                                  ]?.message
                                }
                              </FormControl.Error>
                            </View>
                          )}
                      </FormControl>
                    </View>
                  </form>
                </View>
              </View>
            </View>
          </Accordion>
        </View>

        <View padding={[4, 6]}>
          <Divider />
        </View>

        <View padding={[4, 6]}>
          <Accordion
            className={styles['location-detail__accordion-wrapper']}
            headerOptions={{
              headerElement: (
                <View direction="row">
                  <View.Item grow>
                    <Text color="primary" size="125" weight="bold">
                      {t('LocationDetails.CycleCount.Title')}
                    </Text>
                    <Text
                      className={styles['location-detail__accordion-subtitle']}
                      color="400"
                      weight="regular"
                    >
                      {t('LocationDetails.CycleCount.Subtitle')}
                    </Text>
                  </View.Item>
                </View>
              ),
            }}
          >
            <View backgroundColor="secondary" height="100%">
              <View className={styles['location-detail__content-section']}>
                <View>
                  <form>
                    <View direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleCc.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.CycleCc.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleCc'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleLot.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.CycleLot.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleLot'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleDate.Label')} />
                          <Controller
                            control={control}
                            name={`attributes.${getFormFieldIndexByKey(
                              getValues()['attributes'],
                              'cycleDate'
                            )}.value`}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <DatePicker
                                id="cycle-date"
                                className={styles['location-detail__date-picker']}
                                value={value ? generateDateString(value, t('DateFormat.Long')) : ''}
                                dateFormat={t('DateFormat.Long')}
                                inputAttributes={{ ref, onBlur }}
                                onValueChange={(date) => onChange(date)}
                                disabled={true}
                              />
                            )}
                          />
                        </View>
                      </View.Item>
                    </View>
                    <View className={[styles['form__field-row']]} direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleSqty.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.CycleSqty.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleSqty'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleQuantity.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t(
                                'LocationDetails.CycleCount.CycleQuantity.Placeholder'
                              ),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleQuantity'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleCost.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.CycleCost.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleCost'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleUser.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.CycleUser.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleUser'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                    </View>

                    <View className={[styles['form__field-row']]} direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.CycleCount.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.CycleCount.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'cycleCount'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                    </View>

                    <View className={[styles['form__field-row']]} direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.InvQuantity1.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.InvQuantity1.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'invQuantity1'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.InvQuantity2.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.InvQuantity2.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'invQuantity2'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.InvQuantity3.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.InvQuantity3.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'invQuantity3'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel text={t('LocationDetails.CycleCount.InvQuantity4.Label')} />
                          <TextField
                            defaultValue=""
                            disabled={true}
                            inputAttributes={{
                              placeholder: t('LocationDetails.CycleCount.InvQuantity4.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'invQuantity4'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                    </View>
                  </form>
                </View>
              </View>
            </View>
          </Accordion>
        </View>

        <View padding={[4, 6]}>
          <Divider />
        </View>

        <View padding={[0, 6, 4, 6]}>
          <Accordion
            className={styles['location-detail__accordion-wrapper']}
            headerOptions={{
              headerElement: (
                <View direction="row">
                  <View.Item grow>
                    <Text color="primary" size="125" weight="bold">
                      {t('LocationDetails.OtherOption.Title')}
                    </Text>
                  </View.Item>
                </View>
              ),
            }}
          >
            <View backgroundColor="secondary" height="100%">
              <View className={styles['location-detail__content-section']}>
                <View>
                  <form>
                    <View direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.RecordType.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t('LocationDetails.OtherOption.RecordType.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'recordType'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.MaterialCode.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t(
                                'LocationDetails.OtherOption.MaterialCode.Placeholder'
                              ),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'materialCode'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.SlotType.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t('LocationDetails.OtherOption.SlotType.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'slotType'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                    </View>
                    <View className={styles['form__field-row']} direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.ReceivingDate.Label')} (${t(
                              'Optional'
                            )})`}
                          />

                          <Controller
                            control={control}
                            name={`attributes.${getFormFieldIndexByKey(
                              getValues()['attributes'],
                              'receivingDate'
                            )}.value`}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <DatePicker
                                id="receiving-date"
                                className={styles['location-detail__date-picker']}
                                value={value ? generateDateString(value, t('DateFormat.Long')) : ''}
                                dateFormat={t('DateFormat.Long')}
                                inputAttributes={{ ref, onBlur }}
                                onValueChange={(date) => onChange(date)}
                              />
                            )}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.ExpirationDate.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <Controller
                            control={control}
                            name={`attributes.${getFormFieldIndexByKey(
                              getValues()['attributes'],
                              'expirationDate'
                            )}.value`}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <DatePicker
                                id="expiration-date"
                                className={styles['location-detail__date-picker']}
                                value={value ? generateDateString(value, t('DateFormat.Long')) : ''}
                                dateFormat={t('DateFormat.Long')}
                                inputAttributes={{ ref, onBlur }}
                                onValueChange={(date) => onChange(date)}
                              />
                            )}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.CrossReference.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t(
                                'LocationDetails.OtherOption.CrossReference.Placeholder'
                              ),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'crossReference'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View className={styles['form__field-row']} gap={2}>
                          <FormControl>
                            <Controller
                              name={`attributes.${getFormFieldIndexByKey(
                                getValues()['attributes'],
                                'isFullReserved'
                              )}.key`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <Checkbox
                                  name={`attributes.${getFormFieldIndexByKey(
                                    getValues()['attributes'],
                                    'isFullReserved'
                                  )}.key`}
                                  value="true"
                                  checked={value?.toString() === 'true'}
                                  label={t('LocationDetails.OtherOption.FullReserve.Label')}
                                  onChange={(value) => onChange(value)}
                                />
                              )}
                            />
                          </FormControl>
                        </View>
                      </View.Item>
                    </View>
                    <View className={styles['form__field-row']} direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.PickingDropArea.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t(
                                'LocationDetails.OtherOption.PickingDropArea.Placeholder'
                              ),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'pickingDropArea'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.PutawayDropArea.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t(
                                'LocationDetails.OtherOption.PutawayDropArea.Placeholder'
                              ),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'putawayDropArea'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                    </View>
                    <View className={styles['form__field-row']} direction="row" gap={6}>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.Volume.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t('LocationDetails.OtherOption.Volume.Placeholder'),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'volume'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                      <View.Item columns={{ s: 12, l: 3 }}>
                        <View gap={2}>
                          <FormLabel
                            text={`${t('LocationDetails.OtherOption.PutawayVolume.Label')} (${t(
                              'Optional'
                            )})`}
                          />
                          <TextField
                            defaultValue=""
                            inputAttributes={{
                              placeholder: t(
                                'LocationDetails.OtherOption.PutawayVolume.Placeholder'
                              ),
                              ...register(
                                `attributes.${getFormFieldIndexByKey(
                                  getValues()['attributes'],
                                  'putawayVolume'
                                )}.value`
                              ),
                            }}
                          />
                        </View>
                      </View.Item>
                    </View>
                  </form>
                </View>
              </View>
            </View>
          </Accordion>
        </View>
      </View>
    );
  }
};
