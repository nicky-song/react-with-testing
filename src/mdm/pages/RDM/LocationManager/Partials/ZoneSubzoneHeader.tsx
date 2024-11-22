/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Actionable,
  Add,
  Button,
  Dropdown,
  Icon,
  SearchBar,
  View,
  Text,
  Skeleton,
} from '@az/starc-ui';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions.tsx';
import styles from './ZoneSubzoneHeader.module.scss';
import { locationManager } from '@ofm/services/locationManager.ts';
import { useAtom } from 'jotai';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom.ts';
import { Download } from '@shared/assets/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes.ts';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants.ts';
import { ZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { ZoneSuggestionSkeleton } from '@mdm/components/ZoneSearch/ZoneSuggestion/ZoneSuggestionSkeleton.tsx';
import { useBreadcrumb } from '@mdm/hooks/useBreadcrumb.ts';
import { CombinedTabs } from '@shared/components/CombinedTabs/CombinedTabs.tsx';
import { Tab } from '@shared/components/CombinedTabs/CombinedTabs.types.ts';

export const ZoneSubzoneHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true);
  const [isZoneCountLoading, setIsZoneCountLoading] = useState<boolean>(true);
  const [isSubzoneCountLoading, setIsSubzoneCountLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const [, setInput] = useAtom(searchAtom);

  const breadcrumbs = useBreadcrumb();

  const tabs: Array<Tab> = [
    {
      name: t('Zones'),
      value: ROUTES.ZONE_LIST,
      numberOfItems: 0,
    },
    {
      name: t('Subzones'),
      value: ROUTES.SUB_ZONE_LIST,
      numberOfItems: 0,
    },
  ];

  const matchingZones = ZONE_TABLE_ROWS.map((zone) => zone.zoneId).filter((el) =>
    el.toLowerCase().includes(value.toLowerCase())
  );

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
      return <ZoneSuggestionSkeleton className="search-bar__skeleton" />;
    } else if (matchingZones && matchingZones.length > 0) {
      return matchingZones;
    } else {
      return <EmptySuggestions />;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSearchLoading(false); // fake the api delay
      setIsSubzoneCountLoading(false); // fake the api delay
      setIsZoneCountLoading(false); // fake the api delay
    }, 2000);
  }, []);

  return (
    <>
      <View
        className={styles['zone-subzone-header']}
        attributes={{
          'data-testid': 'zone-subzone-header',
        }}
      >
        <MasterTitle
          title={t('MasterTitle.ZonesAndSubZones')}
          breadcrumbProps={breadcrumbs}
          titleActionProps={{ label: t('Favorite'), handleClick: () => ({}) }}
        >
          <View
            attributes={{
              'data-testid': 'zone-subzone-search',
            }}
            className={styles['zone-subzone-search']}
            direction="row"
            justify="end"
            align="center"
            gap={4}
          >
            <View.Item columns={6}>
              <SearchBar
                value={value}
                onValueChange={setValue}
                suggestions={handleSearchSuggestions()}
                className={styles['search-bar']}
                label={t('Search.ZoneOrSubZone')}
                onSelectionChange={onSelectionChange}
                onValueClear={onClearSearch}
                inputAttributes={{ onKeyDown: onKeyDown }}
                maxMenuHeight={300}
              />
            </View.Item>
            <View.Item>
              <View direction="row" gap={4}>
                <View.Item>
                  <Button variant="secondary" size="large">
                    <View direction="row" align="center" justify="center" gap={2}>
                      <Icon svg={Download} />
                      <Text>{t('Download')}</Text>
                    </View>
                  </Button>
                </View.Item>

                <View.Item>
                  <Dropdown
                    variant="ghost"
                    padding={3}
                    className={styles['zone-subzone-header__create-actions']}
                  >
                    <Dropdown.Button
                      className={styles['zone-subzone-header__create-actions__button']}
                    >
                      <Button size="large">
                        <View direction="row" align="center" justify="center" gap={2}>
                          <Icon svg={Add} color="secondary" />
                          <Text>{t('Create')}</Text>
                        </View>
                      </Button>
                    </Dropdown.Button>
                    <Dropdown.Content
                      className={styles['zone-subzone-header__create-actions__content']}
                    >
                      <View>
                        <View.Item
                          className={styles['zone-subzone-header__create-actions__content__item']}
                        >
                          <Actionable onClick={() => navigate(PAGE_URLS.ZONE_CREATE)}>
                            <Text>{t('Zone')}</Text>
                          </Actionable>
                        </View.Item>
                        <View.Item
                          className={styles['zone-subzone-header__create-actions__content__item']}
                        >
                          <Actionable onClick={() => navigate(PAGE_URLS.SUB_ZONE_CREATE)}>
                            <Text>{t('Subzone')}</Text>
                          </Actionable>
                        </View.Item>
                      </View>
                    </Dropdown.Content>
                  </Dropdown>
                </View.Item>
              </View>
            </View.Item>
          </View>
          <View className={styles['sub-title']} align="end" direction="row" gap={4}>
            <View>
              {isZoneCountLoading ? (
                <Skeleton width="100px" height="24px" />
              ) : (
                <Text size="100" color="600">
                  {t('TotalZones', { count: 41 })}
                </Text>
              )}
            </View>
            <View>
              {isSubzoneCountLoading ? (
                <Skeleton width="100px" height="24px" />
              ) : (
                <Text size="100" color="600">
                  {t('TotalSubzones', { count: 271 })}
                </Text>
              )}
            </View>
          </View>
        </MasterTitle>
      </View>

      <View className={styles['zone-subzone-header__combined_tabs']}>
        <CombinedTabs tabs={tabs} rootPath={PAGE_URLS.LOCATION_MANAGER} />
      </View>

      <Outlet />
    </>
  );
};
