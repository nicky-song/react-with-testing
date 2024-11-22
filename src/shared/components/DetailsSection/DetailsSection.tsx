/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { View, Text, classNames, Link } from '@az/starc-ui';
import styles from './DetailsSection.module.scss';
import * as T from './DetailsSection.types';

const CustomText = ({ text, buttonText, onClick, index }: T.CustomTextProps) => {
  return (
    <Text
      key={`detail-${index ? index : Math.random().toString(36).substring(2, 5)}`}
      color="primary"
      size="087"
      weight="regular"
      className={styles['details-section__text']}
    >
      {text}
      {buttonText && (
        <Link as="button" onClick={onClick} className={styles['details-section__button']}>
          <Text weight="medium">{buttonText}</Text>
        </Link>
      )}
    </Text>
  );
};

const MandatoryAsterisk = () => {
  return <span className={styles['details-section__text--mandatory']}>*</span>;
};

export const DetailsSection = ({ header, rows, children, loading }: T.DetailsSectionProps) => {
  return (
    <View padding={6} align="start" className={styles['details-section']}>
      <View width="100%">
        <Text
          color="primary"
          size="100"
          weight="bold"
          className={styles['details-section__header']}
          as="h3"
        >
          {header}
        </Text>
      </View>
      <View width="100%" direction="column" className={styles['details-section__container']}>
        {children}
        {loading ? (
          loading
        ) : (
          <dl data-testid="row-item-details" className={styles['details-section__items']}>
            {rows.map((row) => (
              <View
                className={styles['details-section__item']}
                wrap={false}
                direction="row"
                width="100%"
                key={row.label}
              >
                <dt
                  className={classNames(
                    styles['details-section__label'],
                    !!row.children && styles['details-section__label--wide']
                  )}
                >
                  <Text
                    color="primary"
                    size="087"
                    weight="medium"
                    className={classNames(
                      styles['details-section__text'],
                      !!row.children && styles['details-section__text--with-margin']
                    )}
                  >
                    {row.label}
                    {row.isMandatory && <MandatoryAsterisk />}
                  </Text>
                  {row.children && row.children}
                </dt>
                <dd className={styles['details-section__attributes']}>
                  {Array.isArray(row.text) ? (
                    row.text.map((text, index) => (
                      <CustomText key={text} text={text} index={index} />
                    ))
                  ) : (
                    <CustomText text={row.text} buttonText={row.buttonText} onClick={row.onClick} />
                  )}
                </dd>
              </View>
            ))}
          </dl>
        )}
      </View>
    </View>
  );
};
