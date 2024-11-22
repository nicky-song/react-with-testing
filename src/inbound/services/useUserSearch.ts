/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useEffect, useState } from 'react';

import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';

import { SearchAtomType } from '@ofm/atoms/search/searchInputAtom';

import { ALL_ASSIGNEES } from '@inbound/constants/dataConstants';

export const useUserSearch = (user: SearchAtomType) => {
  const [invalidUser, setInvalidUser] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [matchingUsers, setMatchingUsers] = useState<User[]>([]);
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);

  // @todo : replace this while working with backend integration
  const usersData = ALL_ASSIGNEES;

  useEffect(() => {
    if (usersData && usersData?.length > 0) {
      setUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    switch (user) {
      case undefined:
        setMatchingUsers([]);
        break;
      case '':
        setMatchingUsers(users);
        setHasNoResults(false);
        break;
      default: {
        if (users.length) {
          const usersToShow = users.filter(
            (userItem) =>
              userItem.id === Number(user) ||
              userItem.firstName.toLowerCase().includes(user.toLowerCase()) ||
              userItem.lastName.toLowerCase().includes(user.toLowerCase()) ||
              userItem.firstName
                .concat(' ', userItem.lastName.toLowerCase())
                .toLowerCase()
                .includes(user.toLowerCase())
          );
          if (usersToShow.length) {
            setMatchingUsers(usersToShow);
            setHasNoResults(false);
          } else {
            setInvalidUser(user);
            setMatchingUsers([]);
            setHasNoResults(true);
          }
        }
        break;
      }
    }
  }, [user, users]);

  return { matchingUsers, hasNoResults, invalidUser };
};
