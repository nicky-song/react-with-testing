/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Actionable, Text } from '@az/starc-ui';
import { useTranslation } from 'react-i18next';
import {
  Props,
  TagItemsProps,
} from '@taskManagement/components/TaskManagerCard/TaskManagerCard.types';
import { Avatar } from '@shared/components/Avatar/Avatar';
import { ProgressBar } from '@taskManagement/components/ProgressBar/ProgressBar';
import { PriorityTag } from '@inbound/components/PriorityTag/PriorityTag';
import { UserStatus } from '@taskManagement/constants/constants';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu';
import { Tag } from '@shared/components/Tag/Tag';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';
import styles from './TaskManagerCard.module.scss';

export const TaskManagerCard = ({
  id,
  name,
  userStatus,
  assigned,
  lastTransaction,
  workingDepartment,
  clocked_in,
  priority,
  detailText,
  tagItems,
  statusBadge,
  poNumber,
  subZone,
  piecesData,
  onClickAssignTask,
  setOpenActionMenu,
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <View
        padding={4}
        attributes={{ style: { opacity: clocked_in ? '0.5' : '1' } }}
        backgroundColor="secondary"
        width="100%"
        className={styles['task-manager-card_list-item']}
        justify="space-between"
        direction="row"
        align="center"
        key={id}
      >
        <View direction="row" gap={2} backgroundColor="secondary" align="center" justify="start">
          <View align="center" justify="center">
            <Avatar name={name ? name : ''} size="large" textCase="capitalize" />
          </View>
          <Text size="100" weight="medium">
            {name}
          </Text>
        </View>
        {workingDepartment && (
          <View gap={2}>
            <Tag text={t(`InboundTaskManager.Text.WorkingDepartment.Outbound`)} />
          </View>
        )}

        <View direction="row" align="center">
          <View direction="row" gap={2} align="center" justify="center">
            {userStatus === t(UserStatus.NOT_ACTIVE) && (
              <>
                <Text size="087" variant="subtitle-regular">
                  {assigned
                    ? t(`InboundTaskManager.Text.Assigned`)
                    : t(`InboundTaskManager.Text.NotAssigned`)}
                </Text>
                {lastTransaction && (
                  <>
                    <View>
                      <Text size="225" className={styles['task-manager-card_dot']}>
                        &#8901;
                      </Text>
                    </View>
                    {lastTransaction !== 'No last transaction' ? (
                      <Text size="087" variant="subtitle-regular" color="error">
                        {lastTransaction}
                      </Text>
                    ) : (
                      <Text size="087" variant="subtitle-regular" color="primary">
                        {lastTransaction}
                      </Text>
                    )}
                  </>
                )}
                <ActionDropdownMenu isOpen={setOpenActionMenu}>
                  <View padding={[1, 0]}>
                    <View.Item>
                      <View padding={[3, 4]}>
                        <Actionable fullWidth>
                          <Text>{t('NotActiveDropDownList.MoveToAnotherDepartment')}</Text>
                        </Actionable>
                      </View>
                    </View.Item>
                    <View.Item>
                      <View padding={[3, 4]}>
                        <Actionable fullWidth onClick={() => onClickAssignTask(id)}>
                          <Text>{t('NotActiveDropDownList.AssignTasks')}</Text>
                        </Actionable>
                      </View>
                    </View.Item>
                    <View.Item>
                      <View padding={[3, 4]}>
                        <Actionable fullWidth>
                          <Text color="error">{t('NotActiveDropDownList.RemoveFromShift')}</Text>
                        </Actionable>
                      </View>
                    </View.Item>
                  </View>
                </ActionDropdownMenu>
              </>
            )}
            {poNumber && (
              <>
                <View gap={2}>
                  <Text size="087" variant="subtitle-regular" color="primary">
                    {poNumber}
                  </Text>
                </View>
              </>
            )}
            {subZone && (
              <>
                <View gap={2}>
                  <Text size="087" variant="subtitle-regular" color="primary">
                    {subZone}
                  </Text>
                </View>
              </>
            )}
          </View>
          {userStatus === t(UserStatus.ACTIVE) && (
            <ActionDropdownMenu isOpen={setOpenActionMenu}>
              <View padding={[1, 0]}>
                <View.Item>
                  <View padding={[3, 4]}>
                    <Actionable fullWidth>
                      <Text>{t('ActiveDropDownList.MoveToAnotherDepartment')}</Text>
                    </Actionable>
                  </View>
                </View.Item>
                <View.Item>
                  <View padding={[3, 4]}>
                    <Actionable fullWidth onClick={() => onClickAssignTask(id)}>
                      <Text>{t('ActiveDropDownList.AssignTasks')}</Text>
                    </Actionable>
                  </View>
                </View.Item>
              </View>
            </ActionDropdownMenu>
          )}
          {userStatus === t(UserStatus.ALMOST_DONE) && (
            <ActionDropdownMenu isOpen={setOpenActionMenu}>
              <View padding={[1, 0]}>
                <View.Item>
                  <View padding={[3, 4]}>
                    <Actionable fullWidth>
                      <Text>{t('ActiveDropDownList.MoveToAnotherDepartment')}</Text>
                    </Actionable>
                  </View>
                </View.Item>
                <View.Item>
                  <View padding={[3, 4]}>
                    <Actionable fullWidth onClick={() => onClickAssignTask(id)}>
                      <Text>{t('ActiveDropDownList.AssignTasks')}</Text>
                    </Actionable>
                  </View>
                </View.Item>
              </View>
            </ActionDropdownMenu>
          )}
        </View>

        <View direction="row" align="center" width="100%">
          <View direction="row" gap={2} padding={[2, 0, 0, 0]} align="center" width="100%">
            {detailText && <Text>{detailText}</Text>}
            {priority && <PriorityTag />}
            {tagItems &&
              tagItems.map((tagItem: TagItemsProps) => (
                <Tag text={tagItem.text} variant={tagItem.variant} />
              ))}
            {statusBadge && <StatusBadge variant={statusBadge.variant} text={statusBadge.text} />}
            {userStatus === t(UserStatus.ACTIVE) && piecesData && (
              <View align="center" width="100%">
                <ProgressBar
                  value={piecesData.value}
                  max={piecesData.max}
                  label={piecesData.label}
                />
              </View>
            )}
            {userStatus === t(UserStatus.ALMOST_DONE) &&
              piecesData &&
              (piecesData.value / piecesData.max) * 100 >= 75 && (
                <View align="center" width="100%">
                  <ProgressBar
                    value={piecesData.value}
                    max={piecesData.max}
                    label={piecesData.label}
                  />
                </View>
              )}
          </View>
        </View>
      </View>
    </>
  );
};
