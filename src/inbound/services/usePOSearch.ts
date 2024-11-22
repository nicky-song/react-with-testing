/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { SearchAtomType } from '@ofm/atoms/search/searchInputAtom';

import { PO_DASHBOARD_ROWS } from '@inbound/constants/dataConstants';
import { PODashboardDataRowType } from '@inbound/types/types';

export const usePOSearch = (searchTerm: SearchAtomType) => {
  const [invalidPo, setInvalidPo] = useState<string>('');
  const [pos, setPos] = useState<PODashboardDataRowType[]>([]);
  const [matchingPOs, setMatchingPOs] = useState<PODashboardDataRowType[]>([]);
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);
  const [isLoadingPOs, setIsLoadingPOs] = useState<boolean>(true);

  // @todo : replace this while working with backend integration
  const posData = PO_DASHBOARD_ROWS;

  useEffect(() => {
    if (posData && posData?.length > 0) {
      setPos(posData);
    }
  }, [posData]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPOs(false); // fake the api delay
    }, 2500);
  }, []);

  useEffect(() => {
    switch (searchTerm) {
      case undefined:
        setMatchingPOs([]);
        break;
      case '':
        setMatchingPOs(pos);
        setHasNoResults(false);
        break;
      default: {
        if (pos.length) {
          const posToShow = pos.filter(
            (poItem) =>
              poItem.poNumber.toString().includes(searchTerm) ||
              poItem.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (posToShow.length) {
            setMatchingPOs(posToShow);
            setHasNoResults(false);
          } else {
            setInvalidPo(searchTerm);
            setMatchingPOs([]);
            setHasNoResults(true);
          }
        }
        break;
      }
    }
  }, [searchTerm, pos]);

  return { matchingPOs, hasNoResults, invalidPo, isLoadingPOs };
};
