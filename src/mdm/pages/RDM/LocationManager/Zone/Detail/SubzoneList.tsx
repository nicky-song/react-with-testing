/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Table } from '@shared/components/Table/Table.tsx';
import {
  ZONE_ASSOCIATED_SUBZONE_TABLE_COLUMNS,
  TableStylingVariants,
} from '@shared/components/Table/tableConstants.ts';
import { View } from '@az/starc-ui';
import { SubZoneListRowTypes } from '@shared/components/Table/Table.types.ts';
import { PAGE_URLS } from '@shared/constants/routes.ts';
import { useNavigate } from 'react-router-dom';
import { Props } from '@mdm/pages/RDM/LocationManager/Zone/Detail/SubzoneList.types.ts';
import { DEFAULT_PAGE, PAGE_SIZE } from '@shared/constants/constants.ts';
import { mapZoneAssociatedSubzoneTableRows } from '@mdm/utils/table/tableUtils.tsx';

export const SubzoneList = ({ data }: Props) => {
  const navigate = useNavigate();

  const onViewDetails = (subzone: SubZoneListRowTypes) => {
    navigate(PAGE_URLS.SUB_ZONE_DETAILS(String(subzone.id)));
  };

  const onSort = () => {
    // TODO API INTEGRATION FOR SORTING
  };

  return (
    <View>
      <Table
        columns={ZONE_ASSOCIATED_SUBZONE_TABLE_COLUMNS}
        rows={mapZoneAssociatedSubzoneTableRows(data, onViewDetails)}
        isPaginated={false}
        isCheckboxDisabled={false}
        pageSize={PAGE_SIZE}
        defaultPage={DEFAULT_PAGE}
        isCreditItem={false}
        isCheckboxTable={false}
        styleVariant={TableStylingVariants.FILLED}
        totalPages={Math.ceil(data.length / PAGE_SIZE)}
        onSort={onSort}
      />
    </View>
  );
};
