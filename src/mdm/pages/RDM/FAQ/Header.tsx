/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { SearchBar, View } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions.tsx';

import { locationManager } from '@ofm/services/locationManager.ts';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes.ts';
import { CombinedTabs } from '@shared/components/CombinedTabs/CombinedTabs.tsx';
import { Tab } from '@shared/components/CombinedTabs/CombinedTabs.types.ts';

import styles from './Header.module.scss';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants.ts';
import { useAtom } from 'jotai';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom.ts';
import { FAQSuggestionSkeleton } from '@mdm/components/FAQSearch/FAQSuggestion/FAQSuggestionSkeleton.tsx';

export const Header = () => {
  const { t } = useTranslation();
  const [, setInput] = useAtom(searchAtom);
  const [value, setValue] = useState<string>('');
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true);

  const data = [
    {
      title: t('FAQ.GeneralFAQ.FAQ1.Title'),
    },
    {
      title: t('FAQ.GeneralFAQ.FAQ3.Content1.Title'),
    },
    {
      title: t('FAQ.GeneralFAQ.FAQ3.Content2.Title'),
    },
  ];

  const tabs: Array<Tab> = [
    {
      name: t('CombinedTabs.FAQ.General'),
      value: ROUTES.GENERAL,
      numberOfItems: 0,
    },
    {
      name: t('CombinedTabs.FAQ.Inbound'),
      value: ROUTES.INBOUND,
      numberOfItems: 0,
    },
    {
      name: t('CombinedTabs.FAQ.Outbound'),
      value: ROUTES.OUTBOUND,
      numberOfItems: 0,
    },
    {
      name: t('CombinedTabs.FAQ.Transportation'),
      value: ROUTES.TRANSPORTATION,
      numberOfItems: 0,
    },
    {
      name: t('CombinedTabs.FAQ.ReturnsRecalls'),
      value: ROUTES.RETURNS_RECALLS,
      numberOfItems: 0,
    },
    {
      name: t('CombinedTabs.FAQ.InventoryControl'),
      value: ROUTES.INVENTORY_CONTROL,
      numberOfItems: 0,
    },
  ];

  const suggestions = data
    .map((value) => value.title)
    .filter((el) => el.toLowerCase().includes(value.toLowerCase()));

  const setSearchParam = (param: string) => {
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

  const handleSearchSuggestions = () => {
    if (isSearchLoading) {
      return <FAQSuggestionSkeleton className="search-bar__skeleton" />;
    } else if (suggestions && suggestions.length > 0) {
      return suggestions;
    } else {
      return <EmptySuggestions />;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSearchLoading(false); // fake the api delay
    }, 2000);
  }, []);

  return (
    <View className={styles['faq-header']}>
      <View>
        <MasterTitle title={t('MasterTitle.FAQ')}>
          <View
            attributes={{
              'data-testid': 'faq-search',
            }}
            direction="row"
            justify="end"
            align="center"
            gap={4}
          >
            <View.Item columns={6}>
              <SearchBar
                className={styles['search-bar']}
                value={value}
                onValueChange={setValue}
                suggestions={handleSearchSuggestions()}
                label={t('Search.FAQ')}
                onSelectionChange={onSelectionChange}
                onValueClear={onClearSearch}
                inputAttributes={{ onKeyDown: onKeyDown }}
                maxMenuHeight={300}
              />
            </View.Item>
          </View>
        </MasterTitle>
      </View>
      <View>
        <CombinedTabs tabs={tabs} rootPath={PAGE_URLS.FAQ} />
      </View>
    </View>
  );
};
