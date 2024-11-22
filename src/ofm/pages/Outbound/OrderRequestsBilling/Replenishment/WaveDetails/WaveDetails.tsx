/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Button, Icon, SearchBar, View, Text, Add, IconError } from '@az/starc-ui';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CombinedTabs } from '@shared/components/CombinedTabs/CombinedTabs';
import { PAGE_URLS } from '@shared/constants/routes';
import { useGetWaveById } from '@ofm/services/hooks/useGetWave';
import { downloadGeneratedCSV, generateDateString } from '@ofm/utils/utils';
import { useEffect, useRef, useState } from 'react';
import { OrderType } from '@ofm/constants/constants';
import { SEARCH_PROPERTIES } from '@ofm/constants/dataConstants';
import { locationManager } from '@ofm/services/locationManager';
import { useAtom } from 'jotai';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';
import { StoreSearchDrawer } from '@ofm/components/StoreSearchDrawer/StoreSearchDrawer';
import { useStoreSearch } from '@ofm/services/useStoreSearch';
import { WillCallDrawer } from '@ofm/components/WillCallDrawer/WillCallDrawer';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';
import { usePostOrderSummary } from '@ofm/services/hooks/usePostOrderSummary';
import { OrderSummary, WaveType } from '@ofm/types/types';
import { MasterTitleSkeleton } from '@shared/components/Skeletons/MasterTitleSkeleton';
import { CombinedTabsSkeleton } from '@shared/components/Skeletons/CombinedTabsSkeleton';
import { useExportOrders } from '@ofm/services/hooks/useExportOrders';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useInternationalDC } from '@shared/hooks/useInternationalDC';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { NOTIFICATION_TYPES, PAGE_ERRORS } from '@shared/constants/constants';
import { useNotificationHandler } from '@shared/hooks/useNotificationHandler';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';

import s from './WaveDetails.module.scss';
import dayjs from 'dayjs';

