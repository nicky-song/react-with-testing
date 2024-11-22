/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { atom } from 'jotai';

export type SearchAtomType = string | undefined;

export const searchAtom = atom<SearchAtomType>(undefined);
