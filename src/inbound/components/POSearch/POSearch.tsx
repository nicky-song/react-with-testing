/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Ref, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchBar, View, classNames } from '@az/starc-ui';

import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';
import { PAGE_URLS } from '@shared/constants/routes';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';

import { locationManager } from '@ofm/services/locationManager';

import { SEARCH_PROPERTIES } from '@inbound/constants/dataConstants';
import { PODashboardDataRowType } from '@inbound/types/types';

import { POSuggestion } from './POSuggestion/POSuggestion';
import { POSuggestionSkeleton } from './POSuggestion/POSuggestionSkeleton';

import * as T from './POSearch.types';
import styles from './POSearch.module.scss';

export const POSearch = ({
  id,
  className,
  searchValue,
  options,
  label,
  isSearchLoading,
  onItemSearch,
  onPOItemClick,
}: T.Props) => {
  /* State variables */
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(searchValue);
  const [searchInputValue, setSearchInputValue] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<PODashboardDataRowType | string>();
  const [isHideSuggestions, setIsHideSuggestions] = useState<boolean>(false);

  /* Constants */
  const navigate = useNavigate();
  const isPOSearch = useLocation().pathname.includes(SEARCH_PROPERTIES.PO.search);

  /* Functions */
  const handleItemSearch = (search: string) => {
    if (onItemSearch) {
      onItemSearch(search);
    }

    setValue(search);
    setIsHideSuggestions(false);
  };

  const onKeyDown = (e: {
    key: string;
    keyCode: number;
    preventDefault: () => void;
    currentTarget: { value: string };
  }) => {
    if (e.key === KEY.ENTER || e.keyCode === KEY_CODE.ENTER) {
      e.preventDefault();
      setSearchInputValue((e.currentTarget as HTMLInputElement).value);
    }
  };

  const handleItemSelect = (item: PODashboardDataRowType | string) => {
    setSelectedItem(item);

    if (item !== searchValue) {
      setValue('');
      ref.current?.focus();
    }
  };

  const handleSearchSuggestions = () => {
    if (!isHideSuggestions) {
      if (isSearchLoading) {
        return <POSuggestionSkeleton />;
      } else if (options && options.length > 0) {
        return (
          <POSuggestion
            onItemClick={handleItemSelect}
            data={options}
            maxEntries={5}
            searchValue={value}
          />
        );
      } else {
        return <EmptySuggestions />;
      }
    }
  };

  /* Hooks */
  useEffect(() => {
    if (selectedItem) {
      onPOItemClick(selectedItem);
    } else if (searchInputValue) {
      if (searchInputValue === searchValue) {
        isPOSearch && setIsHideSuggestions(true);
        if (options.length === 1) {
          navigate(PAGE_URLS.PO_DETAILS(options[0].poNumber));
        } else {
          !isPOSearch && navigate(PAGE_URLS.PO_DASHBOARD_SEARCH);
          locationManager.setQueryParameter(SEARCH_PROPERTIES.PO.queryParam, searchValue);
        }
      } else {
        if (options.length === 1) {
          navigate(PAGE_URLS.PO_DETAILS(options[0].poNumber));
        } else if (options.length > 1) {
          !isPOSearch && navigate(PAGE_URLS.PO_DASHBOARD_SEARCH);
          locationManager.setQueryParameter(SEARCH_PROPERTIES.PO.queryParam, searchInputValue);
        }
      }
    }
  }, [searchInputValue, selectedItem]);

  return (
    <View className={styles['po-search']}>
      <SearchBar
        id={id}
        label={label}
        value={value}
        hideSuggestions={!value}
        onValueChange={handleItemSearch}
        inputAttributes={{
          onKeyDown: onKeyDown,
        }}
        ref={ref as Ref<HTMLInputElement>}
        className={classNames(styles['po-search__search-bar'], className)}
        suggestions={handleSearchSuggestions()}
      />
    </View>
  );
};
