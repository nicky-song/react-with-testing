/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { View } from '@az/starc-ui';
import { PAGE_URLS } from '@shared/constants/routes.ts';
import { Table } from '@shared/components/Table/Table.tsx';
import {
  SUBZONE_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants.ts';
import { SUBZONE_TABLE_ROWS } from '@shared/components/Table/tableMockData.ts';
import { SubZoneListRowTypes } from '@shared/components/Table/Table.types.ts';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PAGE, PAGE_SIZE } from '@shared/constants/constants.ts';
import { mapSubzoneTableRows } from '@mdm/utils/table/tableUtils.tsx';
import { DetailsTableSkeleton } from '@shared/components/Skeletons/DetailsTableSkeleton';

export const SubzoneList = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onViewDetails = (subzone: SubZoneListRowTypes) => {
    navigate(PAGE_URLS.SUB_ZONE_DETAILS(String(subzone.id)));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // fake the api delay
    }, 2000);
  }, []);

  return (
    <View>
      <View padding={[4, 6]}>
        {isLoading ? (
          <DetailsTableSkeleton />
        ) : (
          <Table
            columns={SUBZONE_TABLE_COLUMNS}
            rows={mapSubzoneTableRows(SUBZONE_TABLE_ROWS, onViewDetails)}
            isPaginated={true}
            isCheckboxDisabled={false}
            pageSize={PAGE_SIZE}
            defaultPage={DEFAULT_PAGE}
            isCreditItem={false}
            isCheckboxTable={false}
            styleVariant={TableStylingVariants.DETAILS}
            totalPages={Math.ceil(SUBZONE_TABLE_ROWS.length / PAGE_SIZE)}
            onSort={() => {
              return;
            }}
          />
        )}
      </View>
    </View>
  );
};
