/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View } from '@az/starc-ui';
import { useGetOrders } from '@ofm/services/hooks/useGetOrders';
import { CommentCard } from '@shared/components/CommentCard/CommentCard';
import { ExtendedCard } from '@shared/components/ExtendedCard/ExtendedCard';
import { useTranslation } from 'react-i18next';
import { generateDateString } from '@ofm/utils/utils';
import { CheckBoxCard } from '@shared/components/CheckBoxCard/CheckBoxCard';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';

export const Orders = () => {
  const { ordersData, isLoading, isError } = useGetOrders();
  const { t } = useTranslation();

  if (isLoading) {
    return <View>Loading...</View>;
  }

  if (isError) {
    return <View>An unrecoverable error has happened</View>;
  } else if (!ordersData) {
    return <View>A data error has happened</View>;
  }

  return (
    <View width="100%" height="100%" padding={[0, 4]}>
      <CommentCard
        username="kwheeler"
        comment="Lorem ipsum dolor sit amet consectetur."
        timestamp={new Date()}
      />
      <View padding={[0, 0, 2, 0]} />
      <CheckBoxCard
        title="000357"
        label={generateDateString(new Date(), '', t('CloseBy'))}
        statusBadge={{ variant: StatusVariants.NOT_STARTED, text: t('OrderStatus.NotStarted') }}
        onChangeHandler={function (title: string): void {
          throw new Error('Function not implemented.' + title);
        }}
        isChecked={false}
      />
      <View padding={[0, 0, 2, 0]} />
      <CheckBoxCard
        shouldHideCheckbox={true}
        title="000357"
        label={generateDateString(new Date(), '', t('CloseBy'))}
        statusBadge={{ variant: StatusVariants.IN_PROGRESS, text: t('OrderStatus.InProgress') }}
        onChangeHandler={function (title: string): void {
          throw new Error('Function not implemented.' + title);
        }}
        isChecked={false}
      />
      <View padding={[0, 0, 2, 0]} />
      <CheckBoxCard
        isCheckboxDisabled={true}
        title="000357"
        label={generateDateString(new Date(), '', t('CloseBy'))}
        statusBadge={{ variant: StatusVariants.COMPLETED, text: t('OrderStatus.Completed') }}
        onChangeHandler={function (title: string): void {
          throw new Error('Function not implemented.' + title);
        }}
        isChecked={false}
      />
      <View padding={[0, 0, 2, 0]} />
      <CheckBoxCard
        isCardDisabled={true}
        title="000357"
        label={generateDateString(new Date(), '', t('CloseBy'))}
        statusBadge={{ variant: StatusVariants.CANCELLED, text: t('OrderStatus.Cancelled') }}
        onChangeHandler={function (title: string): void {
          throw new Error('Function not implemented.' + title);
        }}
        isChecked={false}
      />
      <View padding={[0, 0, 2, 0]} />
      <CheckBoxCard
        title="000357"
        label={generateDateString(new Date(), '', t('CloseBy'))}
        onChangeHandler={function (title: string): void {
          throw new Error('Function not implemented.' + title);
        }}
        isChecked={false}
      />
      <View padding={[0, 0, 2, 0]} />
      <CheckBoxCard
        isInErrorState={true}
        title="000357"
        label={generateDateString(new Date(), '', t('CloseBy'))}
        statusBadge={{ variant: StatusVariants.CANCELLED, text: t('OrderStatus.Cancelled') }}
        onChangeHandler={function (title: string): void {
          throw new Error('Function not implemented.' + title);
        }}
        isChecked={false}
      />
      <View padding={[0, 0, 2, 0]} />
      <ExtendedCard
        title="Wave 1A"
        label={generateDateString(new Date(), '', t('RequestBy'))}
        subtext="12/20 Stores"
        statusBadge={{ variant: StatusVariants.NOT_STARTED, text: 'Not Started' }}
      />
      <View padding={[0, 0, 2, 0]} />
      <ExtendedCard
        title="Wave 1A"
        label={generateDateString(new Date(), '', t('RequestBy'))}
        subtext="12/20 Stores"
        isCardDisabled={true}
        statusBadge={{ variant: StatusVariants.COMPLETED, text: 'Completed' }}
      />
      <View padding={[0, 0, 2, 0]} />
      <ExtendedCard
        title="Wave 1A"
        label={generateDateString(new Date(), '', t('RequestBy'))}
        subtext="12/20 Stores"
        isErrorState={true}
        statusBadge={{ variant: StatusVariants.IN_PROGRESS, text: 'In Progress' }}
      />
    </View>
  );
};
