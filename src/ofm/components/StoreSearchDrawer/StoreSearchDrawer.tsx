/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { SearchBar, Store, Text, View } from '@az/starc-ui';
import { useCallback, useEffect, useState } from 'react';

import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { CheckBoxCard } from '@shared/components/CheckBoxCard/CheckBoxCard';
import { Drawer } from '@shared/components/Drawer/Drawer';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';

import * as T from './StoreSearchDrawer.types';
import s from './StoreSearchDrawer.module.scss';
import { useTranslation } from 'react-i18next';

export const StoreSearchDrawer = ({
  title,
  label,
  showDrawer,
  setShowDrawer,
  storeId,
  setStoreId,
  stores,
  onClick,
}: T.Props) => {
  /* State variables */
  const [invalidId, setInvalidId] = useState<string>('');
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);
  const [hasEmptyList, setHasEmptyList] = useState<boolean>(false);
  const [showStores, setShowStores] = useState<boolean>(false);
  const [storeList, setStoreList] = useState<Array<string>>([]);
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  /* Constants */
  const { t } = useTranslation();

  /* Functions */
  const clearStates = useCallback(() => {
    setInvalidId('');
    setStoreList([]);
    setShowStores(false);
    setHasNoResults(false);
    setHasEmptyList(false);
    setSuggestions(stores);
  }, [stores]);

  const getSearchStores = useCallback(
    (storeId: string) => {
      const storesToShow = stores.filter((store) => store.includes(storeId));
      if (storesToShow.length) {
        setStoreList(storesToShow);
        setSuggestions(storesToShow);
        setHasEmptyList(false);
        setHasNoResults(false);
      } else {
        setInvalidId(storeId);
        setHasEmptyList(true);
        setHasNoResults(true);
      }
    },
    [stores, setSuggestions, setHasEmptyList, setHasNoResults, setInvalidId]
  );

  const onSelectionChange = (value: string) => {
    if (value !== undefined) {
      setStoreId(value);
      setShowStores(true);
    }
  };

  const handleStoreClick = (value: string) => {
    setStoreId(value);
    onClick();
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
        setStoreId(inputValue);
        setShowStores(true);
      }
    }
    if (e.key === KEY.BACKSPACE || e.keyCode === KEY_CODE.BACKSPACE) {
      setShowStores(false);
    }
  };

  const onClearSearch = () => {
    setStoreId('');
    clearStates();
  };

  /* Hooks */
  // Filters the warehouse stores based on the search input
  useEffect(() => {
    if (storeId) {
      getSearchStores(storeId);
    }
    if (storeId === '') {
      clearStates();
    }
  }, [storeId, stores, getSearchStores, clearStates]);

  return (
    <Drawer
      show={showDrawer}
      handleClose={() => {
        clearStates();
        setStoreId('');
        setShowDrawer(false);
      }}
      size="small"
      position="right"
      headerTitle={title}
      contentClassName={s['store-search-drawer__content']}
    >
      <Text weight="bold">{label}</Text>
      <SearchBar
        variant="pro"
        value={storeId}
        onValueChange={setStoreId}
        suggestions={hasNoResults ? <EmptySuggestions /> : suggestions}
        className={s['store-search-drawer__search-bar']}
        label={t('Search.StoreNumber')}
        onSelectionChange={onSelectionChange}
        onValueClear={onClearSearch}
        inputAttributes={{ onKeyDown: onKeyDown }}
        maxMenuHeight={300}
      />
      {hasEmptyList ? (
        <EmptyState
          svg={Store}
          subtitle={t('Empty.Search.Subtitle')}
          text={t('Empty.Search.Text', {
            value: invalidId,
          })}
        />
      ) : (
        storeList.length &&
        showStores && (
          <View as="ul" className={s['store-search-drawer__store-list']}>
            {storeList.map((store, index) => (
              <View.Item
                as="li"
                key={`${store}-${index}`}
                className={s['store-search-drawer__store-item']}
              >
                <CheckBoxCard
                  title={store}
                  shouldHideCheckbox
                  onClick={() => handleStoreClick(store)}
                />
              </View.Item>
            ))}
          </View>
        )
      )}
    </Drawer>
  );
};
