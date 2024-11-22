/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { DatePicker, Link, Pagination, Store, Text, View } from '@az/starc-ui';
import { WaveContainer } from '@ofm/components/WaveContainer/WaveContainer';
import { useState } from 'react';
import { enumToTranslationKey, statusToBadgeVariant, isValidateDate } from '@ofm/utils/utils';
import { WaveSchema } from '@ofm/schemas/waveSchema';
import { useGetWaves } from '@ofm/services/hooks/useGetWaves';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { useAtom } from 'jotai';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { ReplenishmentSkeleton } from './ReplenishmentSkeleton';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { z } from 'zod';
import { useOutletContext } from 'react-router-dom';
import { SetChildErrorType } from '@ofm/types/types';
import { FULL_PAGE_SIZE, PAGE_ERRORS } from '@shared/constants/constants';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { BFF_REQUEST_DATE_FORMAT } from '@ofm/constants/constants';

import styles from './Replenishment.module.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'react-i18next';
dayjs.extend(utc);

export const Replenishment = () => {
  const { setChildError } = useOutletContext<{
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);

  /* State variables */
  const [endDate, setEndDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Constants */
  const { isInternational } = useInternationalDC({ warehouse });
  const { t } = useTranslation();

  const {
    wavesData,
    isInitialLoading: isWaveLoading,
    isError: isWaveError,
  } = useGetWaves(
    {
      warehouseId: warehouse.id,
      pastDue: !startDate && !endDate,
      startDate: startDate
        ? dayjs(startDate).utcOffset(0).format(BFF_REQUEST_DATE_FORMAT)
        : dayjs().utcOffset(0).format(BFF_REQUEST_DATE_FORMAT),
      endDate: endDate && dayjs(endDate).utcOffset(0).format(BFF_REQUEST_DATE_FORMAT),
      currentPage: currentPage - 1,
      pageSize: FULL_PAGE_SIZE,
    },
    !!warehouse.id &&
      (startDate ? isValidateDate(startDate) : true) &&
      (endDate ? isValidateDate(endDate) : true)
  );

  /* Functions */
  const waveResponseToWave = (waves: z.infer<typeof WaveSchema>[]) => {
    return waves.map((wave) => {
      const {
        id,
        name,
        dueTimestamp,
        status,
        totalOrdersCount,
        flaggedOrdersCount,
        completedOrdersCount,
      } = wave;

      const waveStatus = statusToBadgeVariant(status);

      return {
        id,
        date: dayjs(dueTimestamp).toDate(),
        wave: name,
        status: waveStatus,
        storeCount: completedOrdersCount,
        statusText: t(`WaveStatus.${enumToTranslationKey(status)}`),
        storeMax: totalOrdersCount,
        flaggedCount: flaggedOrdersCount,
      };
    });
  };

  /* Hooks */
  usePageErrorHandler([{ name: PAGE_ERRORS.WAVES, value: isWaveError }], setChildError);

  return (
    <View height="100%" width="100%" className={styles['replenishment']}>
      <View direction="column" padding={6} className={styles['replenishment__container']}>
        <View direction="row" align="center" className={styles['replenishment__dates']}>
          <DatePicker
            dateFormat={t('DateFormat.Short')}
            label={t('ReplenishmentPage.StartDate')}
            value={startDate}
            onValueChange={(value) => setStartDate(value)}
          />
          <DatePicker
            dateFormat={t('DateFormat.Short')}
            label={t('ReplenishmentPage.EndDate')}
            value={endDate}
            onValueChange={(value) => setEndDate(value)}
          />
          {(startDate || endDate) && (
            <Link
              variant="underline"
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
            >
              <Text
                fontFamily="body"
                size="087"
                weight="medium"
                color="500"
                className={styles['replenishment__clear-text']}
              >
                {t('ReplenishmentPage.Clear')}
              </Text>
            </Link>
          )}
        </View>
        {isWaveLoading ? (
          <ReplenishmentSkeleton />
        ) : (
          <>
            {wavesData && wavesData?.results.length > 0 ? (
              <>
                <View>
                  <WaveContainer
                    data={waveResponseToWave(wavesData.results)}
                    isDefaultSort={!(startDate || endDate)}
                    withWaveDisplay={!isInternational}
                  />
                </View>
                {wavesData.metadata.totalResults > FULL_PAGE_SIZE && (
                  <View justify="center" align="center">
                    <Pagination
                      onPageChange={(newPage) => setCurrentPage(newPage)}
                      totalPages={Math.ceil(wavesData.metadata.totalResults / FULL_PAGE_SIZE)}
                    />
                  </View>
                )}
              </>
            ) : (
              <EmptyState
                svg={Store}
                subtitle={t('Empty.Store.Subtitle')}
                text={t('Empty.Store.Text', { orderType: t('CombinedTabs.Orders.Replenishment') })}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};
