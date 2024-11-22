/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';

import { Checkbox, Text, View } from '@az/starc-ui';

import { Avatar } from '@shared/components/Avatar/Avatar';
import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';

import {
  existingAssigneesAtom,
  currentAssigneesAtom,
  suggestionAssigneesAtom,
} from '@inbound/atoms/addEditAssignees/addEditAssigneesAtom';
import { RECOMMENDED_ASSIGNEES } from '@inbound/constants/dataConstants';
import { UserType } from '@inbound/types/types';

import * as T from './AssigneesSuggestion.types';
import styles from './AssigneesSuggestion.module.scss';

export const AssigneesSuggestion = ({ data }: T.Props) => {
  /* Atoms */
  const [existingAssignees] = useAtom(existingAssigneesAtom);
  const [currentAssignees, setCurrentAssignees] = useAtom(currentAssigneesAtom);
  const [, setSuggestionAssignees] = useAtom(suggestionAssigneesAtom);

  /* Constants */
  const { t } = useTranslation();

  /* Functions */
  const isSuggested = (id: number) => {
    return RECOMMENDED_ASSIGNEES.filter((item) => item.id === id).length > 0;
  };

  const isSelected = (id: number) => {
    let inSelected = false;

    if (currentAssignees) {
      inSelected = currentAssignees.filter((item) => item.id === id).length > 0;
    } else if (existingAssignees) {
      inSelected = existingAssignees.filter((item) => item.id === id).length > 0;
    }

    return inSelected;
  };

  const handleSuggestionClick = (e: React.ChangeEvent<HTMLInputElement>, suggestion: UserType) => {
    let currentAssigneesData = currentAssignees;

    if (e.target.checked) {
      if (currentAssigneesData) {
        const i = currentAssigneesData.findIndex((assignee) => assignee.id === suggestion.id);
        if (i === -1) {
          currentAssigneesData?.push(suggestion);
        }
      } else {
        currentAssigneesData = [suggestion];
      }
    } else {
      if (currentAssigneesData) {
        currentAssigneesData = currentAssigneesData?.filter(
          (assignee) => assignee.id !== suggestion.id
        );
      }
    }

    setSuggestionAssignees(currentAssigneesData);
    setCurrentAssignees(currentAssigneesData);
  };

  return (
    <View direction="column" padding={[2, 0]} className={styles['assignees-suggestion__container']}>
      {existingAssignees && existingAssignees.length > 0 && (
        <View.Item>
          <View direction="column" className={styles['assignees-suggestion__section']}>
            <View.Item>
              <View className={styles['assignees-suggestion__section__title']}>
                <Text>
                  {t('PODashboard.Assignees.Selected')} ({existingAssignees?.length})
                </Text>
              </View>
            </View.Item>
            <View.Item>
              <View className={styles['assignees-suggestion__section__items']}>
                {existingAssignees?.map((el) => (
                  <View
                    key={t('PODashboard.ItemKey', {
                      item: 'selected',
                      key: el.id,
                    })}
                    direction="row"
                    className={styles['assignees-suggestion__item']}
                  >
                    <Checkbox
                      label={
                        <View
                          direction="row"
                          justify="center"
                          align="center"
                          className={styles['assignees-suggestion__item__checkbox__label']}
                        >
                          <View.Item grow>
                            <Avatar
                              name={el.firstName + ' ' + el.lastName}
                              size="large"
                              showText={true}
                            />
                          </View.Item>

                          {isSuggested(el.id) && (
                            <View.Item>
                              <View
                                direction="row"
                                justify="center"
                                align="center"
                                min-height="var(--st-unit-6)"
                                width="fit-content"
                                borderRadius="small"
                                className={styles[`assignees-suggestion__item__badge`]}
                              >
                                <Text
                                  size="075"
                                  weight="bold"
                                  className={styles[`assignees-suggestion__item__badge--text`]}
                                >
                                  {t('PODashboard.Assignees.Suggested')}
                                </Text>
                              </View>
                            </View.Item>
                          )}
                        </View>
                      }
                      name="selected-assignees"
                      value="all"
                      checked={true}
                      onChange={(e) => handleSuggestionClick(e, el)}
                      className={styles[`assignees-suggestion__item__checkbox`]}
                    />
                  </View>
                ))}
              </View>
            </View.Item>
          </View>
        </View.Item>
      )}

      <View.Item>
        <View direction="column" className={styles['assignees-suggestion__section']}>
          <View.Item>
            <View className={styles['assignees-suggestion__section__title']}>
              <Text size="087" weight="medium" lineHeight="140">
                {t('PODashboard.Assignees.AllAutoZoners')} ({data?.length})
              </Text>
            </View>
          </View.Item>
          <View.Item>
            <View className={styles['assignees-suggestion__section__items']}>
              {data?.map((dataItem: User) => (
                <View
                  key={t('PODashboard.ItemKey', {
                    item: 'assignees',
                    key: dataItem.id,
                  })}
                  direction="row"
                  className={styles['assignees-suggestion__item']}
                >
                  <Checkbox
                    label={
                      <View
                        direction="row"
                        justify="center"
                        align="center"
                        className={styles['assignees-suggestion__item__checkbox__label']}
                      >
                        <View.Item grow>
                          <Avatar
                            name={dataItem.firstName + ' ' + dataItem.lastName}
                            size="large"
                            showText={true}
                          />
                        </View.Item>

                        {isSuggested(dataItem.id) && (
                          <View.Item>
                            <View
                              direction="row"
                              justify="center"
                              align="center"
                              min-height="var(--st-unit-6)"
                              width="fit-content"
                              borderRadius="small"
                              className={styles[`assignees-suggestion__item__badge`]}
                            >
                              <Text
                                size="075"
                                weight="bold"
                                className={styles[`assignees-suggestion__item__badge--text`]}
                              >
                                {t('PODashboard.Assignees.Suggested')}
                              </Text>
                            </View>
                          </View.Item>
                        )}
                      </View>
                    }
                    name="selected-assignees"
                    value="all"
                    defaultChecked={isSelected(dataItem.id)}
                    onChange={(e) => handleSuggestionClick(e, dataItem)}
                    className={styles[`assignees-suggestion__item__checkbox`]}
                  />
                </View>
              ))}
            </View>
          </View.Item>
        </View>
      </View.Item>
    </View>
  );
};
