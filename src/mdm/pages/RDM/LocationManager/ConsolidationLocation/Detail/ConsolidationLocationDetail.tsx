/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Actionable, Button, Text, View } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';
import { PAGE_URLS } from '@shared/constants/routes.ts';

import { useNavigate, useParams } from 'react-router-dom';
import { CONSOLIDATION_LOCATION_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { useCallback, useEffect } from 'react';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.tsx';
import { z } from 'zod';
import { ConsolidationLocationSchema } from '@mdm/schemas/consolidationLocationSchema.ts';

import styles from './ConsolidationLocationDetail.module.scss';
import { useBreadcrumb } from '@mdm/hooks/useBreadcrumb.ts';
import { getFormDefaults } from '@mdm/utils/form/formUtils.tsx';
import { ConsolidationLocationDetailForm } from '@mdm/pages/RDM/LocationManager/ConsolidationLocation/Detail/ConsolidationLocationDetailForm.tsx';

export const ConsolidationLocationDetail = () => {
  /* Constants */
  type FormData = z.infer<typeof ConsolidationLocationSchema>;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locationId } = useParams();

  const hookFormMethods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: getFormDefaults(ConsolidationLocationSchema),
    resolver: zodResolver(ConsolidationLocationSchema),
  });

  const { handleSubmit, reset: locationReset, setValue, watch } = hookFormMethods;

  const locationName = watch('locationId');

  const breadcrumbs = useBreadcrumb(locationId ? PAGE_URLS.CONSOLIDATION_LOCATION_CREATE : '');

  /* Functions */
  const onSubmit = () => ({});

  const removeLocation = () => ({});

  /* Hooks */
  const fetchLocationDetails = useCallback(() => {
    if (locationId) {
      const foundlocation = CONSOLIDATION_LOCATION_TABLE_ROWS.find(
        (zone) => zone.id === parseInt(locationId)
      );
      if (foundlocation) {
        locationReset(foundlocation);
      }
    }

    return null;
  }, [locationId, locationReset]);

  useEffect(() => {
    // fetch zone details
    if (locationId) {
      fetchLocationDetails();
    }
  }, [fetchLocationDetails, setValue, locationId]);

  return (
    <>
      <View
        className={styles['consolidation-location-detail']}
        backgroundColor="secondary"
        height="100%"
        direction="column"
      >
        <View
          attributes={{
            'data-testid': 'consolidation-location-details-header',
          }}
        >
          <MasterTitle
            title={`${t('ConsolidationLocationDetails.Title')}: ${
              locationName ? locationName : t('Untitled')
            }`}
            breadcrumbProps={breadcrumbs}
          >
            <View
              attributes={{
                'data-testid': 'consolidation-location-details-action',
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
                      onClick={() => navigate(PAGE_URLS.CONSOLIDATION_LOCATION_LIST)}
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
        <View padding={6}>
          <View>
            <View.Item>
              <Text size="125" weight="bold">
                {t('ConsolidationLocationDetails.SubTitle')}
              </Text>
            </View.Item>
          </View>

          <View
            backgroundColor="secondary"
            className={styles['consolidation-location-detail__form-field-section']}
          >
            <View>
              <FormProvider {...hookFormMethods}>
                <ConsolidationLocationDetailForm />
              </FormProvider>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
