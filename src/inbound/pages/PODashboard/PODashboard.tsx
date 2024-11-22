/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Add,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Icon,
  Text,
  View,
  classNames,
} from '@az/starc-ui';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { Stat } from '@shared/components/Stat/Stat';
import { Table } from '@shared/components/Table/Table';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';
import { SortRowsParam } from '@shared/components/Table/Table.types';
import { DEFAULT_PAGE, PAGE_SIZE } from '@shared/constants/constants';
import { KEY } from '@shared/constants/keyConstants';
import { PAGE_URLS } from '@shared/constants/routes';

import { statusToBadgeVariant } from '@inbound/utils/utils';
import {
  mapPODashboardTableAgeBreakdownRows,
  mapPODashboardTableRows,
} from '@inbound/utils/table/tableUtils';
import { ListKanbanToggle } from '@inbound/components/ListKanbanToggle/ListKanbanToggle';
import { AddPOModal } from '@inbound/components/AddPOModal/AddPOModal';
import { POSearch } from '@inbound/components/POSearch/POSearch';
import { LIST, KANBAN, POActions } from '@inbound/constants/constants';
import {
  ARRIVAL_TIMES,
  PO_CATEGORIES,
  PO_DASHBOARD_ROWS,
  PO_DASHBOARD_ROWS_AGE_BREAKDOWN_72,
  PO_DASHBOARD_ROWS_AGE_BREAKDOWN_48,
  PO_DASHBOARD_ROWS_AGE_BREAKDOWN_24,
  SEARCH_PROPERTIES,
} from '@inbound/constants/dataConstants';
import { PO_DASHBOARD_TABLE_COLUMNS } from '@inbound/constants/tableConstants';
import { PODashboardDataRowType, PODashboardDividerRowType } from '@inbound/types/types';

import styles from './PODashboard.module.scss';
import { usePOSearch } from '@inbound/services/usePOSearch';
import { useAtom } from 'jotai';
import { searchAtom } from '@ofm/atoms/search/searchInputAtom';
import { locationManager } from '@ofm/services/locationManager';
import { DropdownSelectMenu } from '@inbound/components/DropdownSelectMenu/DropdownSeletMenu';