export const WaveDetails = () => {
  /* Atoms */
  const [, setInput] = useAtom(searchAtom);
  const [warehouse] = useAtom(warehouseAtom);

  /* State variables */
  const [value, setValue] = useState<string>('');
  const [searchStoreId, setSearchStoreId] = useState<string>('');
  const [waveTitle, setWaveTitle] = useState<string>('');
  const [childError, setChildError] = useState<string | null>(null);
  const [showStoreSearchDrawer, setShowStoreSearchDrawer] = useState(false);
  const [shouldShowWillCallDrawer, setShouldShowWillCallDrawer] = useState(false);
  const [waveData, setWaveData] = useState<WaveType>();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | undefined>(undefined);

  /* Constants */
  const { t } = useTranslation();
  const { waveId } = useParams();
  const navigate = useNavigate();
  const shouldExportCSVRef = useRef(false);
  const isSearch = useLocation().pathname.includes(SEARCH_PROPERTIES.STORE.search);
  const tabTitles = {
    READY_TO_REQUEST: t('OrderType.ReadyToRequest'),
    READY_TO_BILL: t('OrderType.ReadyToBill'),
    SENT_TO_OUTBOUND: t('OrderStatus.SentToOutbound'),
    FLAGGED: t('OrderType.Flagged'),
  };

  const { isInternational } = useInternationalDC({ warehouse });
  const { handleNotification } = useNotificationHandler();

  /* Queries */
  const {
    waveData: wave,
    isError: isWaveError,
    isLoading: isWaveLoading,
  } = useGetWaveById({ waveId }, !!waveId);

  const {
    stores,
    matchingStores,
    hasNoResults,
    isError: isStoreError,
  } = useStoreSearch(value, warehouse.id);

  const {
    ordersCsvData,
    isError: isCsvError,
    isLoading: isCsvLoading,
    refetch: refetchOrdersCsv,
  } = useExportOrders({
    warehouseId: warehouse.id,
    waveId,
    type: OrderType.REPLENISHMENT,
  });

  const {
    mutatePostOrderSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = usePostOrderSummary();

  /* Functions */
  const setSearchParam = (param: string) => {
    !isSearch && navigate(PAGE_URLS.STORE_SEARCH);
    locationManager.setQueryParameter(SEARCH_PROPERTIES.STORE.queryParam, param);
    setInput(param);
  };

  const onSelectionChange = (value: string) => {
    if (value !== undefined) {
      setSearchParam(value);
    }
  };

  const onKeyDown = (e: {
    key: string;
    keyCode: number;
    preventDefault: () => void;
    currentTarget: { value: string };
  }) => {
    if (e.key === KEY.ENTER || e.keyCode === KEY_CODE.ENTER) {
      e.preventDefault();
      const inputValue = (e.currentTarget as HTMLInputElement).value;
      if (inputValue) {
        setSearchParam(inputValue);
      }
    }
  };

  const onClearSearch = () => {
    locationManager.clearQueryParameters();
  };

  const exportCSVHandler = () => {
    if (waveId && warehouse.id) {
      refetchOrdersCsv();
      shouldExportCSVRef.current = true;
    }
  };

  const newWillCallHandler = () => {
    setShowStoreSearchDrawer(true);
    return;
  };

  const showWillCallDrawer = () => {
    setShowStoreSearchDrawer(false);
    setShouldShowWillCallDrawer(true);
  };

  /* Hooks */
  const { errorMessage } = usePageErrorHandler([
    { name: PAGE_ERRORS.WAVE, value: isWaveError },
    { name: PAGE_ERRORS.STORES, value: isStoreError },
    { name: PAGE_ERRORS.ORDERS, value: isSummaryError },
  ]);

  // Validates if the data can be exported
  useEffect(() => {
    if (ordersCsvData && !isCsvError && !isCsvLoading && shouldExportCSVRef.current) {
      downloadGeneratedCSV(ordersCsvData, 'export-orders');
      handleNotification(NOTIFICATION_TYPES.SUCCESS, t('Success.Action.Export'));
    }
    shouldExportCSVRef.current = false;
  }, [ordersCsvData, isCsvError, isCsvLoading, handleNotification, t]);

  // Sets the wave information based on the query
  useEffect(() => {
    if (wave) {
      setWaveData(wave);
      const waveTime = dayjs(wave.dueTimestamp).format('HH:mm');
      const waveSuffixTitle = isInternational
        ? waveTime
        : `${generateDateString(
            dayjs(wave.dueTimestamp).toDate(),
            t('DateFormat.Long')
          )} ${waveTime}`;
      setWaveTitle(`${wave.name} - ${t('RequestBy')} ${waveSuffixTitle}`);
    }
  }, [wave, t, isInternational]);

  // Sets the order totals for the combined tabs
  useEffect(() => {
    warehouse.id &&
      !!waveId &&
      mutatePostOrderSummary(
        {
          warehouseId: warehouse.id,
          type: [OrderType.REPLENISHMENT],
          isInProgress: false,
          status: [],
          waveId: waveId,
        },
        {
          onSuccess: ({ data }) => {
            if (data.length > 0) {
              setOrderSummary(data[0]);
            }
          },
        }
      );
  }, [mutatePostOrderSummary, warehouse, waveId]);

  if (isWaveLoading || isSummaryLoading) {
    return (
      <View height="100%" direction="column">
        <View>
          <View padding={6}>
            <MasterTitleSkeleton hasBreadcrumbs hasTopSearch hasWideTitle />
          </View>
          <CombinedTabsSkeleton tabs={Object.values(tabTitles)} />
        </View>
        <View justify="start">
          <Outlet context={{ waveId, waveDueDate: waveData?.dueTimestamp }} />
        </View>
      </View>
    );
  } else if (isWaveError || isStoreError || isSummaryError || childError) {
    return (
      <EmptyPage
        title={t('Errors.Page.Title')}
        description={t('Errors.Page.Description', {
          service: errorMessage || childError,
        })}
        buttonText={t('Errors.Page.ButtonText')}
        onClick={() => navigate(0)}
        icon={IconError}
      />
    );
  } else if (waveData) {
    const tabs = [
      {
        name: tabTitles.READY_TO_REQUEST,
        numberOfItems:
          orderSummary?.readyToRequestOrders !== undefined ? orderSummary?.readyToRequestOrders : 0,
        value: 'ready-to-request',
      },
      {
        name: tabTitles.READY_TO_BILL,
        numberOfItems:
          orderSummary?.readyToBillOrders !== undefined ? orderSummary?.readyToBillOrders : 0,
        value: 'ready-to-bill',
      },
      {
        name: tabTitles.SENT_TO_OUTBOUND,
        numberOfItems:
          orderSummary?.completedOrders !== undefined ? orderSummary?.completedOrders : 0,
        value: 'sent-to-outbound',
      },
      {
        name: tabTitles.FLAGGED,
        numberOfItems: orderSummary?.flaggedOrders !== undefined ? orderSummary?.flaggedOrders : 0,
        value: 'flagged',
      },
    ];

    return (
      <View height="100%" direction="column">
        <View>
          <MasterTitle
            title={waveTitle}
            breadcrumbProps={{
              data: [
                {
                  label: t('Sidenav.StoreOrderRequestBilling'),
                  onClick: () => navigate(PAGE_URLS.ORDER_REQUEST_BILLING),
                },
                { label: waveData.name, onClick: () => void 0 },
              ],
            }}
            subtitle={`${waveData.totalOrdersCount} ${t('TotalStores')}`}
          >
            <View direction="row" justify="end" align="center" gap={4}>
              <View.Item grow className={s['wave__search-container']}>
                <SearchBar
                  value={value}
                  onValueChange={setValue}
                  suggestions={hasNoResults ? <EmptySuggestions /> : matchingStores}
                  className={s['wave__search-bar']}
                  label={t('Search.StoreNumber')}
                  onSelectionChange={onSelectionChange}
                  onValueClear={onClearSearch}
                  inputAttributes={{ onKeyDown: onKeyDown }}
                  maxMenuHeight={300}
                />
              </View.Item>
              <View.Item>
                <Button
                  variant="secondary"
                  size="large"
                  className={s['wave__cta-button']}
                  onClick={exportCSVHandler}
                >
                  <View direction="row" align="center" justify="center" gap={2}>
                    <Text>{t('Export')}</Text>
                  </View>
                </Button>
              </View.Item>
              <View.Item>
                <Button size="large" className={s['wave__cta-button']} onClick={newWillCallHandler}>
                  <View direction="row" align="center" justify="center" gap={2}>
                    <Icon svg={Add} color="on-primary" />
                    <Text>{t('NewWillCall')}</Text>
                  </View>
                </Button>
              </View.Item>
            </View>
          </MasterTitle>
          <StoreSearchDrawer
            title={t('Search.StoreDrawer.Title')}
            label={t('Search.StoreDrawer.Label')}
            showDrawer={showStoreSearchDrawer}
            setShowDrawer={setShowStoreSearchDrawer}
            storeId={searchStoreId}
            setStoreId={setSearchStoreId}
            stores={stores}
            onClick={showWillCallDrawer}
          />
          <WillCallDrawer
            title={t('NewWillCall')}
            showDrawer={shouldShowWillCallDrawer}
            setShowPreviousDrawer={setShowStoreSearchDrawer}
            setShowDrawer={setShouldShowWillCallDrawer}
            storeId={searchStoreId}
            setSearchStoreId={setSearchStoreId}
          />
          <CombinedTabs tabs={tabs} rootPath={PAGE_URLS.WAVE_DETAILS(waveId || '')} />
        </View>
        <Outlet context={{ waveId, waveDueDate: waveData.dueTimestamp, setChildError }} />
        <a id="export-orders" style={{ display: 'none' }} />
      </View>
    );
  }
};
