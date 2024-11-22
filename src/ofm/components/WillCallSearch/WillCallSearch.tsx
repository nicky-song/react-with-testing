/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as T from './WillCallSearch.types';
import { SearchBar, View, classNames } from '@az/starc-ui';
import styles from './WillCallSearch.module.scss';
import { WillCallSuggestion } from './WillCallSuggestion/WillCallSuggestion';
import { Ref, useRef, useState } from 'react';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';
import { ProductType } from '@ofm/types/types';
import { WillCallSuggestionSkeleton } from './WillCallSuggestion/WillCallSuggestionSkeleton';

export const WillCallSearch = ({
  options,
  id,
  className,
  label,
  isSearchLoading,
  onItemSearch,
  onWillCallItemClick,
}: T.Props) => {
  /* State variables */
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  /* Functions */
  const handleItemSelect = (item: ProductType) => {
    onWillCallItemClick(item);
    setValue('');
    ref.current?.focus();
  };

  const handleItemSearch = (search: string) => {
    onItemSearch(search);
    setValue(search);
  };

  const handleSearchSuggestions = () => {
    if (isSearchLoading) {
      return <WillCallSuggestionSkeleton />;
    } else if (options && options.length > 0) {
      return <WillCallSuggestion onItemClick={handleItemSelect} data={options} maxEntries={5} />;
    } else {
      return <EmptySuggestions />;
    }
  };

  return (
    <View className={styles['will-call-search']}>
      <SearchBar
        id={id}
        label={label}
        value={value}
        hideSuggestions={!value}
        onValueChange={handleItemSearch}
        ref={ref as Ref<HTMLInputElement>}
        className={classNames(styles['will-call-search__search'], className)}
        suggestions={handleSearchSuggestions()}
      />
    </View>
  );
};