export const PODashboard = () => {
  /* Atoms */
  const [searchValue, setSearchValue] = useAtom(searchAtom);

  /* State variables */
  const [currentView, setCurrentView] = useState<string>(LIST);
  const [showAddPOModal, setShowAddPOModal] = useState(false);
  const [ageBreakDown, setAgeBreakDown] = useState(false);
  const [openArrivalFilter, setOpenArrivalFilter] = useState(false);
  const [arrivalFilters, setArrivalFilters] = useState<string[]>([]);
  const [openPOCategoryFilter, setOpenPOCategoryFilter] = useState(false);
  const [poCategory, setPOCategory] = useState<string>('');
  const [poDashboardAgeBreakDownRows, setPoDashboardAgeBreakDownRows] = useState<
    PODashboardDividerRowType[]
  >(PO_DASHBOARD_ROWS_AGE_BREAKDOWN_24);
  const arrivalFilterDropdownRef = useRef<HTMLDivElement | null>(null);

  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* Queries */
  const { matchingPOs, isLoadingPOs } = usePOSearch(searchValue);

  /* Functions */
  const handleItemSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchItemClick = (item: PODashboardDataRowType | string) => {
    if (typeof item === 'string') {
      navigate(PAGE_URLS.PO_DASHBOARD_SEARCH);
      locationManager.setQueryParameter(SEARCH_PROPERTIES.PO.queryParam, item);
    } else {
      navigate(PAGE_URLS.PO_DETAILS(item.poNumber));
    }
  };

  const onListKanbanToggle = (selectedView: string) => {
    setCurrentView(selectedView);
  };

  const onCloseAddPOModal = () => {
    setShowAddPOModal(false);
  };

  const togglePOCategoryFilterDropdown = () => setOpenPOCategoryFilter(!openPOCategoryFilter);

  const toggleArrivalFilterDropdown = () => setOpenArrivalFilter(!openArrivalFilter);

  const handleArrivalFilterChange = (value: string[]) => {
    if (value.length > 0) {
      // @todo : replace this while working with backend integration
      if (
        value.includes('last24Hours') &&
        value.includes('24-48HoursAgo') &&
        value.includes('48-72HoursAgo')
      ) {
        setPoDashboardAgeBreakDownRows([
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_72,
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_48,
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_24,
        ]);
      } else if (value.includes('last24Hours') && value.includes('24-48HoursAgo')) {
        setPoDashboardAgeBreakDownRows([
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_48,
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_24,
        ]);
      } else if (value.includes('last24Hours') && value.includes('48-72HoursAgo')) {
        setPoDashboardAgeBreakDownRows([
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_72,
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_24,
        ]);
      } else if (value.includes('24-48HoursAgo') && value.includes('48-72HoursAgo')) {
        setPoDashboardAgeBreakDownRows([
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_72,
          ...PO_DASHBOARD_ROWS_AGE_BREAKDOWN_48,
        ]);
      } else if (value.includes('48-72HoursAgo')) {
        setPoDashboardAgeBreakDownRows(PO_DASHBOARD_ROWS_AGE_BREAKDOWN_72);
      } else if (value.includes('24-48HoursAgo')) {
        setPoDashboardAgeBreakDownRows(PO_DASHBOARD_ROWS_AGE_BREAKDOWN_48);
      } else if (value.includes('last24Hours')) {
        setPoDashboardAgeBreakDownRows(PO_DASHBOARD_ROWS_AGE_BREAKDOWN_24);
      } else if (value.includes('72+HoursAgo')) {
        setPoDashboardAgeBreakDownRows([]);
      }

      setAgeBreakDown(true);
    } else {
      setAgeBreakDown(false);
    }

    setArrivalFilters(value);
  };

  const onActionMenuClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    poNumber: number,
    action: string
  ) => {
    event.stopPropagation();

    if (action === POActions.VIEW_DETAILS) {
      navigate(PAGE_URLS.PO_DETAILS(poNumber));
    } else if (action === POActions.EDIT_DETAILS) {
      navigate(PAGE_URLS.PO_EDIT(poNumber));
    } else if (action === POActions.PUT_ON_HOLD) {
      navigate(PAGE_URLS.PO_PUT_ON_HOLD(poNumber));
    } else if (action === POActions.REMOVE) {
      navigate(PAGE_URLS.PO_REMOVE(poNumber));
    }
  };

  const handleTableRowClick = (clickedRow: SortRowsParam) => {
    navigate(PAGE_URLS.PO_DETAILS(clickedRow.id));
  };

  /* Hooks */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = (event as MouseEvent).target || (event as TouchEvent).targetTouches[0];
      if (
        arrivalFilterDropdownRef.current &&
        !arrivalFilterDropdownRef.current.contains(target as Node) &&
        openArrivalFilter
      ) {
        setOpenArrivalFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openArrivalFilter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEY.ESCAPE && openArrivalFilter) {
        setOpenArrivalFilter(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openArrivalFilter]);

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
          statusBadgeProps={{
            variant: statusToBadgeVariant('COMPLETED'),
            text: t('PODashboard.Stats.HoursLeft', { count: 4 }),
          }}
          subtitle={
            <View direction="row" gap={4}>
              <View.Item>
                <Text color="600">{t('PODashboard.Stats.Shift', { shift: '2nd' })}</Text>
              </View.Item>
              <View.Item>
                <Text color="600">{t('PODashboard.Stats.Receivers', { count: 10 })}</Text>
              </View.Item>
            </View>
          }
        >
          <View direction="row" justify="end" align="center" gap={4}>
            <View.Item columns={5}>
              <POSearch
                options={matchingPOs}
                isSearchLoading={isLoadingPOs}
                label={t('PODashboard.Search.Placeholder')}
                onItemSearch={handleItemSearch}
                onPOItemClick={handleSearchItemClick}
              />
            </View.Item>
            <View.Item>
              <Button size="large" onClick={() => setShowAddPOModal(true)}>
                <View direction="row" align="center" justify="center" gap={2}>
                  <Icon svg={Add} color="on-primary" />
                  <Text>{t('PODashboard.AddAPurchaseOrder')}</Text>
                </View>
              </Button>
            </View.Item>
          </View>
        </MasterTitle>

        <View
          direction="row"
          justify="center"
          padding={[4, 6]}
          backgroundColor="secondary"
          className={styles['po-dashboard__statistics-section']}
        >
          <View.Item grow>
            <View
              direction="row"
              className={styles['po-dashboard__statistics-section__statistics']}
            >
              <Stat title={t('PODashboard.Stats.TotalRemaining')} primaryText="76" width="160px" />
              <Stat title={t('PODashboard.Stats.RegularPOsRemaining')} primaryText="58" />
              <Stat title={t('PODashboard.Stats.DSDPOsRemaining')} primaryText="18" width="160px" />
              <Stat title={t('PODashboard.Stats.LTDPOsRemaining')} primaryText="0" width="160px" />
            </View>
          </View.Item>
        </View>

        <View
          direction="row"
          padding={[4, 6]}
          backgroundColor="secondary"
          className={styles['po-dashboard__filters-section']}
        >
          <View.Item>
            <View justify="center" align="start">
              <ListKanbanToggle onToggle={onListKanbanToggle} />
            </View>
          </View.Item>
          <View.Item>
            <View direction="row" gap={4}>
              <Dropdown
                width={160}
                open={openPOCategoryFilter}
                className={styles['po-dashboard__filters-section__dropdown']}
              >
                <Dropdown.Button label="All POs" onClick={togglePOCategoryFilterDropdown} />
                <Dropdown.Content>
                  <View gap={2}>
                    {PO_CATEGORIES.map((category, index) => (
                      <Button
                        className={classNames(
                          styles['po-dashboard__filters-section__dropdown__button'],
                          styles['dropdown-item']
                        )}
                        key={t('PODashboard.ItemKey', { item: 'poCategory', key: index })}
                        animateOnClick={false}
                        onClick={() => {
                          setPOCategory(category.value);
                        }}
                      >
                        <Text
                          size="087"
                          fontFamily="body"
                          color="primary"
                          className={styles['po-dashboard__filters-section__dropdown__button-text']}
                        >
                          {category.label}
                        </Text>
                      </Button>
                    ))}
                  </View>
                </Dropdown.Content>
              </Dropdown>
              <DropdownSelectMenu
                width={320}
                options={ARRIVAL_TIMES}
                name="arrivalTimeFilter"
                label="All Arrival Time"
                onChange={handleArrivalFilterChange}
              />
              <Dropdown
                width={320}
                open={openArrivalFilter}
                className={styles['po-dashboard__filters-section__dropdown']}
              >
                <Dropdown.Button label="All Arrival Time" onClick={toggleArrivalFilterDropdown} />
                <Dropdown.Content>
                  <View gap={1} padding={[2, 0]}>
                    <Checkbox.Group
                      name="arrivalTimeFilter"
                      onValueChange={(value) => handleArrivalFilterChange(value)}
                      value={arrivalFilters}
                    >
                      <View gap={4}>
                        {ARRIVAL_TIMES.map((arrivalTime, index) => (
                          <Checkbox
                            key={t('PODashboard.ItemKey', { item: 'arrivalTime', key: index })}
                            label={arrivalTime.label}
                            value={arrivalTime.value}
                          />
                        ))}
                      </View>
                    </Checkbox.Group>
                    <Divider color="300" />
                    <View padding={4}>
                      <Text size="087" weight="medium" variant="text-link">
                        {t('PODashboard.ResetAll')}
                      </Text>
                    </View>
                  </View>
                </Dropdown.Content>
              </Dropdown>
            </View>
          </View.Item>
        </View>

        {currentView === LIST && (
          <View padding={[4, 6]}>
            <Table
              columns={PO_DASHBOARD_TABLE_COLUMNS}
              rows={
                ageBreakDown
                  ? mapPODashboardTableAgeBreakdownRows(
                      poDashboardAgeBreakDownRows,
                      onActionMenuClick
                    )
                  : mapPODashboardTableRows(PO_DASHBOARD_ROWS, onActionMenuClick)
              }
              isPaginated={true}
              isCheckboxDisabled={false}
              pageSize={ageBreakDown ? poDashboardAgeBreakDownRows.length : PAGE_SIZE}
              defaultPage={DEFAULT_PAGE}
              isCreditItem={false}
              isCheckboxTable={false}
              styleVariant={TableStylingVariants.DETAILS}
              totalPages={
                ageBreakDown
                  ? Math.ceil(poDashboardAgeBreakDownRows.length / PAGE_SIZE)
                  : Math.ceil(PO_DASHBOARD_ROWS.length / PAGE_SIZE)
              }
              // TODO: implement sorting from the BFF
              onSort={(_sorting) => {
                return;
              }}
              onRowAction={(clickedRow) => handleTableRowClick(clickedRow)}
            />
          </View>
        )}

        {currentView === KANBAN && (
          <View padding={[4, 6]} align="center">
            <Text size="250">{t('KanbanView')}</Text>
          </View>
        )}
      </View>

      <AddPOModal isOpen={showAddPOModal} onClose={onCloseAddPOModal} />
    </>
  );
};
