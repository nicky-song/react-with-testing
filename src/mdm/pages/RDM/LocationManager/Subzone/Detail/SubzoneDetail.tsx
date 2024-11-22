/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  Actionable,
  Button,
  Checkbox,
  classNames,
  FormControl,
  Icon,
  Radio,
  Select,
  Text,
  TextField,
  View,
} from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';
import { PAGE_URLS } from '@shared/constants/routes.ts';

import { useNavigate, useParams } from 'react-router-dom';
import { SUBZONE_TABLE_ROWS, ZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { useCallback, useEffect } from 'react';
import { useSessionStorage } from '@shared/hooks/useStorage';
import { SESSION_DC_ID_KEY } from '@shared/constants/storageConstants';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.tsx';
import { z } from 'zod';
import { SubzoneSchema } from '@mdm/schemas/subzoneSchema.ts';

import styles from './SubzoneDetail.module.scss';
import { Info } from '@az/starc-ui-icons';
import { Tab } from '@mdm/components/Tabs/Tabs.types.ts';
import { Tabs } from '@mdm/components/Tabs/Tabs.tsx';
import { SubzoneVehicleList } from '@mdm/pages/RDM/LocationManager/Subzone/Detail/SubzoneVehicleList.tsx';
import { SubzoneLocationList } from '@mdm/pages/RDM/LocationManager/Subzone/Detail/SubzoneLocationList.tsx';
import { getFormInputError } from '@ofm/utils/utils.ts';
import { useBreadcrumb } from '@mdm/hooks/useBreadcrumb.ts';
import { FormLabel } from '@shared/components/FormLabel/FormLabel.tsx';
import { displayAttributeFieldValidationMessage } from '@mdm/utils/form/validationUtils.tsx';
import { getFormDefaults, getFormFieldIndexByKey } from '@mdm/utils/form/formUtils.tsx';

export const SubzoneDetail = () => {
  type FormData = z.infer<typeof SubzoneSchema>;

  const [selectedDC] = useSessionStorage<string>(SESSION_DC_ID_KEY);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subzoneId, selectedZoneId } = useParams();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset: subzoneReset,
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: getFormDefaults(SubzoneSchema),
    resolver: zodResolver(SubzoneSchema),
  });

  const subzoneName = watch('name');

  const breadcrumbs = useBreadcrumb(subzoneId ? PAGE_URLS.SUB_ZONE_CREATE : '');

  const tabs: Array<Tab> = [
    {
      name: t('SubzoneDetails.Tabs.Location.Total'),
      value: 'locations',
      numberOfItems: subzoneId ? 4 : 0,
      content: <SubzoneLocationList subzoneId={subzoneId} />,
    },
    {
      name: t('SubzoneDetails.Tabs.Vehicle.Total'),
      value: 'vehicles',
      numberOfItems: subzoneId ? 11 : 0,
      content: <SubzoneVehicleList subzoneId={subzoneId} />,
    },
  ];

  const onSubmit = () => ({});

  const removeSubzone = () => ({});

  const fetchSubzoneDetails = useCallback(() => {
    if (subzoneId) {
      const foundSubzone = SUBZONE_TABLE_ROWS.find((zone) => zone.id === parseInt(subzoneId));
      if (foundSubzone) {
        subzoneReset(foundSubzone);
      }
    }

    return null;
  }, [subzoneId, subzoneReset]);

  useEffect(() => {
    // fetch zone details
    if (subzoneId) {
      fetchSubzoneDetails();
    }

    // preselect the zone name dropdown if query params has selectedZoneId value set
    if (selectedZoneId) {
      const foundZone = ZONE_TABLE_ROWS.find((zone) => zone.id === parseInt(selectedZoneId));
      if (foundZone) {
        setValue('zoneName', foundZone.zoneId);
      }
    }
  }, [fetchSubzoneDetails, setValue, selectedZoneId, subzoneId]);

  return (
    <>
      <View className={styles['subzone-detail']} backgroundColor="secondary" direction="column">
        <View
          attributes={{
            'data-testid': 'subzone-details-header',
          }}
        >
          <MasterTitle
            title={`${t('Subzone')}: ${subzoneName ? subzoneName : t('Untitled')}`}
            breadcrumbProps={breadcrumbs}
          >
            <View
              attributes={{
                'data-testid': 'subzone-details-action',
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
                      onClick={() => navigate(PAGE_URLS.SUB_ZONE_LIST)}
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
                      disabled={!subzoneName}
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      <View direction="row" align="center" justify="center" gap={2}>
                        <Text>{t('SaveEdits')}</Text>
                      </View>
                    </Button>
                  </View.Item>
                </View>
              </View.Item>
              {subzoneId ? (
                <ActionDropdownMenu>
                  <View padding={[1, 0]}>
                    <View.Item>
                      <View padding={[3, 4]}>
                        <Actionable fullWidth onClick={removeSubzone}>
                          <Text color="error">{t('RemoveSubzone')}</Text>
                        </Actionable>
                      </View>
                    </View.Item>
                  </View>
                </ActionDropdownMenu>
              ) : null}
            </View>
          </MasterTitle>
        </View>
        <View padding={6}>
          <View>
            <View.Item>
              <Text size="125" weight="bold">
                {t('SubzoneDetails.Title')}
              </Text>
            </View.Item>
          </View>

          <View
            className={classNames(
              styles['subzone-detail__form-field-section'],
              styles['subzone-detail__banner-section']
            )}
            justify="center"
          >
            <View direction="row" gap={2} align="center">
              <Icon svg={Info} />
              <Text>{t('SubzoneDetails.Banner.Title')}</Text>
            </View>
          </View>

          <View
            backgroundColor="secondary"
            className={styles['subzone-detail__form-field-section']}
          >
            <View>
              <form>
                <View direction="row" gap={4}>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('Warehouse')}
                      </Text>
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
                        {t('SubzoneDetails.WarehouseInstruction')}
                      </Text>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.ZoneName.Label')}
                      </Text>
                      <FormControl hasError={!!errors.zoneName}>
                        <Controller
                          control={control}
                          name="zoneName"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.ZoneName.Placeholder')}
                              placeholder={t('SubzoneDetails.ZoneName.Placeholder')}
                              name="zoneName"
                              variant="no-label"
                              disabled={!!selectedZoneId}
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
                            <FormControl.Error>
                              {getFormInputError(errors.zoneName.type)}
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
                  className={styles['subzone-detail__form-field-section']}
                >
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.Name.Label')}
                      </Text>
                      <FormControl hasError={!!errors.name}>
                        <TextField
                          label={!subzoneId ? t('SubzoneDetails.Name.Placeholder') : ''}
                          placeholder={t('SubzoneDetails.Name.Placeholder')}
                          inputAttributes={register('name')}
                          defaultValue=""
                        />
                        {errors.name && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.name.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.Type.Label')}
                      </Text>
                      <FormControl hasError={!!errors.type}>
                        <Controller
                          control={control}
                          name="type"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.Type.Placeholder')}
                              placeholder={t('SubzoneDetails.Type.Placeholder')}
                              name="zoneName"
                              variant="no-label"
                              options={[]}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(type) => onChange(type?.value)}
                            />
                          )}
                        />
                        {errors.type && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.type.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text weight="medium" size="087">
                        {t('SubzoneDetails.ContainerType.Label')}
                      </Text>
                      <FormControl hasError={!!errors.containerType}>
                        <Controller
                          control={control}
                          name="containerType"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.ContainerType.Placeholder')}
                              placeholder={t('SubzoneDetails.ContainerType.Placeholder')}
                              name="containerType"
                              variant="no-label"
                              options={[]}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(containerType) => onChange(containerType?.value)}
                            />
                          )}
                        />
                        {errors.containerType && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.containerType.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>

                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <FormLabel text={t('SubzoneDetails.CategoryLabel.Label')} isRequired={true} />
                      <FormControl
                        hasError={
                          !!(
                            errors.attributes &&
                            displayAttributeFieldValidationMessage(
                              errors,
                              getFormFieldIndexByKey(getValues()['attributes'], 'categoryLabel')
                            )
                          )
                        }
                      >
                        <TextField
                          defaultValue=""
                          inputAttributes={{
                            placeholder: t('SubzoneDetails.CategoryLabel.Placeholder'),
                            ...register(
                              `attributes.${getFormFieldIndexByKey(
                                getValues()['attributes'],
                                'categoryLabel'
                              )}.value`
                            ),
                          }}
                        />
                        <FormControl.Error>
                          {errors.attributes &&
                            displayAttributeFieldValidationMessage(
                              errors,
                              getFormFieldIndexByKey(getValues()['attributes'], 'categoryLabel')
                            )}
                        </FormControl.Error>
                      </FormControl>
                    </View>
                  </View.Item>
                </View>

                <View
                  direction="row"
                  gap={4}
                  className={styles['subzone-detail__form-field-section']}
                >
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text weight="medium" size="087">
                        {`${t('SubzoneDetails.Description.Label')} (${t('Optional')})`}
                      </Text>
                      <FormControl>
                        <TextField
                          id="zone-description"
                          label={!subzoneId ? t('SubzoneDetails.Description.Placeholder') : ''}
                          placeholder={t('SubzoneDetails.Description.Placeholder')}
                          inputAttributes={register('description')}
                          defaultValue=""
                        />
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.PickMethod.Label')}
                      </Text>
                      <FormControl hasError={!!errors.pickMethod}>
                        <Controller
                          control={control}
                          name="pickMethod"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.PickMethod.Placeholder')}
                              placeholder={t('SubzoneDetails.PickMethod.Placeholder')}
                              name="pickMethod"
                              variant="no-label"
                              options={[]}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(pickMethod) => onChange(pickMethod?.value)}
                            />
                          )}
                        />
                        {errors.pickMethod && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.pickMethod.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.LabelSort.Label')}
                      </Text>
                      <FormControl hasError={!!errors.labelSort}>
                        <Controller
                          control={control}
                          name="labelSort"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.LabelSort.Placeholder')}
                              placeholder={t('SubzoneDetails.LabelSort.Placeholder')}
                              name="labelSort"
                              variant="no-label"
                              options={[]}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(labelSort) => onChange(labelSort?.value)}
                            />
                          )}
                        />
                        {errors.labelSort && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.labelSort.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.SkuPickClass.Label')}
                      </Text>
                      <FormControl hasError={!!errors.skuPickClass}>
                        <Controller
                          control={control}
                          name="skuPickClass"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.SkuPickClass.Placeholder')}
                              placeholder={t('SubzoneDetails.SkuPickClass.Placeholder')}
                              name="skuPickClass"
                              variant="no-label"
                              options={[]}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(skuPickClass) => onChange(skuPickClass?.value)}
                            />
                          )}
                        />
                        {errors.skuPickClass && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.skuPickClass.type)}
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
                  className={styles['subzone-detail__form-field-section']}
                >
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.PickDropLocation.Label')}
                      </Text>
                      <FormControl hasError={!!errors.pickDropLocation}>
                        <TextField
                          label={!subzoneId ? t('SubzoneDetails.PickDropLocation.Placeholder') : ''}
                          placeholder={t('SubzoneDetails.PickDropLocation.Placeholder')}
                          inputAttributes={register('pickDropLocation')}
                          defaultValue=""
                        />
                        {errors.pickDropLocation && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.pickDropLocation.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.PutDropLocation.Label')}
                      </Text>
                      <FormControl hasError={!!errors.putDropLocation}>
                        <TextField
                          label={!subzoneId ? t('SubzoneDetails.PutDropLocation.Placeholder') : ''}
                          placeholder={t('SubzoneDetails.PutDropLocation.Placeholder')}
                          inputAttributes={register('putDropLocation')}
                          defaultValue=""
                        />
                        {errors.putDropLocation && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.putDropLocation.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.MultiplePartsAllowedWithinLocation.Label')}
                      </Text>
                      <FormControl hasError={!!errors.isMultiplePartsAllowedWithinLocation}>
                        <Controller
                          control={control}
                          name="isMultiplePartsAllowedWithinLocation"
                          render={({ field: { onChange, value } }) => (
                            <View direction="row" gap={4}>
                              <Radio
                                value="true"
                                label="Yes"
                                checked={value === 'true'}
                                onChange={(isMultiplePartsAllowedWithinLocation) =>
                                  onChange(isMultiplePartsAllowedWithinLocation)
                                }
                              />
                              <Radio
                                value="false"
                                label="No"
                                checked={value === 'false'}
                                onChange={(isMultiplePartsAllowedWithinLocation) =>
                                  onChange(isMultiplePartsAllowedWithinLocation)
                                }
                              />
                            </View>
                          )}
                        />
                        {errors.isMultiplePartsAllowedWithinLocation && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.isMultiplePartsAllowedWithinLocation.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.Mezzanine.Label')}
                      </Text>
                      <FormControl hasError={!!errors.isMezzanine}>
                        <Controller
                          control={control}
                          name="isMezzanine"
                          render={({ field: { onChange, value } }) => (
                            <View direction="row" gap={4}>
                              <Radio
                                value="true"
                                label="Yes"
                                checked={value === 'true'}
                                onChange={(isMezzanine) => onChange(isMezzanine)}
                              />
                              <Radio
                                value="false"
                                label="No"
                                checked={value === 'false'}
                                onChange={(isMezzanine) => onChange(isMezzanine)}
                              />
                            </View>
                          )}
                        />
                        {errors.isMezzanine && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.isMezzanine.type)}
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
                  className={styles['subzone-detail__form-field-section']}
                >
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text weight="medium" size="087">
                        {`${t('SubzoneDetails.PackMethod.Label')} (${t('Optional')})`}
                      </Text>
                      <FormControl hasError={!!errors.packMethod}>
                        <Controller
                          control={control}
                          name="packMethod"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label={t('SubzoneDetails.PackMethod.Placeholder')}
                              placeholder={t('SubzoneDetails.PackMethod.Placeholder')}
                              name="packMethod"
                              variant="no-label"
                              options={[]}
                              required
                              value={{ label: value, value }}
                              inputAttributes={{ onBlur }}
                              onValueChange={(packMethod) => onChange(packMethod?.value)}
                            />
                          )}
                        />
                        {errors.packMethod && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.packMethod.type)}
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
                  className={styles['subzone-detail__form-field-section']}
                >
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <FormControl hasError={!!errors.isConveyorFlag}>
                      <Controller
                        control={control}
                        name="isConveyorFlag"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            name="isConveyorFlag"
                            value="true"
                            checked={value?.toString() === 'true'}
                            label={t('SubzoneDetails.ConveyorFlag.Label')}
                            onChange={(value) => onChange(value)}
                          />
                        )}
                      />
                      {errors.isConveyorFlag && (
                        <View direction="row" justify="space-between">
                          <FormControl.Error>
                            {getFormInputError(errors.isConveyorFlag.type)}
                          </FormControl.Error>
                        </View>
                      )}
                    </FormControl>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <FormControl hasError={!!errors.isItemVerify}>
                      <Controller
                        control={control}
                        name="isItemVerify"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            name="isItemVerify"
                            value="true"
                            checked={value?.toString() === 'true'}
                            label={t('SubzoneDetails.ItemVerify.Label')}
                            onChange={(value) => onChange(value)}
                          />
                        )}
                      />
                      {errors.isItemVerify && (
                        <View direction="row" justify="space-between">
                          <FormControl.Error>
                            {getFormInputError(errors.isItemVerify.type)}
                          </FormControl.Error>
                        </View>
                      )}
                    </FormControl>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <FormControl hasError={!!errors.hasBidirectionalPick}>
                      <Controller
                        control={control}
                        name="hasBidirectionalPick"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            name="hasBidirectionalPick"
                            value="true"
                            checked={value?.toString() === 'true'}
                            label={t('SubzoneDetails.BidirectionalPick.Label')}
                            onChange={(value) => onChange(value)}
                          />
                        )}
                      />
                      {errors.hasBidirectionalPick && (
                        <View direction="row" justify="space-between">
                          <FormControl.Error>
                            {getFormInputError(errors.hasBidirectionalPick.type)}
                          </FormControl.Error>
                        </View>
                      )}
                    </FormControl>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <FormControl hasError={!!errors.itemDescriptionPrompt}>
                      <Controller
                        control={control}
                        name="itemDescriptionPrompt"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            name="itemDescriptionPrompt"
                            value="true"
                            checked={value?.toString() === 'true'}
                            label={t('SubzoneDetails.ItemDescPrompt.Label')}
                            onChange={(value) => onChange(value)}
                          />
                        )}
                      />
                      {errors.itemDescriptionPrompt && (
                        <View direction="row" justify="space-between">
                          <FormControl.Error>
                            {getFormInputError(errors.itemDescriptionPrompt.type)}
                          </FormControl.Error>
                        </View>
                      )}
                    </FormControl>
                  </View.Item>
                </View>

                <View
                  direction="row"
                  gap={4}
                  className={styles['subzone-detail__form-field-section']}
                >
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.Stockroom.Label')}
                      </Text>
                      <FormControl hasError={!!errors.stockRoom}>
                        <TextField
                          label={!subzoneId ? t('SubzoneDetails.Stockroom.Label') : ''}
                          placeholder={t('SubzoneDetails.Stockroom.Label')}
                          inputAttributes={register('stockRoom')}
                          disabled={true}
                          defaultValue=""
                        />
                        {errors.stockRoom && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.stockRoom.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.PickPriority.Label')}
                      </Text>
                      <FormControl hasError={!!errors.pickPriority}>
                        <TextField
                          label={!subzoneId ? t('SubzoneDetails.PickPriority.Placeholder') : ''}
                          placeholder={t('SubzoneDetails.PickPriority.Placeholder')}
                          inputAttributes={register('pickPriority')}
                          defaultValue=""
                        />
                        {errors.pickPriority && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.pickPriority.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>

                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['subzone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('SubzoneDetails.PutawayPriority.Label')}
                      </Text>
                      <FormControl hasError={!!errors.putAwayPriority}>
                        <TextField
                          label={!subzoneId ? t('SubzoneDetails.PutawayPriority.Placeholder') : ''}
                          placeholder={t('SubzoneDetails.PutawayPriority.Placeholder')}
                          inputAttributes={register('putAwayPriority')}
                          defaultValue=""
                        />
                        {errors.putAwayPriority && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.putAwayPriority.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                </View>
              </form>
            </View>
          </View>
        </View>

        <Tabs tabs={tabs} />
      </View>
    </>
  );
};
