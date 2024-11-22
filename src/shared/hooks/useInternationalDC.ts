/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';
import { WarehouseAtomType } from '../../ofm/atoms/warehouse/warehouseAtom.types';
import { Warehouses } from '@shared/constants/constants';
import { useAtom } from 'jotai';
import { userAtom } from '@shared/atoms/user/userAtom';
import { useTranslation } from 'react-i18next';

type Props = {
  warehouse: WarehouseAtomType;
};

export const useInternationalDC = ({ warehouse }: Props) => {
  const { t } = useTranslation();

  const [user] = useAtom(userAtom);
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');

  useEffect(() => {
    if (user && user?.warehouses.length > 0 && warehouse) {
      const dc = user.warehouses.find((dc) => dc.id === warehouse.id);
      if (dc) {
        const isIntl = Warehouses.INTERNATIONAL.includes(dc.country);
        setIsInternational(isIntl);
        setKey(isIntl ? t('Key.International') : t('Key.NonInternational'));
      }
    }
  }, [user, warehouse, t]);

  return { isInternational, key };
};
