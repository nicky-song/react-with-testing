/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState, useEffect } from 'react';

import { View } from '@az/starc-ui';

import { DetailsTableSkeleton } from '@shared/components/Skeletons/DetailsTableSkeleton';
import { Table } from '@shared/components/Table/Table';
import { TableStylingVariants } from '@shared/components/Table/tableConstants';
import { PAGE_SIZE, DEFAULT_PAGE } from '@shared/constants/constants';

import { PO_DETAILS_PRODUCT_ROWS, PO_DASHBOARD_ROWS } from '@inbound/constants/dataConstants';
import { PO_DETAILS_PRODUCT_TABLE_COLUMNS } from '@inbound/constants/tableConstants';
import { mapPODetailProductTabelRows } from '@inbound/utils/table/tableUtils';

export const ProductTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // fake the api delay
    }, 1000);
  }, []);

  return isLoading ? (
    <DetailsTableSkeleton />
  ) : (
    <View padding={6}>
      <Table
        columns={PO_DETAILS_PRODUCT_TABLE_COLUMNS}
        rows={mapPODetailProductTabelRows(PO_DETAILS_PRODUCT_ROWS)}
        isPaginated={true}
        isCheckboxDisabled={false}
        pageSize={PAGE_SIZE}
        defaultPage={DEFAULT_PAGE}
        isCreditItem={false}
        isCheckboxTable={false}
        styleVariant={TableStylingVariants.DETAILS}
        totalPages={Math.ceil(PO_DASHBOARD_ROWS.length / PAGE_SIZE)}
        // TODO: implement sorting from the BFF
        onSort={(_sorting) => {
          return;
        }}
      />
    </View>
  );
};
