/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, Icon, ChevronLeft, SearchBar, Actionable, Link } from '@az/starc-ui';
import { t } from 'i18next';
import { Drawer } from '@shared/components/Drawer/Drawer';
import { Avatar } from '@shared/components/Avatar/Avatar';
import { AssignTaskDrawerProps } from '@taskManagement/components/AssignTaskDrawer/AssignTaskDrawer.types';
import { CombinedPillTabs } from '@taskManagement/components/CombinedPillTabs/CombinedPillTabs';
import { InboundTaskTypeFilter } from '@taskManagement/constants/constants';
import styles from './AssignTaskDrawer.module.scss';

export const AssignTaskDrawer = ({
  username,
  userId,
  name,
  department,
  onDrawerClose,
  OpenDrawer,
}: AssignTaskDrawerProps) => {
  return (
    <>
      <Drawer
        show={OpenDrawer}
        handleClose={() => onDrawerClose(false)}
        className={styles['assign-task-drawer']}
        size="small"
        position="right"
        CustomHeader={
          username && (
            <>
              <View gap={4} direction="row" align="center" backgroundColor="secondary">
                <View
                  align="center"
                  justify="center"
                  className={styles['assign-task-drawer__profile-icon']}
                  padding={[2, 2]}
                  borderRadius="round"
                  width="var(--st-unit-14)"
                  height="var(--st-unit-14)"
                  gap={2}
                >
                  <Avatar key={'avatar' + userId} name={username} size="extraLarge" />
                </View>

                <View.Item gapBefore={6}>
                  <View direction="row" align="center">
                    <Text
                      weight="bold"
                      size="175"
                      className={styles['assign-task-drawer__username']}
                    >
                      {name}
                    </Text>
                  </View>
                  <View direction="row" align="start" width="100%" justify="start">
                    <Text size="100">
                      {username}&nbsp;|&nbsp; {department}&nbsp;&nbsp;
                      <Link>{t(`NotActiveDropDownList.MoveToAnotherDepartment`)}</Link>
                    </Text>
                  </View>
                </View.Item>
              </View>
            </>
          )
        }
      >
        <View
          gap={1}
          padding={[0, 6]}
          direction="row"
          align="center"
          width="100%"
          justify="start"
          className={styles['available-tasks']}
        >
          <View gap={4} align="center" direction="row">
            <Actionable onClick={() => onDrawerClose(false)}>
              <Icon svg={ChevronLeft} />
            </Actionable>
          </View>
          <View gap={2} align="center" direction="row">
            <Text size="125" variant="subtitle-bold">
              {t(`AvailableTasks`)}
            </Text>
          </View>
        </View>

        <View padding={6} gap={4} align="center" width="100%" direction="row">
          <SearchBar
            className={styles['available-tasks__search']}
            label={t(`SearchDrawerPlaceholder`)}
            maxMenuHeight={300}
          />

          <CombinedPillTabs TabsFilterData={InboundTaskTypeFilter} />
        </View>
      </Drawer>
    </>
  );
};
