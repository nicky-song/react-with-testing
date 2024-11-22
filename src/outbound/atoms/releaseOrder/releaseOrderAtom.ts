/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { atom } from 'jotai';

import { Item } from '@outbound/components/OrderReleaseAccordion/OrderReleaseAccordion.types';
import { Store } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/NewStoreOrders/NewStore.types';
import { ltdGroupingRecemmendations } from '@outbound/pages/ControlDesk/ReleaseOrders/OrderTabs/data';

export const selectedStoresAtom = atom<string[]>([]);
export const selectedSubzonesAtom = atom<string[]>([]);
export const laneConfirmationItemAtom = atom<Item | Store | null>(null);
export const inLaneConfirmationAtom = atom<boolean>(false);
export const selectedStoresLaneAtom = atom<{ store: string; lane: string | undefined }[]>([]);
export const ltdGroupedStoresAtom = atom<string[][]>([]);
export const ltdGroupingRecommendationsAtom = atom<string[][]>(ltdGroupingRecemmendations);
