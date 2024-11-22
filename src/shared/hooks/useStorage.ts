/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type ReturnType<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>];

enum StorageType {
  local = 'local',
  session = 'session',
}

const useStorage = <T>(key: string, type: StorageType, defaultValue?: T): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(() => {
    const storage = type === StorageType.local ? localStorage : sessionStorage;

    const value = storage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  });

  useEffect(() => {
    const storage = type === StorageType.local ? localStorage : sessionStorage;
    if (state !== undefined) {
      storage.setItem(key, JSON.stringify(state));
    } else {
      storage.removeItem(key);
    }
  }, [state, key, type]);

  return [state, setState];
};

export const useSessionStorage = <T>(key: string, defaultValue?: T): ReturnType<T> =>
  useStorage(key, StorageType.session, defaultValue);

export const useLocalStorage = <T>(key: string, defaultValue?: T): ReturnType<T> =>
  useStorage(key, StorageType.local, defaultValue);
