/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  Actionable,
  Button,
  Divider,
  FormControl,
  Icon,
  Select,
  Text,
  TextField,
  View,
} from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZoneSchema } from '@mdm/schemas/zoneSchema.ts';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';
import { PAGE_URLS } from '@shared/constants/routes.ts';

import { useNavigate, useParams } from 'react-router-dom';
import { Add, LicensePlateSearch } from '@az/starc-ui-icons';
import { EmptyState } from '@shared/components/EmptyState/EmptyState.tsx';
import { SUBZONE_TABLE_ROWS, ZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { SubzoneList } from './SubzoneList.tsx';
import { useCallback, useEffect, useState } from 'react';
import { SubZoneListRowTypes } from '@shared/components/Table/Table.types.ts';
import { useSessionStorage } from '@shared/hooks/useStorage';
import { SESSION_DC_ID_KEY } from '@shared/constants/storageConstants';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.tsx';
import { z } from 'zod';

import styles from './ZoneDetail.module.scss';
import { getFormInputError } from '@ofm/utils/utils.ts';
import { useBreadcrumb } from '@mdm/hooks/useBreadcrumb.ts';
import { getFormDefaults, getFormFieldIndexByKey } from '@mdm/utils/form/formUtils.tsx';
import { FormLabel } from '@shared/components/FormLabel/FormLabel.tsx';
import { displayAttributeFieldValidationMessage } from '@mdm/utils/form/validationUtils.tsx';

export const ZoneDetail = () => {
  type FormData = z.infer<typeof ZoneSchema>;

  const [selectedDC] = useSessionStorage<string>(SESSION_DC_ID_KEY);

  const [subzoneListData, setSubzoneListData] = useState<SubZoneListRowTypes[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { zoneId: id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset: zoneReset,
    getValues,
    watch,
  } = useForm<FormData>({
    defaultValues: getFormDefaults(ZoneSchema),
    resolver: zodResolver(ZoneSchema),
  });

  const zoneID = watch('zoneId');

  const breadcrumbs = useBreadcrumb(id ? PAGE_URLS.ZONE_CREATE : '');

  const onSubmit = () => ({});

  const removeZone = () => ({});

  const fetchZoneDetails = useCallback(() => {
    if (id) {
      const foundZone = ZONE_TABLE_ROWS.find((zone) => zone.id === parseInt(id));
      if (foundZone) {
        zoneReset(foundZone);
      }
    }

    return null;
  }, [id, zoneReset]);

  useEffect(() => {
    if (id) {
      // sets the zone associated subzone list data and fetch zone details
      setSubzoneListData([...SUBZONE_TABLE_ROWS].slice(0, 5));
      fetchZoneDetails();
    }
  }, [fetchZoneDetails, id]);

  return (
    <>
      <View
        className={styles['zone-detail']}
        backgroundColor="secondary"
        direction="column"
        height="100%"
      >
        <View
          attributes={{
            'data-testid': 'zone-details-header',
          }}
        >
          <MasterTitle
            title={`${t('Zone')}: ${zoneID ? zoneID : t('Untitled')}`}
            breadcrumbProps={breadcrumbs}
          >
            <View
              attributes={{
                'data-testid': 'zone-details-action',
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
                      onClick={() => navigate(PAGE_URLS.ZONE_LIST)}
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
                      disabled={!zoneID}
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      <View direction="row" align="center" justify="center" gap={2}>
                        <Text>{t('SaveEdits')}</Text>
                      </View>
                    </Button>
                  </View.Item>
                </View>
              </View.Item>
              {id ? (
                <ActionDropdownMenu>
                  <View padding={[1, 0]}>
                    <View.Item>
                      <View padding={[3, 4]}>
                        <Actionable fullWidth onClick={removeZone}>
                          <Text color="error">{t('RemoveZone')}</Text>
                        </Actionable>
                      </View>
                    </View.Item>
                  </View>
                </ActionDropdownMenu>
              ) : null}
            </View>
          </MasterTitle>
        </View>
        <View backgroundColor="secondary" padding={6} height="100%">
          <View>
            <View.Item>
              <Text size="125" weight="bold">
                {t('ZoneDetails.Title')}
              </Text>
            </View.Item>
          </View>
          <View className={styles['zone-detail__content-section']}>
            <View>
              <form>
                <View direction="row" gap={4}>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['zone-detail__form-field-label--required']}
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
                          attributes={{ style: { width: 'var(--st-unit-5)' } }}
                          disabled
                        />
                      </FormControl>
                      <Text weight="regular" color="600" size="087">
                        {t('ZoneDetails.WarehouseInstruction')}
                      </Text>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text
                        className={styles['zone-detail__form-field-label--required']}
                        weight="medium"
                        size="087"
                      >
                        {t('ZoneDetails.Name')}
                      </Text>
                      <FormControl hasError={!!errors.zoneId}>
                        <TextField
                          id="zone-name"
                          label={!id ? t('ZoneDetails.Name') : ''}
                          placeholder={t('ZoneDetails.EnterZoneName')}
                          inputAttributes={register('zoneId')}
                          defaultValue=""
                        />
                        {errors.zoneId && (
                          <View direction="row" justify="space-between">
                            <FormControl.Error>
                              {getFormInputError(errors.zoneId.type)}
                            </FormControl.Error>
                          </View>
                        )}
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <Text weight="medium" size="087">
                        {`${t('ZoneDetails.Description')} (${t('Optional')})`}
                      </Text>
                      <FormControl>
                        <TextField
                          id="zone-description"
                          label={!id ? t('ZoneDetails.Description') : ''}
                          placeholder={t('ZoneDetails.EnterZoneDescription')}
                          inputAttributes={register('description')}
                          defaultValue=""
                        />
                      </FormControl>
                    </View>
                  </View.Item>
                  <View.Item columns={{ s: 12, l: 3 }}>
                    <View gap={2}>
                      <FormLabel text={t('ZoneDetails.MapSequence.Label')} isRequired={true} />
                      <FormControl
                        hasError={
                          !!(
                            errors.attributes &&
                            displayAttributeFieldValidationMessage(
                              errors,
                              getFormFieldIndexByKey(getValues()['attributes'], 'mapSequence')
                            )
                          )
                        }
                      >
                        <TextField
                          defaultValue=""
                          inputAttributes={{
                            placeholder: t('ZoneDetails.MapSequence.Placeholder'),
                            ...register(
                              `attributes.${getFormFieldIndexByKey(
                                getValues()['attributes'],
                                'mapSequence'
                              )}.value`
                            ),
                          }}
                        />
                        <FormControl.Error>
                          {errors.attributes &&
                            displayAttributeFieldValidationMessage(
                              errors,
                              getFormFieldIndexByKey(getValues()['attributes'], 'mapSequence')
                            )}
                        </FormControl.Error>
                      </FormControl>
                    </View>
                  </View.Item>
                </View>
              </form>
            </View>

            <View>
              <Divider color="300" className={styles['zone-detail__divider']} />

              <View gap={4} width="100%" height="100%">
                <View direction="row">
                  <View.Item grow>
                    <Text size="125" weight="bold">
                      {t('ZoneDetails.TotalSubzonesInZone', { count: subzoneListData.length })}
                    </Text>
                  </View.Item>
                  <View.Item>
                    <Button
                      variant="secondary"
                      size="small"
                      disabled={!id}
                      onClick={() => navigate(`${PAGE_URLS.SUB_ZONE_CREATE}/${id}`)}
                    >
                      <View direction="row" align="center" justify="center" gap={2}>
                        <Icon svg={Add} />
                        <Text>{t('CreateSubzone')}</Text>
                      </View>
                    </Button>
                  </View.Item>
                </View>

                {subzoneListData.length === 0 ? (
                  <View padding={6}>
                    <EmptyState
                      svg={LicensePlateSearch}
                      subtitle={t('Empty.ZoneSubzones.Subtitle')}
                      text={t('Empty.ZoneSubzones.Text')}
                    />
                  </View>
                ) : (
                  <View>
                    <SubzoneList data={subzoneListData} />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
