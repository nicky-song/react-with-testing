/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { LOCATION_TABLE_ROWS, ZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants.ts';
import { locationManager } from '@ofm/services/locationManager.ts';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions.tsx';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom.ts';
import { Button, Icon, SearchBar, Select, Skeleton, Text, View } from '@az/starc-ui';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { Download } from '@shared/assets/icons';
import { Add } from '@az/starc-ui-icons';
import { useBreadcrumb } from '@mdm/hooks/useBreadcrumb.ts';
import { PAGE_URLS } from '@shared/constants/routes.ts';
import { LocationSuggestionSkeleton } from '@mdm/components/LocationSearch/LocationSuggestion/LocationSuggestionSkeleton.tsx';
import { SEARCH_MENU_MAX_HEIGHT } from '@mdm/constants/constants.ts';

import styles from './LocationList.module.scss';
import { DetailsTableSkeleton } from '@shared/components/Skeletons/DetailsTableSkeleton.tsx';
import { Table } from '@shared/components/Table/Table.tsx';
import {
  LOCATION_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants.ts';
import { mapLocationTableRows } from '@mdm/utils/table/tableUtils.tsx';
import { DEFAULT_PAGE, PAGE_SIZE } from '@shared/constants/constants.ts';
import { LocationListRowTypes } from '@shared/components/Table/Table.types.ts';

export const LocationList = () => {
  const [, setInput] = useAtom(searchAtom);

  const [isListLoading, setListLoading] = useState<boolean>(true);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true);
  const [isLocationCountLoading, setIsLocationCountLoading] = useState<boolean>(true);
  const [locationTotalCount, setIsLocationTotalCount] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  const { t } = useTranslation();
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumb();

  const matchingLocations = LOCATION_TABLE_ROWS.map((value) => value.locationId).filter((el) =>
    el.toLowerCase().includes(value.toLowerCase())
  );

  const onViewDetails = (location: LocationListRowTypes) => {
    navigate(PAGE_URLS.LOCATION_DETAILS(String(location.id)));
  };

  const setSearchParam = (param: string) => {
    setInput(param);
  };

  const onSelectionChange = (value: string) => {
    if (value) {
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
      return <LocationSuggestionSkeleton className="search-bar__skeleton" />;
    } else if (matchingLocations && matchingLocations.length > 0) {
      return matchingLocations;
    } else {
      return <EmptySuggestions />;
    }
  };

  // Todo remove this after api integration
  useEffect(() => {
    setTimeout(() => {
      setIsLocationTotalCount(693);
      setIsSearchLoading(false); // fake the api delay
      setIsLocationCountLoading(false); // fake the api delay
      setListLoading(false); // fake the api delay
    }, 2000);
  }, []);

  const SubTitle = () => {
    return (
      <View direction="row" align="center" gap={4}>
        <View.Item>
          {isLocationCountLoading ? (
            <Skeleton width="100px" height="24px" />
          ) : (
            <Text size="100" color="600">
              {`${t('TotalLocations')}: ${locationTotalCount}`}
            </Text>
          )}
        </View.Item>
      </View>
    );
  };

  return (
    <>
      <View className={styles['location-list']}>
        <MasterTitle
          title={t('MasterTitle.Locations')}
          breadcrumbProps={breadcrumbs}
          titleActionProps={{ label: t('Favorite'), handleClick: () => ({}) }}
          subtitle={<SubTitle />}
        >
          <View direction="row" justify="end" align="center" gap={4}>
            <View.Item columns={6}>
              <SearchBar
                className={styles['search-bar']}
                value={value}
                onValueChange={setValue}
                suggestions={handleSearchSuggestions()}
                label={t('Search.Location')}
                onSelectionChange={onSelectionChange}
                onValueClear={onClearSearch}
                inputAttributes={{ onKeyDown: onKeyDown }}
                maxMenuHeight={SEARCH_MENU_MAX_HEIGHT}
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
                  <Button size="large" onClick={() => navigate(PAGE_URLS.LOCATION_CREATE)}>
                    <View direction="row" align="center" justify="center" gap={2}>
                      <Icon svg={Add} color="secondary" />
                      <Text>{t('Create')}</Text>
                    </View>
                  </Button>
                </View.Item>
              </View>
            </View.Item>
          </View>
        </MasterTitle>

        <View padding={[4, 6]}>
          {isListLoading ? (
            <DetailsTableSkeleton />
          ) : (
            <>
              <View direction="row" gap={4}>
                <View.Item columns={{ s: 12, l: 3 }}>
                  <Select
                    label=""
                    variant="no-label"
                    placeholder={t('AllZones')}
                    name="zone"
                    options={ZONE_TABLE_ROWS.map((value) => ({
                      label: value.zoneId,
                      value: value.zoneId,
                    }))}
                  />
                </View.Item>

                <View.Item columns={{ s: 12, l: 3 }}>
                  <Select
                    label=""
                    variant="no-label"
                    placeholder={t('AllLocationTypes')}
                    name="locationType"
                    options={[{ label: 'All', value: 'all' }]}
                  />
                </View.Item>

                <View.Item grow />

                <View.Item>
                  <Button className={styles['btn__bulk-update']} variant="secondary" size="large">
                    <Text>{t('BulkUpdateLocation')}</Text>
                  </Button>
                </View.Item>
              </View>

              <View className={styles['location-list__table-wrapper']}>
                <Table
                  columns={LOCATION_TABLE_COLUMNS}
                  rows={mapLocationTableRows(LOCATION_TABLE_ROWS, onViewDetails)}
                  isPaginated={true}
                  isCheckboxDisabled={false}
                  pageSize={PAGE_SIZE}
                  defaultPage={DEFAULT_PAGE}
                  isCreditItem={false}
                  isCheckboxTable={false}
                  styleVariant={TableStylingVariants.DETAILS}
                  totalPages={Math.ceil(LOCATION_TABLE_ROWS.length / PAGE_SIZE)}
                  onSort={() => {
                    return;
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};