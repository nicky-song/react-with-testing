/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Accordion, classNames, TextField, Link, View, Text, Skeleton } from '@az/starc-ui';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentProps, HeaderProps } from './Comments.types';
import styles from './Comments.module.scss';
import { MAX_VISIBLE_COMMENTS } from '../../../ofm/constants/dataConstants';
import { useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const Header = ({ count }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <View direction="row" width="100%">
      <Text className={classNames(styles['root__header'])}>
        {t('CommentDetails.CommentActivityHeader')} ({count})
      </Text>
    </View>
  );
};

export const Comments = ({
  isOpen,
  comments,
  handleCommentSubmit,
  className,
  isLoading,
}: CommentProps) => {
  /* State variables */
  const [commentCount, setCommentCount] = useState(MAX_VISIBLE_COMMENTS);
  const [commentValue, setCommentValue] = useState('');

  /* Constants */
  const { t } = useTranslation();

  /* Functions */
  const handleCommentsCount = () => {
    if (commentCount === comments.length) {
      setCommentCount(MAX_VISIBLE_COMMENTS);
    } else {
      setCommentCount(comments.length);
    }
  };

  const handleCommentChange = (value: string) => {
    setCommentValue(value);
  };

  const handleMoreComments = () => {
    return comments.length
      ? comments.length > commentCount
        ? `${t('CommentDetails.ShowOlderComments')} (${comments.length - commentCount})`
        : comments.length - MAX_VISIBLE_COMMENTS > 0
        ? `${t('CommentDetails.HideOlderComments')} (${comments.length - MAX_VISIBLE_COMMENTS})`
        : ''
      : '';
  };

  return (
    <Accordion
      className={classNames(styles['root'], className)}
      headerOptions={{
        headerElement: isLoading ? (
          <Skeleton borderRadius="small" width="120px" height="24px" />
        ) : (
          <Header count={comments.length} />
        ),
      }}
      defaultOpen={isOpen}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (commentValue !== '') {
            // TODO: implement the user's username once Auth is completed
            handleCommentSubmit({
              comment: commentValue,
              username: 'msummerville',
              timestamp: new Date(Date.now()),
              locale: i18next.language,
            });
            setCommentValue('');
          }
        }}
      >
        <TextField
          id="comment"
          variant="floating"
          label={t('CommentDetails.NewComment')}
          value={commentValue}
          onChange={(event) => handleCommentChange(event.target.value)}
        />
      </form>
      <View direction="column" className={classNames(styles['root__comment-details'])}>
        {comments.slice(0, commentCount).map((comment, key) => {
          return (
            <CommentCard
              key={'comment' + key}
              comment={comment.comment}
              username={comment.username}
              timestamp={comment.timestamp}
            />
          );
        })}
      </View>
      <View gap={5} direction="column">
        <Link
          variant="underline"
          className={classNames(styles['root__link-details'])}
          onClick={() => handleCommentsCount()}
          preventHoverOpacityChange={false}
        >
          {handleMoreComments()}
        </Link>
      </View>
    </Accordion>
  );
};
