/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { EmptyState } from '@shared/components/EmptyState/EmptyState.tsx';
import { Add, LicensePlateSearch } from '@az/starc-ui-icons';
import { Button, Icon, Text, View } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import { Table } from '@shared/components/Table/Table.tsx';
import {
  SUBZONE_ASSOCIATED_VEHICLE_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants.ts';
import { DEFAULT_PAGE, PAGE_SIZE } from '@shared/constants/constants.ts';
import { VEHICLE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';

import styles from './SubzoneVehicleList.module.scss';
import { mapSubzoneAssociatedVehicleTableRows } from '@mdm/utils/table/tableUtils.tsx';

type Props = {
  subzoneId?: string;
};

export const SubzoneVehicleList = ({ subzoneId }: Props) => {
  const { t } = useTranslation();

  const onSort = () => {
    // TODO API INTEGRATION FOR SORTING
  };

  return (
    <View className={styles['subzone-vehicle-list']} padding={6} gap={4} width="100%" height="100%">
      <View direction="row">
        <View.Item grow>
          <Text size="125" weight="bold">
            {t('SubzoneDetails.Tabs.Vehicle.Title')}
          </Text>
          <View direction="row" attributes={{ style: { marginTop: 'var(--st-unit-2)' } }}>
            <Text weight="regular">{t('SubzoneDetails.Tabs.Vehicle.Subtitle')}</Text>
          </View>
        </View.Item>
        <View.Item>
          <Button variant="secondary" size="small" disabled={!subzoneId}>
            <View direction="row" align="center" justify="center" gap={2}>
              <Icon svg={Add} />
              <Text>{t('AddVehicle')}</Text>
            </View>
          </Button>
        </View.Item>
      </View>

      {subzoneId ? (
        <Table
          columns={SUBZONE_ASSOCIATED_VEHICLE_TABLE_COLUMNS}
          rows={mapSubzoneAssociatedVehicleTableRows(VEHICLE_TABLE_ROWS)}
          isPaginated={true}
          isCheckboxDisabled={false}
          pageSize={PAGE_SIZE}
          defaultPage={DEFAULT_PAGE}
          isCreditItem={false}
          isCheckboxTable={false}
          styleVariant={TableStylingVariants.FILLED}
          totalPages={Math.ceil(VEHICLE_TABLE_ROWS.length / PAGE_SIZE)}
          onSort={onSort}
        />
      ) : (
        <View padding={6}>
          <EmptyState
            svg={LicensePlateSearch}
            subtitle={t('Empty.SubzoneVehicles.Subtitle')}
            text={t('Empty.SubzoneVehicles.Text')}
          />
        </View>
      )}
    </View>
  );
};
