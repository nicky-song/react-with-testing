/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Add, Button, Icon, SearchBar, View, Text, IconError } from '@az/starc-ui';
import { StoreSearchDrawer } from '@ofm/components/StoreSearchDrawer/StoreSearchDrawer';
import { WillCallDrawer } from '@ofm/components/WillCallDrawer/WillCallDrawer';
import { CombinedTabs } from '@shared/components/CombinedTabs/CombinedTabs';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { CombinedTabsSkeleton } from '@shared/components/Skeletons/CombinedTabsSkeleton';
import { SEARCH_PROPERTIES } from '@ofm/constants/dataConstants';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';
import { locationManager } from '@ofm/services/locationManager';
import { useStoreSearch } from '@ofm/services/useStoreSearch';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom';
import { useAtom } from 'jotai';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';
import { usePostOrderSummary } from '@ofm/services/hooks/usePostOrderSummary';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { PAGE_ERRORS } from '@shared/constants/constants';
import { OrderType } from '@ofm/constants/constants';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';
import { OrderSummary } from '@ofm/types/types';

import s from './OrderRequestsBilling.module.scss';

export const OrderRequestsBilling = () => {
  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);
  const [, setInput] = useAtom(searchAtom);

  /* State variables */
  const [value, setValue] = useState<string>('');
  const [searchStoreId, setSearchStoreId] = useState<string>('');
  const [showStoreSearchDrawer, setShowStoreSearchDrawer] = useState(false);
  const [shouldShowWillCallDrawer, setShouldShowWillCallDrawer] = useState(false);
  const [childError, setChildError] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary[] | undefined>(undefined);

  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isStorePage = useLocation().pathname.includes(ROUTES.STORES);
  const isStoreSearch = useLocation().pathname.includes(SEARCH_PROPERTIES.STORE.search);
  const isWavePage = useLocation().pathname.includes(ROUTES.WAVES);
  const tabTitles = {
    REPLENISHMENT: t('CombinedTabs.Orders.Replenishment'),
    OPENING_AND_BACKUP: t('CombinedTabs.Orders.OpeningAndBackup'),
    CROSS_DOCK: t('CombinedTabs.Orders.CrossDock'),
  };

  /* Queries */
  const {
    stores,
    matchingStores,
    hasNoResults,
    isLoading: isStoreLoading,
    isError: isStoreError,
  } = useStoreSearch(value, warehouse.id);

  const {
    mutatePostOrderSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = usePostOrderSummary();

  /* Functions */
  const setSearchParam = (param: string) => {
    !isStoreSearch && navigate(PAGE_URLS.STORE_SEARCH);
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

  const showWillCallDrawer = () => {
    setShowStoreSearchDrawer(false);
    setShouldShowWillCallDrawer(true);
  };

  /* Hooks */
  const { errorMessage } = usePageErrorHandler([
    { name: PAGE_ERRORS.SUMMARY, value: isSummaryError },
    { name: PAGE_ERRORS.STORES, value: isStoreError },
  ]);

  // Sets the order totals for the combined tabs
  useEffect(() => {
    !!warehouse.id &&
      mutatePostOrderSummary(
        {
          warehouseId: warehouse.id,
          type: [
            OrderType.REPLENISHMENT,
            OrderType.BACKUP,
            OrderType.OPENING,
            OrderType.CROSS_DOCK,
          ],
          isInProgress: false,
          status: [],
        },
        {
          onSuccess: ({ data }) => {
            if (data.length > 0) {
              setOrderSummary(data);
            }
          },
        }
      );
  }, [mutatePostOrderSummary, warehouse]);

  if (isSummaryError || isStoreError || childError) {
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
  } else {
    const tabs = [
      {
        name: tabTitles.REPLENISHMENT,
        numberOfItems:
          orderSummary?.find((order) => order.orderType === OrderType.REPLENISHMENT)?.totalOrders ||
          0,
        value: 'replenishment',
      },
      {
        name: tabTitles.OPENING_AND_BACKUP,
        numberOfItems:
          orderSummary
            ?.filter(
              (order) =>
                order.orderType === OrderType.OPENING || order.orderType === OrderType.BACKUP
            )
            .reduce((sum, order) => sum + order.totalOrders, 0) || 0,
        value: 'new-store-and-backup',
      },
      {
        name: tabTitles.CROSS_DOCK,
        numberOfItems:
          orderSummary?.find((order) => order.orderType === OrderType.CROSS_DOCK)?.totalOrders || 0,
        value: 'cross-dock',
      },
    ];

    return (
      <View direction="column" height="100%">
        {!isStorePage && !isWavePage && (
          <>
            <MasterTitle
              title={t('MasterTitle.StoreOrderRequestsBilling')}
              // TODO: Add functionality to save page to favorites column
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              titleActionProps={{ label: 'Favorite', handleClick: () => {} }}
            >
              <View direction="row" justify="end" align="center" gap={4}>
                <View.Item columns={6}>
                  <SearchBar
                    value={value}
                    onValueChange={setValue}
                    suggestions={hasNoResults ? <EmptySuggestions /> : matchingStores}
                    className={s['search-bar']}
                    label={t('Search.StoreNumber')}
                    onSelectionChange={onSelectionChange}
                    onValueClear={onClearSearch}
                    inputAttributes={{ onKeyDown: onKeyDown }}
                    maxMenuHeight={300}
                  />
                </View.Item>
                <View.Item>
                  <Button size="large" onClick={() => setShowStoreSearchDrawer(true)}>
                    <View direction="row" align="center" justify="center" gap={2}>
                      <Icon svg={Add} color="on-primary" />
                      <Text>{t('MasterTitle.NewWillCall')}</Text>
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
            {!isStoreSearch && (
              <>
                {isSummaryLoading || isStoreLoading ? (
                  <CombinedTabsSkeleton tabs={Object.values(tabTitles)} />
                ) : (
                  <CombinedTabs tabs={tabs} rootPath={PAGE_URLS.ORDER_REQUEST_BILLING} />
                )}
              </>
            )}
          </>
        )}
        <Outlet context={{ setChildError }} />
      </View>
    );
  }
};
