/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { SearchBar, View, Text, Select, Button } from '@az/starc-ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { TaskManagerCard } from '@taskManagement/components/TaskManagerCard/TaskManagerCard';
import { SHIFT_LIST, USERS_MOCK_DATA } from '@taskManagement/components/TaskManagerCard/data';
import { widgetData } from '@taskManagement/components/Widget/WidgetData';
import { Widget } from '@taskManagement/components/Widget/Widget';
import { UserStatus, WidgetTypes } from '@taskManagement/constants/constants';
import { AssignTaskDrawer } from '@taskManagement/components/AssignTaskDrawer/AssignTaskDrawer';
import styles from './TaskManager.module.scss';

export const TaskManager = () => {
  const { t } = useTranslation();
  const [openAssignTaskDrawer, setOpenAssignTaskDrawer] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState<boolean | null>();
  const [userId, setUserId] = useState<number>();
  const onClickAssignTask = (id: number) => {
    setOpenActionMenu(false);
    setOpenAssignTaskDrawer(true);
    setUserId(id);
  };

  const onDrawerClose = () => {
    setOpenAssignTaskDrawer(false);
    setOpenActionMenu(null);
  };

  return (
    <>
      <View direction="row">
        <MasterTitle
          title="Inbound Task Manager"
          subtitle="Last updated 5 min ago"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          titleActionProps={{ label: 'Favorite', handleClick: () => {} }}
        >
          <View direction="row" justify="end">
            <View.Item columns={4}>
              <SearchBar label="Search for an AutoZoner name or ID" />
            </View.Item>
          </View>
        </MasterTitle>
      </View>
      <View gap={4} direction="row" backgroundColor="secondary" padding={[6, 6]}>
        <View.Item grow className={styles['shift-goal']}>
          {widgetData
            ?.filter((data) => data.widgetTitle === WidgetTypes.SHIFT_PROGRESS)
            .map((widgetData) => (
              <Widget
                widgetTitle={widgetData.widgetTitle}
                tileData={widgetData.tileData}
                shift={widgetData.shift}
                assignedUsersCount={widgetData.assignedUsersCount}
                departmentUser={widgetData.departmentUser}
                poType={widgetData.poType}
                isShiftGoal={widgetData.isShiftGoal}
                lastShiftPo={widgetData.lastShiftPo}
                unReceivedPoCount={widgetData.unReceivedPoCount}
              />
            ))}
        </View.Item>

        <View.Item grow className={styles['shift-goal']}>
          {widgetData
            ?.filter((data) => data.widgetTitle === WidgetTypes.PO_ARRIVAL)
            .map((widgetData) => (
              <Widget
                widgetTitle={widgetData.widgetTitle}
                tileData={widgetData.tileData}
                poType={widgetData.poType}
              />
            ))}
        </View.Item>

        <View.Item grow className={styles['shift-goal']}>
          {widgetData
            ?.filter((data) => data.widgetTitle === WidgetTypes.Unassign_Replenishments)
            .map((widgetData) => (
              <Widget
                widgetTitle={widgetData.widgetTitle}
                tileData={widgetData.tileData}
                poType={widgetData.poType}
              />
            ))}
        </View.Item>
      </View>

      <View
        direction="row"
        padding={[4, 8]}
        justify="space-between"
        backgroundColor="secondary"
        align="center"
      >
        <View direction="row" align="center" gap={4}>
          <Button variant="secondary" size="large">
            Today
          </Button>
        </View>
        <View direction="row" align="center" justify="end" gap={4}>
          <Select
            label="Shift"
            variant="no-label"
            placeholder={t('Select Shift')}
            options={SHIFT_LIST}
            defaultValue={SHIFT_LIST[1]}
            className={styles['task-manager_shift']}
          />
        </View>
      </View>

      <View gap={4} direction="row" backgroundColor="secondary" padding={[0, 6]}>
        <View.Item columns={{ s: 12, m: 12, l: 6, xl: 4 }}>
          <View gap={2} direction="row" padding={[4, 0]} align="center" backgroundColor="secondary">
            <View
              align="center"
              justify="center"
              backgroundColor="primary"
              padding={[0.5, 2]}
              borderRadius="round"
              width="var(--st-unit-7)"
              height="var(--st-unit-7)"
            >
              <Text size="087" color="secondary">
                {
                  USERS_MOCK_DATA?.filter((user) => user.userStatus == t(UserStatus.NOT_ACTIVE))
                    .length
                }
              </Text>
            </View>
            <View.Item>
              <Text weight="bold" size="125">
                {t(UserStatus.NOT_ACTIVE)}
              </Text>
            </View.Item>
          </View>
          <View
            direction="row"
            gap={2}
            padding={[4, 4]}
            className={styles['task-manager_list-view']}
          >
            {USERS_MOCK_DATA?.filter((user) => user.userStatus == t(UserStatus.NOT_ACTIVE)).map(
              (users) => (
                <TaskManagerCard
                  id={users.id}
                  name={users?.name}
                  userStatus={users.userStatus}
                  assigned={users.assigned}
                  lastTransaction={users.lastTransaction}
                  workingDepartment={users.workingDepartment}
                  clocked_in={users.clocked_in}
                  onClickAssignTask={onClickAssignTask}
                  setOpenActionMenu={openActionMenu}
                />
              )
            )}
          </View>
        </View.Item>

        <View.Item columns={{ s: 12, m: 12, l: 6, xl: 4 }}>
          <View gap={2} direction="row" padding={[4, 0]} align="center" backgroundColor="secondary">
            <View
              align="center"
              justify="center"
              backgroundColor="primary"
              padding={[0.5, 2]}
              borderRadius="round"
              width="var(--st-unit-7)"
              height="var(--st-unit-7)"
            >
              <Text size="087" color="secondary">
                {USERS_MOCK_DATA?.filter((user) => user.userStatus == t(UserStatus.ACTIVE)).length}
              </Text>
            </View>
            <View.Item>
              <Text weight="bold" size="125">
                {t(UserStatus.ACTIVE)}
              </Text>
            </View.Item>
          </View>
          <View
            direction="row"
            gap={2}
            padding={[4, 4]}
            className={styles['task-manager_active-view']}
          >
            {USERS_MOCK_DATA?.filter((user) => user.userStatus == t(UserStatus.ACTIVE)).map(
              (users) => (
                <TaskManagerCard
                  id={users.id}
                  name={users.name}
                  userStatus={users.userStatus}
                  priority={users.priority}
                  detailText={users.detailText}
                  piecesData={users.piecesData}
                  tagItems={users.tagItems}
                  statusBadge={users.statusBadge}
                  poNumber={users.poNumber}
                  subZone={users.subZone}
                  onClickAssignTask={onClickAssignTask}
                  setOpenActionMenu={openActionMenu}
                />
              )
            )}
          </View>
        </View.Item>

        <View.Item columns={{ s: 12, m: 12, l: 6, xl: 4 }}>
          <View gap={2} direction="row" padding={[4, 0]} align="center" backgroundColor="secondary">
            <View
              align="center"
              justify="center"
              backgroundColor="primary"
              padding={[0.5, 2]}
              borderRadius="round"
              width="var(--st-unit-7)"
              height="var(--st-unit-7)"
            >
              <Text size="087" color="secondary">
                {
                  USERS_MOCK_DATA?.filter((user) => user.userStatus == t(UserStatus.ALMOST_DONE))
                    .length
                }
              </Text>
            </View>
            <View.Item>
              <Text weight="bold" size="125">
                {t(UserStatus.ALMOST_DONE)}
              </Text>
            </View.Item>
          </View>
          <View
            direction="row"
            gap={2}
            padding={[4, 4]}
            className={styles['task-manager_almost-view']}
          >
            {USERS_MOCK_DATA?.filter((user) => user.userStatus == t(UserStatus.ALMOST_DONE)).map(
              (users) => (
                <>
                  <TaskManagerCard
                    id={users.id}
                    name={users.name}
                    userStatus={users.userStatus}
                    priority={users.priority}
                    detailText={users.detailText}
                    piecesData={users.piecesData}
                    tagItems={users.tagItems}
                    statusBadge={users.statusBadge}
                    poNumber={users.poNumber}
                    subZone={users.subZone}
                    onClickAssignTask={onClickAssignTask}
                    setOpenActionMenu={openActionMenu}
                  />
                </>
              )
            )}
          </View>
        </View.Item>
        {userId &&
          USERS_MOCK_DATA?.filter((user) => user.id == userId).map((userData) => (
            <AssignTaskDrawer
              OpenDrawer={openAssignTaskDrawer}
              userId={userData.id}
              name={userData.name}
              username={userData.username}
              department={userData.department}
              onDrawerClose={onDrawerClose}
            />
          ))}
      </View>
    </>
  );
};
