/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useTranslation } from 'react-i18next';
import { View, Text, Button, Divider, Icon, Checkmark } from '@az/starc-ui';
import { Tile } from '../Tile/Tile';
import { WidgetProps } from './Widget.types.tsx';
import { PO_TYPES, WidgetTypes } from '@taskManagement/constants/constants.ts';
import styles from './Widget.module.scss';

export const Widget = ({
  widgetTitle,
  tileData,
  shift,
  assignedUsersCount,
  departmentUser,
  lastShiftPo,
  isShiftGoal,
  unReceivedPoCount,
  poType,
}: WidgetProps) => {
  const { t } = useTranslation();
  return (
    <>
      <View direction="row" gap={2} width="100%" className="widget">
        <View backgroundColor="secondary" padding={[6, 6]} width="100%">
          <Tile title={tileData?.title} action={tileData?.action} />
          <View direction="row" align="center" className={styles['widget_user_count']}>
            {shift && <Text size="112">{shift}&nbsp;|&nbsp;</Text>}
            {assignedUsersCount && (
              <Text size="112">
                {assignedUsersCount}&nbsp;{departmentUser}
              </Text>
            )}
          </View>
          {widgetTitle === WidgetTypes.SHIFT_PROGRESS && (
            <View className={styles['widget_data']} padding={[4, 4]} width="100%">
              <View direction="row" align="end" justify="space-between">
                <View.Item columns={{ s: 12, m: 12, l: 8, xl: 8 }}>
                  <Text size="100" variant="subtitle-bold">
                    {t(`ShiftProgress.NewShiftStarted`)}
                  </Text>
                  <Text size="087" className={styles['widget_subtext']}>
                    {t(`ShiftProgress.ReceivedText`)}&nbsp;
                    <u>
                      {t(`ShiftProgress.ReceivedPoCountTotal`, {
                        count: lastShiftPo?.value,
                        total: lastShiftPo?.max,
                      })}
                    </u>
                    &nbsp;
                    {t(`ShiftProgress.LastShiftText`)}&nbsp;
                    {t(`ShiftProgress.PendingPO`, {
                      PendingPO: lastShiftPo?.po,
                    })}
                    &nbsp;{t(`ShiftProgress.PoGoalText`)}
                  </Text>
                </View.Item>
                <View.Item columns={{ s: 12, m: 12, l: 4, xl: 4 }}>
                  <View direction="row" width="100%">
                    <Button size="small">{t(`ShiftProgress.SetShiftGoalBtn`)}</Button>
                  </View>
                </View.Item>
              </View>

              <Divider className={styles['widget_divider']} />

              <View gap={2} direction="row" align="center" width="100%" justify="space-between">
                <View direction="row" align="center">
                  <Text size="175" variant="display-3" className={styles['widget_po_count']}>
                    {unReceivedPoCount}
                  </Text>
                  <View justify="end" className={styles['widget_pos']}>
                    <Text size="087" variant="subtitle-bold">
                      {t(`ShiftProgress.Pos`)}
                    </Text>
                  </View>
                </View>
                {!isShiftGoal && (
                  <View align="center">
                    <Text
                      size="087"
                      variant="subtitle-regular"
                      className={styles['widget_no_shift']}
                    >
                      {t(`ShiftProgress.NoShiftGoal`)}
                    </Text>
                  </View>
                )}
              </View>

              <View
                gap={0}
                direction="row"
                align="center"
                width="100%"
                className={styles['widget_po_type']}
              >
                <Text
                  size="075"
                  variant="subtitle-bold"
                  textCase="uppercase"
                  className={styles['widget_breakdown_text']}
                >
                  {t(`ShiftProgress.PoTypeBreakDown`)}
                </Text>
                {poType &&
                  poType?.map((poTypes) => (
                    <View
                      padding={[2, 0]}
                      direction="row"
                      align="center"
                      justify="space-between"
                      width="100%"
                      gap={0}
                      className={
                        t(poTypes.label) !== t(PO_TYPES.LTD) ? styles['widget_breakdown'] : ''
                      }
                    >
                      <View gap={0} direction="row" align="center">
                        <Text>
                          <Icon svg={Checkmark} />
                        </Text>

                        <Text
                          size="087"
                          variant="subtitle-regular"
                          className={styles['widget_regular_po']}
                        >
                          {t(poTypes?.label)}
                        </Text>
                      </View>
                      <View>
                        <Text size="087" variant="subtitle-regular">
                          {poTypes?.value}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
