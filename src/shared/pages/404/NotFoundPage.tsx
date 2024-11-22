/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { IconError } from '@az/starc-ui';
import { useNavigate } from 'react-router-dom';
import { EmptyPage } from '@shared/components/EmptyPage/EmptyPage';
import { ROUTES } from '@shared/constants/routes';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  /* Constants */
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* Functions */
  const handleNavigation = () => {
    navigate(`/${ROUTES.HOME}`);
  };

  return (
    <EmptyPage
      title={t('404.Title')}
      description={t('404.Description')}
      buttonText={t('404.ButtonText')}
      icon={IconError}
      onClick={handleNavigation}
    />
  );
};
