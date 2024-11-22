/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { Text, View, classNames } from '@az/starc-ui';

import { KEY } from '@shared/constants/keyConstants';

import { PODashboardDataRowType } from '@inbound/types/types';

import * as T from './POSuggestion.types';
import styles from './POSuggestion.module.scss';

export const POSuggestion = ({
  data,
  maxEntries,
  searchValue,
  onItemClick,
  setSuggestionWasHidden,
}: T.Props) => {
  data = data?.slice(0, maxEntries);

  /* State variables */
  const [selectedItem, setSelectedItem] = useState<PODashboardDataRowType>();

  /* Functions */
  const handleSuggestionClick = (
    e: MouseEvent | KeyboardEvent,
    suggestion: PODashboardDataRowType
  ) => {
    e.preventDefault();

    onItemClick?.(suggestion);
    setSuggestionWasHidden?.(true);
  };

  const handleSearchValueClick = (e: MouseEvent | KeyboardEvent, searchValue: string) => {
    e.preventDefault();

    onItemClick?.(searchValue);
    setSuggestionWasHidden?.(true);
  };

  const handleKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      if (data) {
        let currentIndex = data?.findIndex((el) => el === selectedItem);
        const totalSuggestions = data?.length || 0;

        switch (e.key) {
          case KEY.ARROW_DOWN:
            currentIndex = ((currentIndex as number) + 1) % totalSuggestions;
            setSelectedItem(data?.[currentIndex]);
            break;
          case KEY.ARROW_UP:
            currentIndex = ((currentIndex as number) - 1 + totalSuggestions) % totalSuggestions;
            setSelectedItem(data?.[currentIndex]);
            break;
          case KEY.ENTER:
            if (data && data[currentIndex] && onItemClick) {
              onItemClick(data[currentIndex]);
              setSuggestionWasHidden?.(true);
            }
            break;
          case KEY.ESCAPE:
            setSuggestionWasHidden?.(true);
            break;
          default:
            break;
        }
      }
    },
    [data, onItemClick, selectedItem, setSuggestionWasHidden]
  );

  const renderSuggestions = (item: PODashboardDataRowType) => {
    const vendorName = item.vendorName;
    const poNumber = item.poNumber.toString();

    if (searchValue) {
      // Split on highlight term and include term into parts, ignore case
      const vendorNameParts = vendorName.split(new RegExp(`(${searchValue})`, 'gi'));
      const poNumberParts = poNumber.split(new RegExp(`(${searchValue})`, 'gi'));

      if (vendorNameParts.length > 1) {
        return (
          <>
            <View.Item>
              {vendorNameParts.map((part, index) => {
                return (
                  <Text
                    key={index}
                    as="span"
                    fontFamily="body"
                    size="100"
                    attributes={{ 'aria-label': part, 'data-testid': part }}
                    weight={part.toLowerCase() === searchValue.toLowerCase() ? 'regular' : 'bold'}
                    color="primary"
                  >
                    {part}
                  </Text>
                );
              })}
            </View.Item>
            <View.Item>
              <Text fontFamily="body" size="100" weight="bold">
                &#183;
              </Text>
            </View.Item>
            <View.Item>
              <Text fontFamily="body" size="100" weight="bold">
                {poNumber}
              </Text>
            </View.Item>
          </>
        );
      }

      if (poNumberParts.length > 1) {
        return (
          <>
            <View.Item>
              <Text fontFamily="body" size="100" weight="bold">
                {vendorName}
              </Text>
            </View.Item>
            <View.Item>
              <Text fontFamily="body" size="100" weight="bold">
                &#183;
              </Text>
            </View.Item>
            <View.Item>
              {poNumberParts.map((part, index) => {
                return (
                  <Text
                    key={index}
                    as="span"
                    fontFamily="body"
                    size="100"
                    attributes={{ 'aria-label': part, 'data-testid': part }}
                    weight={part.toLowerCase() === searchValue.toLowerCase() ? 'regular' : 'bold'}
                    color="primary"
                  >
                    {part}
                  </Text>
                );
              })}
            </View.Item>
          </>
        );
      }
    } else {
      return (
        <Text fontFamily="body" size="100" weight="bold">
          {vendorName} &#183; {poNumber}
        </Text>
      );
    }
  };

  /* Hooks */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent);
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [handleKeyEvent]);

  return (
    <View className={styles['po-suggestion__container']} direction="column">
      {searchValue && (
        <View
          key={searchValue}
          attributes={{
            onMouseDown: (e: MouseEvent) => handleSearchValueClick(e, searchValue),
            role: 'option',
          }}
          className={classNames(styles['po-suggestion'])}
        >
          <View direction="row" align="center">
            <Text fontFamily="body" size="100" weight="medium">
              {searchValue}
            </Text>
          </View>
        </View>
      )}

      {data?.map((el) => (
        <View
          key={el.poNumber}
          attributes={{
            onMouseDown: (e: MouseEvent) => handleSuggestionClick(e, el),
            role: 'option',
            'aria-selected': el === selectedItem,
          }}
          className={classNames(
            styles['po-suggestion'],
            el === selectedItem && styles['po-suggestion--active']
          )}
        >
          <View direction="row" align="center">
            {renderSuggestions(el)}
          </View>
        </View>
      ))}
    </View>
  );
};
