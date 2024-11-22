/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { t } from 'i18next';

import { AccordionGroup, Button, SearchBar, Select, Store, Text, View } from '@az/starc-ui';

import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { PAGE_URLS } from '@shared/constants/routes';

import { MatrixAccordion } from '@outbound/components/MatrixAccordion/MatrixAccordion';
import {
  DisplayOptionsType,
  MatrixRow,
} from '@outbound/components/MatrixAccordion/MatrixAccordion.types';
import { MatrixHeader } from '@outbound/components/MatrixAccordion/MatrixHeader';

import { DisplayOptions } from './DisplayOptions';
import { controlDeskData as data } from './data';
import { KEY, KEY_CODE } from '@shared/constants/keyConstants';
import styles from './ControlDesk.module.scss';
import { Overview } from './Overview';
import { Stat } from '@shared/components/Stat/Stat';
import { useAtom } from 'jotai';
import { useStoreSearch } from '@ofm/services/useStoreSearch';
import { warehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { EmptyState } from '@shared/components/EmptyState/EmptyState';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';

function reorderLocations(locationsList: MatrixRow[], fromPosition: number, toPosition: number) {
  const clonedLocationsList = [...locationsList];

  if (fromPosition < toPosition) {
    clonedLocationsList.splice(toPosition + 1, 0, clonedLocationsList[fromPosition]);
    clonedLocationsList.splice(fromPosition, 1);
  } else if (toPosition < fromPosition) {
    clonedLocationsList.splice(toPosition, 0, clonedLocationsList[fromPosition]);
    clonedLocationsList.splice(fromPosition + 1, 1);
  }

  return clonedLocationsList;
}

export const ControlDesk = () => {
  /* Atoms */
  const [warehouse] = useAtom(warehouseAtom);

  /* State variables */
  const [controlDeskData, setControlDeskData] = useState<MatrixRow[]>(data);
  const [draggedItemIdentifier, setDraggedItemIdentifier] = useState('');
  const [draggedOverContainerIdentifier, setDraggedOverContainerIdentifier] = useState('');
  const [open, setOpen] = useState<string[]>([]);
  const [storeOrderSearch, setStoreOrderSearch] = useState('');

  /* Constants */
  const navigate = useNavigate();

  /* Queries */
  const { matchingStores, hasNoResults, invalidId } = useStoreSearch(
    storeOrderSearch,
    warehouse.id
  );

  /* Functions */
  const setSearchParam = (param: string) => {
    navigate(PAGE_URLS.STORE_ORDER_DETAILS(param));
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
  const onSelectionChange = (value: string) => {
    if (value !== undefined) {
      setSearchParam(value);
    }
  };

  // Display Options Filter
  const [displayOptions, setDisplayOptions] = useState<DisplayOptionsType>({
    completedStores: true,
    waveDetails: false,
    vehicleCode: true,
    orderSelector: true,
    tileInfo: true,
  });

  /* Functions */
  const onExpand = () => {
    setOpen(data.map((row) => row.location));
  };

  const onCollapse = () => {
    setOpen([]);
  };

  const onDisplayOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setDisplayOptions((options) => ({ ...options, [target?.name]: target?.checked }));
  };

  const onDragStart = (value: string) => setDraggedItemIdentifier(value);
  const onDragEnd = () => clearState();
  const onDragEnter = (value: string) => setDraggedOverContainerIdentifier(value);
  const onDragExit = () => setDraggedOverContainerIdentifier('');
  const onDrop = () => {
    if (!draggedItemIdentifier || !draggedOverContainerIdentifier) {
      clearState();
      return;
    }

    const fromIndex = controlDeskData.findIndex((item) => item.location === draggedItemIdentifier);
    const toIndex = controlDeskData.findIndex(
      (item) => item.location === draggedOverContainerIdentifier
    );
    setControlDeskData((item) => reorderLocations(item, fromIndex, toIndex));

    clearState();
  };

  const clearState = () => {
    setDraggedItemIdentifier('');
    setDraggedOverContainerIdentifier('');
  };

  return (
    <View direction="column" height="100%">
      <MasterTitle
        title={t('MasterTitle.OutboundControlDesk')}
        // TODO: Add functionality to save page to favorites column
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        titleActionProps={{ label: 'Favorite', handleClick: () => {} }}
      >
        <View direction="row" justify="end" align="center" gap={4}>
          <View.Item columns={4}>
            <SearchBar
              value={storeOrderSearch}
              className={styles['search-bar']}
              onValueChange={setStoreOrderSearch}
              suggestions={hasNoResults ? <EmptySuggestions /> : matchingStores}
              label={t('Search.StoreNumber')}
              onSelectionChange={onSelectionChange}
              inputAttributes={{ onKeyDown: onKeyDown }}
              maxMenuHeight={300}
            />
          </View.Item>
          <View.Item>
            <DisplayOptions options={displayOptions} onChange={onDisplayOptionsChange} />
          </View.Item>
          <View.Item>
            <Button
              size="large"
              variant="primary"
              onClick={() => navigate(PAGE_URLS.ORDER_RELEASE)}
            >
              <View direction="row" align="center" justify="center" gap={2}>
                <Text>{t('MasterTitle.ReleaseOrders')}</Text>
              </View>
            </Button>
          </View.Item>
        </View>
      </MasterTitle>
      <>
        {hasNoResults ? (
          <View height="100%">
            <EmptyState
              svg={Store}
              subtitle={t('Empty.Search.Subtitle')}
              text={t('Empty.Search.Text', {
                value: invalidId,
              })}
            />
          </View>
        ) : (
          <>
            <View
              direction="row"
              justify="space-between"
              backgroundColor="secondary"
              padding={[4, 8]}
              className={styles['outbound-matrix__title-section']}
            >
              <View direction="row" gap={4}>
                <Stat
                  title={t('OutboundMatrix.TotalStoreReleased')}
                  primaryText="17"
                  width="160px"
                />
                <Stat
                  title={t('OutboundMatrix.ShiftProgress')}
                  primaryText="21.3%"
                  width="160px"
                  secondaryTextProps={{ secondaryText: '16/80' }}
                />
              </View>
              <Select
                label={t('OutboundMatrix.SortByDispatchRoutePlaceholder')}
                variant="no-label"
                id="sortBy-type"
                placeholder={t('OutboundMatrix.SortByDispatchRoutePlaceholder')}
                name="sortByDispatchRoute"
                options={[]}
              />
            </View>
            <View padding={[0, 1, 0, 0]} className={styles['outbound-matrix__container']}>
              <MatrixHeader
                displayOptions={displayOptions}
                onExpand={onExpand}
                onCollapse={onCollapse}
              />
              <AccordionGroup
                openAccordionNames={open}
                onGroupChange={(updatedNames) => setOpen(updatedNames)}
              >
                {controlDeskData.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className={`${styles['outbound-matrix__row--drag-item']} ${
                        row.location === draggedOverContainerIdentifier
                          ? styles['outbound-matrix__row--dragging']
                          : ''
                      }`}
                      onDrop={onDrop}
                      onDragEnter={() => onDragEnter(row.location)}
                      onDragExit={onDragExit}
                      onDragOver={(e) => e.preventDefault()}
                      onDragStart={() => onDragStart(row.location)}
                      onDragEnd={onDragEnd}
                      draggable
                    >
                      <MatrixAccordion row={row} open={open} displayOptions={displayOptions} />
                    </div>
                  );
                })}
              </AccordionGroup>
            </View>
          </>
        )}
      </>
      <Overview />
      <Outlet />
    </View>
  );
};
