/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { AutozoneLogo, Button, Divider, Dropdown, Link, View, classNames } from '@az/starc-ui';
import { Profile } from '../Profile/Profile';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { SESSION_CODE_VERIFIER, SESSION_DC_ID_KEY } from '@shared/constants/storageConstants';
import styles from './TopNavigation.module.scss';
import { asyncWarehouseAtom } from '@ofm/atoms/warehouse/warehouseAtom';
import { useCallback, useEffect } from 'react';
import { useSessionStorage } from '@shared/hooks/useStorage';
import { useAtom } from 'jotai';
import { accessTokenAtom, refreshTokenAtom } from '@shared/atoms/token/tokenAtoms';
import { PAGE_URLS } from '@shared/constants/routes';
import { useNavigate } from 'react-router-dom';
import { asyncUserAtom } from '@shared/atoms/user/userAtom';
import { useRevokeTokens } from '@shared/hooks/useRevokeTokens';
import { generatePKCE } from '@shared/utils/pkceUtils';
import { authService } from '@ofm/services/authService';
import { WarehouseAtomType } from '@ofm/atoms/warehouse/warehouseAtom.types';
import { useTranslation } from 'react-i18next';

export const TopNavigation = () => {
  /* Atoms */
  const [user] = useAtom(asyncUserAtom);
  const [refreshToken] = useAtom(refreshTokenAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [, setWarehouse] = useAtom(asyncWarehouseAtom);

  /* State variables */
  const [selectedDC, setSelectedDC] = useSessionStorage<string>(SESSION_DC_ID_KEY);
  const [, setCodeVerifier] = useSessionStorage(SESSION_CODE_VERIFIER);

  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* Queries */
  const { mutateRevokeTokens } = useRevokeTokens();

  /* Functions */
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

  const handleLogout = async () => {
    mutateRevokeTokens(
      { accessToken, refreshToken },
      {
        onSuccess: async () => {
          setAccessToken();
          const { codeChallenge, codeVerifier } = await generatePKCE();
          setCodeVerifier(codeVerifier);
          window.location.href = authService.getAuthLink(codeChallenge, true);
        },
      }
    );
  };

  /* Hooks */
  // Sets the DC based on the user warehouses
  useEffect(() => {
    if (user) {
      const userWarehouses = user.warehouses.map((userWarehouse) => userWarehouse.id);
      if (selectedDC && userWarehouses.includes(selectedDC)) {
        changeDC(selectedDC);
        return;
      }
      setSelectedDC(user.warehouses?.[0]?.id ?? '');
    }
  }, [user, selectedDC, setSelectedDC, changeDC]);

  return (
    <View
      padding={[4, 6]}
      height="var(--st-unit-20)"
      width="100%"
      backgroundColor="primary"
      className={classNames(styles['top-navigation'])}
    >
      <View
        direction="row"
        justify="space-between"
        className={classNames(styles['top-navigation__container'])}
      >
        <View.Item className={classNames(styles['top-navigation__logo-container'])}>
          <Link onClick={() => navigate(PAGE_URLS.HOME)}>
            <AutozoneLogo
              className={classNames(styles['top-navigation__logo'], styles['logo-item'])}
              variant="full"
            />
          </Link>
          {user && (
            <DropdownMenu
              width={250}
              onChange={changeDC}
              selectedId={selectedDC || ''}
              options={
                user?.warehouses.map((warehouse) => ({
                  id: warehouse.id,
                  name: warehouse.name,
                  country: warehouse.country,
                })) || []
              }
            />
          )}
        </View.Item>
        <View.Item>
          {user ? (
            <Profile
              name={`${user.name} ${user.lastName}`}
              title={user.jobTitle}
              iconUrl={user.profilePictureUrl}
            >
              <Dropdown.Item
                className={classNames(
                  styles['profile-item-link'],
                  styles['top-navigation__profile-item']
                )}
                label={t('Profile.Help')}
                onClick={() => navigate(PAGE_URLS.HELP)}
              />
              <Dropdown.Item
                className={classNames(
                  styles['profile-item-link'],
                  styles['top-navigation__profile-item']
                )}
                label={t('Profile.Preferences')}
                onClick={() => navigate(PAGE_URLS.PREFERENCES)}
              />
              <Divider className={styles['top-navigation__profile-divider']} />
              <Dropdown.Item
                className={classNames(
                  styles['profile-item-link'],
                  styles['top-navigation__profile-item']
                )}
                label={t('Profile.Logout')}
                onClick={handleLogout}
              />
            </Profile>
          ) : (
            <Button
              loading={!user}
              className={classNames(styles['top-navigation__button'], styles['profile-button'])}
            >
              {t('Profile.Login')}
            </Button>
          )}
        </View.Item>
      </View>
    </View>
  );
};
