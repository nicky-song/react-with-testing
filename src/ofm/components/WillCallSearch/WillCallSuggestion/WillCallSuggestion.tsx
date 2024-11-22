/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './WillCallSuggestion.types';
import { Text, View, classNames } from '@az/starc-ui';
import styles from './WillCallSuggestion.module.scss';
import { Tag } from '@shared/components/Tag/Tag';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { KEY } from '@shared/constants/keyConstants';
import { ProductType } from '@ofm/types/types';
import { ProductStatus, ProductStatusTranslationMap } from '@ofm/constants/constants';
import { useTranslation } from 'react-i18next';

export const WillCallSuggestion = ({
  data,
  maxEntries,
  onItemClick,
  setSuggestionWasHidden,
}: T.Props) => {
  const { t } = useTranslation();
  data = data?.slice(0, maxEntries);

  /* State variables */
  const [selectedItem, setSelectedItem] = useState<ProductType>();

  /* Functions */
  const handleSuggestionClick = (e: MouseEvent | KeyboardEvent, suggestion: ProductType) => {
    e.preventDefault();

    if (suggestion.status !== ProductStatus.DISABLED) {
      onItemClick?.(suggestion);
      setSuggestionWasHidden?.(true);
    }
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
            if (
              selectedItem?.status !== ProductStatus.DISABLED &&
              data &&
              data[currentIndex] &&
              onItemClick
            ) {
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

  /* Hooks */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent);
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [handleKeyEvent]);

  return (
    <View padding={[4, 0]} className={styles['will-call-suggestion__container']} direction="column">
      {data?.map((el) => (
        <View
          key={el.sku}
          attributes={{
            onMouseDown: (e: MouseEvent) => handleSuggestionClick(e, el),
            role: 'option',
            'aria-selected': el === selectedItem,
          }}
          className={classNames(
            styles['will-call-suggestion'],
            el === selectedItem && styles['will-call-suggestion--active'],
            el.status === ProductStatus.DISABLED && styles['will-call-suggestion--disabled']
          )}
        >
          <View direction="row" gap={2} align="center">
            <Text fontFamily="body" textCase="uppercase" size="100" weight="medium">
              {el.description}
            </Text>
            <Tag text={t(ProductStatusTranslationMap[el.status])} />
          </View>
          <View direction="row" gap={5} align="baseline">
            <Text size="087">{`${t('WillCall.Item.SKU')}: ${el.sku}`}</Text>
            <Text size="087">{`${t('WillCall.Item.PartNumber')}: ${el.partNumber}`}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
