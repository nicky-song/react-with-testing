/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAtom } from 'jotai';

import { Actionable, Text, View } from '@az/starc-ui';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { PAGE_URLS } from '@shared/constants/routes';

import { generateDateString } from '@ofm/utils/utils';
import { locationManager } from '@ofm/services/locationManager';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom';

import { MasterCard } from '@inbound/components/MasterCard/MasterCard';
import { POSearch } from '@inbound/components/POSearch/POSearch';
import { SEARCH_PROPERTIES } from '@inbound/constants/dataConstants';
import { usePOSearch } from '@inbound/services/usePOSearch';
import { PODashboardDataRowType } from '@inbound/types/types';
import { replaceAll, statusToBadgeVariant } from '@inbound/utils/utils';

import styles from '../PODashboard.module.scss';

export const PODashboardSearch = () => {
  /* Atoms */
  const [searchValue, setSearchValue] = useAtom(searchAtom);

  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchParam = locationManager.getParameter(SEARCH_PROPERTIES.PO.queryParam);

  /* Queries */
  const { matchingPOs, isLoadingPOs } = usePOSearch(searchParam ? searchParam : searchValue);

  /* Functions */
  const handleItemSearch = (value: string) => {
    setSearchValue(value);
    locationManager.setQueryParameter(SEARCH_PROPERTIES.PO.queryParam, value);
  };

  const handleSearchItemClick = (item: PODashboardDataRowType | string) => {
    if (typeof item === 'string') {
      handleItemSearch(item);
    } else {
      navigate(PAGE_URLS.PO_DETAILS(item.poNumber));
    }
  };

  return (
    <>
      <View direction="column" height="100%" className={styles['po-dashboard']}>
        <MasterTitle
          title={t('PODashboard.Title')}
          // TODO: Add functionality to save page to favorites column
          titleActionProps={{
            label: 'Favorite',
            handleClick: () => {
              return;
            },
          }}
        >
          <View direction="row" justify="end" align="center" gap={4}>
            <View.Item columns={5}>
              <POSearch
                options={matchingPOs}
                searchValue={searchParam ? searchParam : searchValue}
                isSearchLoading={isLoadingPOs}
                label={t('PODashboard.Search.Placeholder')}
                onItemSearch={handleItemSearch}
                onPOItemClick={handleSearchItemClick}
              />
            </View.Item>
          </View>
        </MasterTitle>

        <View padding={6} align="center">
          <View direction="column" width="100%" className={styles['po-dashboard__search-content']}>
            <View.Item>
              <View direction="column" className={styles['po-dashboard__search-content__details']}>
                <View.Item>
                  <View>
                    <Text size="125" weight="bold">
                      {t('PODashboard.Search.ResultsFor', {
                        search: searchParam ? searchParam : searchValue,
                      })}
                    </Text>
                  </View>
                </View.Item>
                <View.Item>
                  <View>
                    <Text size="087" weight="medium">
                      {t('PODashboard.Search.Results', {
                        count: searchParam || searchValue ? matchingPOs?.length : 0,
                      })}
                    </Text>
                  </View>
                </View.Item>
              </View>
            </View.Item>

            {(searchParam || searchValue) && (
              <View.Item>
                <View
                  direction="column"
                  className={styles['po-dashboard__search-content__results']}
                >
                  {matchingPOs?.map((poSearchItem) => (
                    <Actionable onClick={() => handleSearchItemClick(poSearchItem)}>
                      <MasterCard
                        title={poSearchItem.vendorName}
                        priority={poSearchItem.priority}
                        tagItems={[
                          {
                            text: poSearchItem.poType,
                            variant: 'order',
                          },
                        ]}
                        statusBadgeProps={{
                          variant: statusToBadgeVariant(poSearchItem.status),
                          text: replaceAll(poSearchItem.status, '_', ' '),
                        }}
                        label={generateDateString(
                          poSearchItem.arrivalTime,
                          t('DateFormat.ShortTime')
                        )}
                        detailsData={{
                          data: [
                            {
                              label: t('PODashboard.PoWithNumber', {
                                poNumber: poSearchItem.poNumber,
                              }),
                            },
                            {
                              label: poSearchItem.door ? poSearchItem.door : '',
                            },
                            {
                              label: poSearchItem.location,
                            },
                          ],
                        }}
                        avatarGroupData={{
                          users: poSearchItem.users,
                          size: 'small',
                          maxDisplay: 2,
                        }}
                      />
                    </Actionable>
                  ))}
                </View>
              </View.Item>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
