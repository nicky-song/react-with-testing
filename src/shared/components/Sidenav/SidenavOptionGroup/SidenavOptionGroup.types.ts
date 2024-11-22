/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Dispatch, SetStateAction } from 'react';

export type SidenavOptionGroupProps = {
  title: string;
  link: string;
  icon:
    | React.ReactElement<React.SVGProps<SVGSVGElement>, string>
    | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isSectionExpanded: boolean;
  isParentExpanded: boolean;
  setParentExpanded: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactElement;
};
