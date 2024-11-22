/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Header } from '../Header.tsx';
import { Actionable, classNames, Link, Text, View } from '@az/starc-ui';
import {
  TableStylingVariants,
  WAREHOUSE_CONFIGURATION_TABLE_COLUMNS,
} from '@shared/components/Table/tableConstants.ts';
import { Table } from '@shared/components/Table/Table.tsx';
import { WarehouseConfigurationRowTypes } from '@shared/components/Table/Table.types.ts';
import { WAREHOUSE_CONFIGURATION_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './General.module.scss';
import { DEFAULT_PAGE } from '@shared/constants/constants.ts';
import { WAREHOUSE_CONFIGURATION_TABLE_PAGE_SIZE } from '@mdm/constants/constants.ts';

export const General = () => {
  const { t } = useTranslation();
  const [selectedNavigationTab, setSelectedNavigationTab] = useState('#introduction-to-wms');

  const inPageNavigationTabs = [
    {
      href: '#introduction-to-wms',
      title: t('InPageNavigationTabs.GeneralFAQ.IntroductionToWMS'),
    },
    {
      href: '#roles-and-permission',
      title: t('InPageNavigationTabs.GeneralFAQ.RolesAndPermission'),
    },
    {
      href: '#distribution-centres',
      title: t('InPageNavigationTabs.GeneralFAQ.DistributionCentres'),
    },
  ];

  const mapWarehouseConfigurationTableRows = (rows: WarehouseConfigurationRowTypes[]) => {
    return rows.map((warehouse) => ({
      id: warehouse.id.toString(),
      cells: [
        { value: `DC ${warehouse.dcNumber}`, sortValue: warehouse.dcNumber.toString() },
        { value: warehouse.address, sortValue: warehouse.address },
        { value: warehouse.description, sortValue: warehouse.description },
        { value: warehouse.contactNumber || '-', sortValue: warehouse.contactNumber },
      ],
    }));
  };

  return (
    <View className={styles['faq']} direction="column" height="100vh" backgroundColor="secondary">
      <Header />
      <View backgroundColor="secondary" direction="row" padding={[4, 6]}>
        <View.Item columns={{ l: 8 }}>
          <View attributes={{ id: 'introduction-to-wms' }}>
            <Text className={styles['faq__header-text']} size="125" weight="bold">
              {t('InPageNavigationTabs.GeneralFAQ.IntroductionToWMS')}
            </Text>
          </View>

          <View attributes={{ id: 'roles-and-permission' }}>
            <Text className={styles['faq__header-text']} size="125" weight="bold">
              {t('InPageNavigationTabs.GeneralFAQ.RolesAndPermission')}
            </Text>
          </View>

          <View attributes={{ id: 'distribution-centres' }}>
            <Text className={styles['faq__header-text']} size="125" weight="bold">
              {t('FAQ.GeneralFAQ.FAQ3.Title')}
            </Text>

            <Text className={styles['faq__title']} weight="bold">
              {t('FAQ.GeneralFAQ.FAQ3.Content1.Title')}
            </Text>

            <Text className={styles['faq__description']} color="500">
              {t('FAQ.GeneralFAQ.FAQ3.Content1.Description')}
            </Text>

            <Text className={styles['faq__title']} weight="bold">
              {t('FAQ.GeneralFAQ.FAQ3.Content2.Title')}
            </Text>

            <Text className={styles['faq__description']} color="500">
              {t('FAQ.GeneralFAQ.FAQ3.Content2.Description')}&nbsp;
              <Link href="/">
                <Text
                  className={styles['faq__description-link-text']}
                  variant="inline-link"
                  color="focus"
                >
                  {t('Here')}.
                </Text>
              </Link>
            </Text>

            <Table
              columns={WAREHOUSE_CONFIGURATION_TABLE_COLUMNS}
              rows={mapWarehouseConfigurationTableRows(WAREHOUSE_CONFIGURATION_TABLE_ROWS)}
              isPaginated={false}
              isCheckboxDisabled={false}
              pageSize={WAREHOUSE_CONFIGURATION_TABLE_PAGE_SIZE}
              defaultPage={DEFAULT_PAGE}
              isCreditItem={false}
              isCheckboxTable={false}
              styleVariant={TableStylingVariants.DEFAULT}
              totalPages={Math.ceil(
                WAREHOUSE_CONFIGURATION_TABLE_ROWS.length / WAREHOUSE_CONFIGURATION_TABLE_PAGE_SIZE
              )}
              onSort={() => ({})}
            />
          </View>
        </View.Item>

        <View.Item className={styles['in-page-navigation']} columns={{ l: 4 }}>
          <View className={styles['in-page-navigation__menu']}>
            <Text size="075" weight="bold" color="500" textCase="uppercase">
              {t('InThisPage')}
            </Text>
          </View>

          {inPageNavigationTabs.map((tab) => {
            return (
              <View
                key={tab.href}
                className={classNames(
                  styles['in-page-navigation-item'],
                  tab.href === selectedNavigationTab && styles['in-page-navigation-item--active']
                )}
                direction="row"
                align="center"
                padding={[0, 0, 2, 6]}
              >
                <Actionable href={tab.href} onClick={() => setSelectedNavigationTab(tab.href)}>
                  <Text weight="bold">{tab.title}</Text>
                </Actionable>
              </View>
            );
          })}
        </View.Item>
      </View>
    </View>
  );
};
