/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { CommentCardProps } from '../CommentCard/CommentCard';

export type CommentProps = {
  isOpen: boolean;
  comments: CommentCardProps[];
  handleCommentSubmit: (data: CommentCardProps) => void;
  className?: string;
  isLoading?: boolean;
};

export type HeaderProps = {
  count: number;
};
