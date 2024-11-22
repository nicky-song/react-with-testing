/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { EmptyState } from '@shared/components/EmptyState/EmptyState.tsx';
import { Add, LicensePlateSearch } from '@az/starc-ui-icons';
import { Button, Icon, Text, View } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import {
  SUBZONE_ASSOCIATED_LOCATION_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants.ts';
import { LOCATION_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { DEFAULT_PAGE, PAGE_SIZE } from '@shared/constants/constants.ts';
import { Table } from '@shared/components/Table/Table.tsx';
import { LocationListRowTypes } from '@shared/components/Table/Table.types.ts';
import { mapSubzoneAssociatedLocationTableRows } from '@mdm/utils/table/tableUtils.tsx';

type Props = {
  subzoneId?: string;
};

export const SubzoneLocationList = ({ subzoneId }: Props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<LocationListRowTypes[]>([]);

  useEffect(() => {
    if (subzoneId) {
      setData([...LOCATION_TABLE_ROWS].slice(0, 4));
    }
  }, [subzoneId]);

  const onSort = () => {
    // TODO API INTEGRATION FOR SORTING
  };

  return (
    <View padding={6} gap={4} width="100%" height="100%">
      <View direction="row">
        <View.Item grow>
          <Text size="125" weight="bold">
            {t('SubzoneDetails.Tabs.Location.Title')}
          </Text>
        </View.Item>
        <View.Item>
          <Button variant="secondary" size="small" disabled={!subzoneId}>
            <View direction="row" align="center" justify="center" gap={2}>
              <Icon svg={Add} />
              <Text>{t('CreateLocation')}</Text>
            </View>
          </Button>
        </View.Item>
      </View>
      {subzoneId ? (
        <Table
          columns={SUBZONE_ASSOCIATED_LOCATION_TABLE_COLUMNS}
          rows={mapSubzoneAssociatedLocationTableRows(data)}
          isPaginated={true}
          isCheckboxDisabled={false}
          pageSize={PAGE_SIZE}
          defaultPage={DEFAULT_PAGE}
          isCreditItem={false}
          isCheckboxTable={false}
          styleVariant={TableStylingVariants.FILLED}
          totalPages={Math.ceil(data.length / PAGE_SIZE)}
          onSort={onSort}
        />
      ) : (
        <View padding={6}>
          <EmptyState
            svg={LicensePlateSearch}
            subtitle={t('Empty.SubzoneLocations.Subtitle')}
            text={t('Empty.SubzoneLocations.Text')}
          />
        </View>
      )}
    </View>
  );
};
