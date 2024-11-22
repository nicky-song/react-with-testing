/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { atom } from 'jotai';

import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';

export const existingAssigneesAtom = atom<User[] | null | undefined>(null);
export const currentAssigneesAtom = atom<User[] | null | undefined>(null);
export const suggestionAssigneesAtom = atom<User[] | null | undefined>(null);
