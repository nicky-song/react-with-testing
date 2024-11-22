/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Card } from '@az/starc-ui';
import { generateDateString } from '../../../ofm/utils/utils';
import { ProfileIcon } from '../Profile/ProfileIcon/ProfileIcon';
import styles from './CommentCard.module.scss';
import { useTranslation } from 'react-i18next';

// TODO: Change username prop to general User type once BFF is set up
export type CommentCardProps = {
  comment: string;
  username: string;
  timestamp: Date;
  locale?: string;
};

export const CommentCard = ({ comment, username, timestamp }: CommentCardProps) => {
  const { t } = useTranslation();

  const displayTimestamp = generateDateString(timestamp, t('DateFormat.ShortTime'));

  return (
    <Card className={styles['card']} hasHoverEffect={false}>
      <span className={styles['card__comment']}> {comment}</span>
      <div className={styles['card__footer']}>
        <ProfileIcon
          className={styles['card__icon']}
          name={username}
          textClassName={styles['card__icon-description']}
        />
        <span className={styles['card__username']}>{username}</span>
        <span className={styles['card__timestamp']}>{displayTimestamp}</span>
      </div>
    </Card>
  );
};
