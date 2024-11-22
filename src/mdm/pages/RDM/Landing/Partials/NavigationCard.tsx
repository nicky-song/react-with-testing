/**
 * Copyright 2024 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { ActionCard } from '@shared/components/ActionCard/ActionCard.tsx';
import { CardGridSkeleton } from '@shared/components/Skeletons/CardGridSkeleton.tsx';
import { NavigationCardProps } from '@mdm/pages/RDM/Landing/Partials/NavigationCard.types.ts';

export const NavigationCard = ({
  isLoading,
  title,
  description,
  onClickHandler,
}: NavigationCardProps) => {
  return (
    <>
      {isLoading ? (
        <CardGridSkeleton items={1} hasProgress />
      ) : (
        <ActionCard
          title={title}
          description={description}
          searchValue=""
          onClickHandler={onClickHandler}
        />
      )}
    </>
  );
};
