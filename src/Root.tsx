/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect } from 'react';
import { View } from '@az/starc-ui';
import { TopNavigation } from '@shared/components/TopNavigation/TopNavigation';
import { MainContainer } from '@shared/components/MainContainer/MainContainer';
import { Sidenav } from '@shared/components/Sidenav/Sidenav';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthInterceptor } from '@shared/components/AuthInterceptor/AuthInterceptor';
import { ROUTES } from '@shared/constants/routes';
import { Language, supportedLocales } from '@shared/constants/constants';
import { changeLanguage } from 'i18next';
import dayjs from 'dayjs';

export const Root = () => {
  /* Constants */
  const location = useLocation();

  /* Hooks */
  // Sets the application translation and date formats based on the browser's language
  useEffect(() => {
    const browserLanguage = (navigator.language.substring(0, 2) as Language) || Language.ENGLISH;
    if (supportedLocales[browserLanguage]) {
      changeLanguage(browserLanguage);
      dayjs.locale(supportedLocales[browserLanguage]);
    } else {
      changeLanguage(Language.ENGLISH);
      dayjs.locale(supportedLocales[Language.ENGLISH]);
    }
  }, []);

  return (
    <AuthInterceptor>
      <View>
        <TopNavigation />
        <View direction="row" height="calc(100vh - var(--st-unit-20))" overflow="hidden">
          {location.pathname.includes(ROUTES.AUTH) || <Sidenav />}
          <MainContainer>
            <Outlet />
          </MainContainer>
        </View>
      </View>
    </AuthInterceptor>
  );
};
