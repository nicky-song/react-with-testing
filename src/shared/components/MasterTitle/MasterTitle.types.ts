/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import * as StatusBadgeTypes from '@shared/components/StatusBadge/StatusBadge.types';

type TitleActionProps = {
  label: string;
  isActive?: boolean;
  handleClick: () => void;
};

type BreadcrumbsClick = {
  data: {
    label: string;
    url?: never;
    onClick: () => void;
  }[];
};

export type BreadcrumbsUrl = {
  data: {
    label: string;
    url: string;
    onClick?: never;
  }[];
};

type CloseButtonProps = {
  ariaLabel?: string;
  handleClick: () => void;
};

export type Props = {
  breadcrumbProps?: BreadcrumbsClick | BreadcrumbsUrl;
  title: string;
  subtitle?: React.ReactNode;
  closeProps?: CloseButtonProps;
  statusBadgeProps?: StatusBadgeTypes.Props;
  titleActionProps?: TitleActionProps;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
};
