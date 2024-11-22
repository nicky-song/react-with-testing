/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { Text, View } from '@az/starc-ui';

type Props = {
  text: string;
  isRequired?: boolean;
};

export const FormLabel = ({ text, isRequired }: Props) => {
  return (
    <View direction="row">
      <Text weight="medium" size="087">
        {text}
      </Text>
      {isRequired && (
        <View padding={[0, 0, 0, 1]}>
          <Text color="error">*</Text>
        </View>
      )}
    </View>
  );
};
