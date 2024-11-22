/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';
import { View, Store } from '@az/starc-ui';
import { CheckBoxCard } from '@shared/components/CheckBoxCard/CheckBoxCard';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { SEARCH_PROPERTIES } from '@ofm/constants/dataConstants';
import { locationManager } from '@ofm/services/locationManager';
import { useStoreSearch } from '@ofm/services/useStoreSearch';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useAtom } from 'jotai';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';
import { CardGridSkeleton } from '@shared/components/Skeletons/CardGridSkeleton';
import { SetChildErrorType } from '@ofm/types/types';
import { usePageErrorHandler } from '@shared/hooks/usePageErrorHandler';
import { PAGE_ERRORS } from '@shared/constants/constants';

import s from './StoreSearch.module.scss';

export const StoreSearch = () => {
  const { t } = useTranslation();
  const { setChildError } = useOutletContext<{
    setChildError?: SetChildErrorType;
  }>();

  /* Atoms */
  const [storeId] = useAtom(searchAtom);
  const [warehouse] = useAtom(warehouseAtom);

  /* Constants */
  const navigate = useNavigate();
  const storeParam = locationManager.getParameter(SEARCH_PROPERTIES.STORE.queryParam);

  /* Queries */
  const {
    matchingStores,
    hasNoResults,
    invalidId,
    isLoading: isStoreLoading,
    isError: isStoreError,
  } = useStoreSearch(storeParam ? storeParam : storeId, warehouse.id);

  /* Hooks */
  usePageErrorHandler([{ name: PAGE_ERRORS.STORES, value: isStoreError }], setChildError);

  if (isStoreLoading) {
    return (
      <View height="100%" justify="start" padding={6}>
        <CardGridSkeleton items={6} />
      </View>
    );
  } else {
    return (
      <View padding={6} width="100%" height="100%" className={s['stores__container']}>
        {hasNoResults ? (
          <EmptyState
            svg={Store}
            subtitle={t('Empty.Search.Subtitle')}
            text={t('Empty.Search.Text', {
              value: invalidId,
            })}
          />
        ) : (
          matchingStores.length && (
            <View as="ul" gap={4} className={s['stores__list']}>
              {matchingStores.map((store, index) => (
                <View.Item as="li" key={`${store}-${index}`} className={s['stores__item']}>
                  <CheckBoxCard
                    title={store}
                    shouldHideCheckbox
                    onClick={() =>
                      navigate(
                        PAGE_URLS.GENERAL_PAGE(
                          ROUTES.OUTBOUND,
                          ROUTES.ORDER_REQUEST_BILLING,
                          ROUTES.STORES,
                          store
                        )
                      )
                    }
                  />
                </View.Item>
              ))}
            </View>
          )
        )}
      </View>
    );
  }
};
