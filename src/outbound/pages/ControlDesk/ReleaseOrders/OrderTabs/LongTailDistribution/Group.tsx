/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';

import { View, Text, Button, Icon, classNames } from '@az/starc-ui';
import { Checkmark } from '@az/starc-ui-icons';

import { OrderReleaseStoreOrderRowTypes } from '@shared/components/Table/Table.types';
import { Item } from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion.types';

import { releaseOrders } from '../data';

import styles from './LongTailDistribution.module.scss';
import { ltdGroupingRecommendationsAtom } from '@outbound/atoms/releaseOrder/releaseOrderAtom';

export type GroupProps = {
  item: Item;
  grouped: string[][];
  setGrouped: React.Dispatch<React.SetStateAction<string[][]>>;
};

export const Group = ({ item, grouped, setGrouped }: GroupProps) => {
  /* Atoms */
  const [groupingRecommendations] = useAtom(ltdGroupingRecommendationsAtom);

  /* variables */
  const { id, pcs, pallets, stores = [] } = item;

  /* Constants */
  const { t } = useTranslation();

  /* functions */
  const groupStores = (
    groupingRecommendations: string[][],
    stores: OrderReleaseStoreOrderRowTypes[]
  ) => {
    return groupingRecommendations
      .map(
        (group) =>
          group
            .map((storeNumber) => stores.find((store) => store.storeNumber === storeNumber))
            .filter(Boolean) as OrderReleaseStoreOrderRowTypes[]
      )
      .filter((group) => group.length);
  };

  const onGrouped = (group: OrderReleaseStoreOrderRowTypes[]) => {
    const storeNumbers = group.map((store) => store.storeNumber);
    setGrouped((grouped) => [...grouped, storeNumbers]);
  };

  const onUngroupd = (storeNumber: string) => {
    const updatedGrouped = grouped.filter((group) => group[0] !== storeNumber);
    setGrouped(updatedGrouped);
  };

  const isInGrouped = (storeNumber: string) => grouped.flat().includes(storeNumber);

  if (!groupStores(groupingRecommendations, stores).length) return null;

  return (
    <View backgroundColor="secondary" className={styles['group']}>
      <View padding={4} width="100%" direction="row" className={styles['group__header']}>
        <Text size="100" weight="bold">
          {`${t(releaseOrders.ltdOrders.label)} ${id}`}
        </Text>
        <Text>{t('OutboundMatrix.OrderRelease.NumberOfStores', { count: stores?.length })}</Text>
        <Text>{t('OutboundMatrix.OrderRelease.Pallet', { count: pallets })}</Text>
        <Text>{t('OutboundMatrix.OrderRelease.Pieces', { count: pcs })}</Text>
      </View>
      <View className={styles['group__content']}>
        <View padding={[2, 4]} direction="row" className={styles['group__content-header-wrapper']}>
          <View direction="row" wrap={false} className={styles['group__content-header']}>
            <View.Item grow>
              <View padding={[0, 0, 0, 4]}>
                <Text>{t('Table.OrderRelease.StoreNumber')}</Text>
              </View>
            </View.Item>
            <View.Item grow>
              <View>
                <Text>{t('Table.OrderRelease.Pallets')}</Text>
              </View>
            </View.Item>
            <View.Item grow>
              <View>
                <Text>{t('Table.OrderRelease.Pieces')}</Text>
              </View>
            </View.Item>
          </View>
          <View className={styles['group__btn']} />
        </View>

        {groupStores(groupingRecommendations, stores).map((storeGroup) => (
          <View
            width="100%"
            padding={4}
            direction="row"
            wrap={false}
            justify="space-between"
            className={styles['group__content-frame']}
          >
            <View
              direction="column"
              className={classNames(
                styles['group__row-wrapper'],
                isInGrouped(storeGroup[0].storeNumber) && styles['group__row-wrapper-grouped']
              )}
            >
              {storeGroup.map((store) => (
                <View
                  padding={[4, 0]}
                  align="center"
                  direction="row"
                  className={styles['group__row-wrapper__row']}
                  width="100%"
                  wrap={false}
                >
                  <View.Item grow>
                    <View padding={[0, 4]}>
                      <Text>{store.storeNumber}</Text>
                    </View>
                  </View.Item>
                  <View.Item grow>
                    <View padding={[0, 2]}>
                      <Text>{store.pallets}</Text>
                    </View>
                  </View.Item>
                  <View.Item grow>
                    <View padding={[0, 2]}>
                      <Text>{store.pieces}</Text>
                    </View>
                  </View.Item>
                </View>
              ))}
            </View>
            <View align="center" justify="end">
              {isInGrouped(storeGroup[0].storeNumber) ? (
                <View
                  borderRadius="small"
                  borderColor="success"
                  className={classNames(styles['group__btn-success'], styles['group__btn'])}
                >
                  <Button
                    variant="ghost"
                    iconColor="success"
                    fontColor="success"
                    startIcon={<Icon svg={Checkmark} color="green-200" size={6} />}
                    onClick={() => onUngroupd(storeGroup[0].storeNumber)}
                  >
                    {t('OutboundMatrix.Grouping.Grouped')}
                  </Button>
                </View>
              ) : (
                <View className={styles['group__btn']}>
                  <Button variant="secondary" onClick={() => onGrouped(storeGroup)}>
                    {t('OutboundMatrix.Grouping.GroupOrders')}
                  </Button>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
