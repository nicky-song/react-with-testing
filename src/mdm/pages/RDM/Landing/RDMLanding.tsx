/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useCallback } from 'react';

import { Actionable, Dropdown, Link, Text, View } from '@az/starc-ui';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle.tsx';

import styles from '@mdm/pages/RDM/Landing/RDMLanding.module.scss';
import { useSessionStorage } from '@shared/hooks/useStorage.ts';
import { SESSION_DC_ID_KEY } from '@shared/constants/storageConstants.ts';
import { useAtom } from 'jotai';
import { asyncUserAtom } from '@shared/atoms/user/userAtom.ts';
import { asyncWarehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom.ts';
import { WarehouseAtomType } from '@ofm/atoms/warehouse/warehouseAtom.types.ts';
import { LandingAndVehicleManager } from '@mdm/pages/RDM/Landing/Partials/LocationAndVehicleManager.tsx';
import { useTranslation } from 'react-i18next';
import { ProductManager } from '@mdm/pages/RDM/Landing/Partials/ProductManager.tsx';
import { OutboundConfiguration } from '@mdm/pages/RDM/Landing/Partials/OutboundConfiguration.tsx';
import { Miscellaneous } from '@mdm/pages/RDM/Landing/Partials/Miscellaneous.tsx';

export const RDMLanding = () => {
  const [user] = useAtom(asyncUserAtom);
  const [, setWarehouse] = useAtom(asyncWarehouseAtom);

  const { t } = useTranslation();

  const [selectedDC, setSelectedDC] = useSessionStorage<string>(SESSION_DC_ID_KEY);

  const handleWarehouse = useCallback(
    (warehouses: WarehouseAtomType[], warehouseId: string) => {
      const dc = warehouses.find((warehouse) => warehouse.id === warehouseId);
      if (dc) setWarehouse(dc);
    },
    [setWarehouse]
  );

  const changeDC = useCallback(
    (id: string) => {
      if (user) {
        setSelectedDC(id);
        handleWarehouse(user.warehouses, id);
      }
    },
    [user, setSelectedDC, handleWarehouse]
  );

  const Subtitle = () => {
    return (
      <View align="end" direction="row" gap={4}>
        <Text>
          {t('Warehouse')}:&nbsp; {`DC ${selectedDC?.toString()}`}
        </Text>
        <Dropdown width={250}>
          <Dropdown.Button className={styles['landing__header-dropdown-change-dc__button']}>
            <Link>
              <Text size="087" color="500">
                {t('Change')}
              </Text>
            </Link>
          </Dropdown.Button>
          <Dropdown.Content>
            {user?.warehouses.map((warehouse) => (
              <Actionable
                className={styles['landing__header-dropdown-change-dc__option']}
                fullWidth
                onClick={() => changeDC(warehouse.id)}
              >
                <Text>{`DC ${warehouse.id}`}</Text>
              </Actionable>
            )) || []}
          </Dropdown.Content>
        </Dropdown>
      </View>
    );
  };

  return (
    <>
      <View
        className={styles['landing__header']}
        attributes={{
          'data-testid': 'landing-header',
        }}
      >
        <MasterTitle title={t('MasterTitle.ReferenceDataManager')} subtitle={<Subtitle />} />
      </View>

      <LandingAndVehicleManager />

      <ProductManager />

      <OutboundConfiguration />

      <Miscellaneous />
    </>
  );
};
