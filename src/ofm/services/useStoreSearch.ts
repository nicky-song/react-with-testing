/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { SearchAtomType } from '@ofm/atoms/search/searchInputAtom';
import { StoreStatus } from '@ofm/constants/constants';
import { useGetStores } from '@ofm/services/hooks/useGetStores';
import { addPadding } from '@ofm/utils/utils';
import { ID_PADDINGS } from '@shared/constants/constants';
import { useEffect, useState } from 'react';

export const useStoreSearch = (
  storeId: SearchAtomType,
  warehouseId: string,
  storeStatus?: StoreStatus,
  currentPage?: number,
  pageSize?: number
) => {
  const [invalidId, setInvalidId] = useState<string>('');
  const [stores, setStores] = useState<string[]>([]);
  const [matchingStores, setMatchingStores] = useState<string[]>([]);
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);

  const { storesData, isLoading, isError } = useGetStores(
    {
      warehouseId,
      storeStatus,
      currentPage,
      pageSize,
    },
    !!warehouseId && warehouseId.length > 0
  );

  useEffect(() => {
    if (storesData?.results && storesData?.results.length > 0) {
      setStores(
        storesData.results.map((result) => addPadding(result.storeId.toString(), ID_PADDINGS.STORE))
      );
    }
    if (isError) {
      setStores([]);
      setHasNoResults(true);
    }
  }, [storesData, isError]);

  useEffect(() => {
    switch (storeId) {
      case undefined:
        setMatchingStores([]);
        break;
      case '':
        setMatchingStores(stores);
        setHasNoResults(false);
        break;
      default: {
        if (stores.length) {
          const storesToShow = stores.filter((store) => store.includes(storeId));
          if (storesToShow.length) {
            setMatchingStores(storesToShow);
            setHasNoResults(false);
          } else {
            setInvalidId(storeId);
            setMatchingStores([]);
            setHasNoResults(true);
          }
        }
        break;
      }
    }
  }, [storeId, stores]);

  return { stores, matchingStores, hasNoResults, invalidId, isLoading, isError };
};
