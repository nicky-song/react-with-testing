/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';

import {
  Button,
  Divider,
  Icon,
  Link,
  Loader,
  Modal,
  SearchBar,
  Text,
  View,
  classNames,
} from '@az/starc-ui';
import { ActionDelete, Close } from '@az/starc-ui-icons';

import { Avatar } from '@shared/components/Avatar/Avatar';
import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';
import { EmptySuggestions } from '@shared/components/EmptySuggestions/EmptySuggestions';

import {
  existingAssigneesAtom,
  currentAssigneesAtom,
} from '@inbound/atoms/addEditAssignees/addEditAssigneesAtom';
import { RecommendedAssignees } from '@inbound/components/RecommendedAssignees/RecommendedAssignees';
import { RECOMMENDED_ASSIGNEES } from '@inbound/constants/dataConstants';
import { useUserSearch } from '@inbound/services/useUserSearch';

import { AssigneesSuggestion } from './AssigneesSuggestion/AssigneesSuggestion';

import * as T from './AddEditAssigneesModal.types';
import s from './AddEditAssigneesModal.module.scss';

export const AddEditAssigneesModal = ({ isOpen, onClose, onSubmit }: T.Props) => {
  /* Atoms */
  const [existingAssignees] = useAtom(existingAssigneesAtom);
  const [currentAssignees, setCurrentAssignees] = useAtom(currentAssigneesAtom);

  /* State variables */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  /* Constants */
  const { t } = useTranslation();

  /* Queries */
  const { matchingUsers, hasNoResults } = useUserSearch(searchValue);

  /* Functions */
  const handleSearchSuggestions = () => {
    if (hasNoResults) {
      return <EmptySuggestions />;
    } else if (matchingUsers && matchingUsers.length > 0) {
      return <AssigneesSuggestion data={matchingUsers} />;
    } else {
      return <EmptySuggestions />;
    }
  };

  const onAssigneeSelect = (user: User) => {
    setCurrentAssignees([user]);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false); // fake the delay
    }, 1000);
  };

  const removeAssignee = (userId: number) => {
    setCurrentAssignees(currentAssignees?.filter((assignee) => assignee.id !== userId));
  };

  const handleOnClose = () => {
    setSearchValue('');
    onClose();
  };

  const handleOnSubmit = () => {
    setSearchValue('');
    onSubmit();
  };

  return (
    <Modal open={isOpen} onClose={() => handleOnClose()} className={s['add-edit-assignee-modal']}>
      <header className={s['add-edit-assignee-modal__header']}>
        <View direction="column">
          <Text as="h2" size="175" weight="bold" color="primary">
            {existingAssignees?.length === 0
              ? t('PODashboard.Assignees.AddAssignee')
              : t('PODashboard.Assignees.EditAssignee')}
          </Text>
        </View>
        <Button
          variant="ghost"
          onClick={handleOnClose}
          className={classNames(
            s['close-icon'],
            s['add-edit-assignee-modal__header__close-button']
          )}
        >
          <Icon svg={Close} />
        </Button>
      </header>

      <View direction="column" className={s['add-edit-assignee-modal__body']}>
        <View.Item>
          <SearchBar
            value={searchValue}
            onValueChange={setSearchValue}
            suggestions={handleSearchSuggestions()}
            className={s['add-edit-assignee-modal__body__search-bar']}
            label={t('PODashboard.Assignees.SearchPlaceholder')}
            maxMenuHeight={300}
          />
        </View.Item>

        <View.Item>
          <View padding={[6, 0]}>
            <Divider color="300" />
          </View>
        </View.Item>

        <View.Item>
          {isLoading && <Loader color="primary" variant="inline" />}

          {!isLoading && currentAssignees?.length === 0 && (
            <RecommendedAssignees
              assignees={RECOMMENDED_ASSIGNEES}
              className={s['add-edit-assignee-recommended-assignee']}
              onButtonClick={(user) => onAssigneeSelect(user)}
            />
          )}

          {!isLoading && currentAssignees && currentAssignees?.length > 0 && (
            <View
              direction="column"
              className={s['add-edit-assignee-modal__body__assignees_items_wrapper']}
            >
              {currentAssignees?.map((user, index) => (
                <View.Item key={t('PODashboard.ItemKey', { item: 'assignees', key: index })}>
                  <View direction="row" align="center">
                    <View.Item grow>
                      <Avatar
                        name={user.firstName + ' ' + user.lastName}
                        size="large"
                        showText={true}
                      />
                    </View.Item>

                    <View.Item>
                      <Link onClick={() => removeAssignee(user.id)}>
                        <Icon svg={ActionDelete} color="error" />
                      </Link>
                    </View.Item>
                  </View>
                </View.Item>
              ))}
            </View>
          )}
        </View.Item>
      </View>

      <footer className={s['add-edit-assignee-modal__footer']}>
        <View
          width="100%"
          direction="row"
          justify="end"
          className={s['add-edit-assignee-modal__footer__actions']}
        >
          <Button
            variant="secondary"
            attributes={{ style: { width: 'fit-content' } }}
            onClick={handleOnClose}
          >
            <Text>{t('Cancel')}</Text>
          </Button>

          <Button
            variant="primary"
            attributes={{ style: { width: 'fit-content' } }}
            onClick={handleOnSubmit}
          >
            <Text>{t('Update')}</Text>
          </Button>
        </View>
      </footer>
    </Modal>
  );
};
