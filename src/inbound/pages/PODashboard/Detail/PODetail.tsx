/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';

import {
  Accordion,
  Actionable,
  Button,
  Icon,
  Link,
  Notification,
  SearchBar,
  Text,
  View,
} from '@az/starc-ui';
import { ActionDelete, Add, Chat, ChevronDown } from '@az/starc-ui-icons';

import { Ellipses } from '@shared/assets/icons';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu';
import { Avatar } from '@shared/components/Avatar/Avatar';
import { MasterTitle } from '@shared/components/MasterTitle/MasterTitle';
import { WMSInlineNotification } from '@shared/components/Notification/Notification';
import { ACTIONS } from '@shared/constants/constants';
import { PAGE_URLS, ROUTES } from '@shared/constants/routes';
import { Stat } from '@shared/components/Stat/Stat';
import { Tag } from '@shared/components/Tag/Tag';
import { StatusVariants } from '@shared/components/StatusBadge/StatusBadge.types';
import { User } from '@shared/components/AvatarGroup/AvatarGroup.types';

import {
  existingAssigneesAtom,
  currentAssigneesAtom,
  suggestionAssigneesAtom,
} from '@inbound/atoms/addEditAssignees/addEditAssigneesAtom';
import { PriorityTag } from '@inbound/components/PriorityTag/PriorityTag';
import { EditPOModal } from '@inbound/components/EditPOModal/EditPOModal';
import { PriorityToggle } from '@inbound/components/PriorityToggle/PriorityToggle';
import { RemovePOModal } from '@inbound/components/RemovePOModal/RemovePOModal';
import { RecommendedAssignees } from '@inbound/components/RecommendedAssignees/RecommendedAssignees';
import { AddEditAssigneesModal } from '@inbound/components/AddEditAssigneesModal/AddEditAssigneesModal';
import { PO_DASHBOARD_ROWS, RECOMMENDED_ASSIGNEES } from '@inbound/constants/dataConstants';
import { PODashboardDataRowType } from '@inbound/types/types';
import {
  calculatePercentageWithSign,
  replaceAll,
  statusToBadgeVariant,
} from '@inbound/utils/utils';

import { PODetailSkeleton } from './PODetailSkeleton';
import { ProductTabs } from './ProductTabs/ProductTabs';
import { ProductTable } from './ProductTabs/ProductTable';
import { PODetailStatusModal } from './PODetailStatusModal';

import styles from './PODetail.module.scss';

export const PODetail = () => {
  /* Atoms */
  const [existingAssignees, setExistingAssignees] = useAtom(existingAssigneesAtom);
  const [currentAssignees, setCurrentAssignees] = useAtom(currentAssigneesAtom);
  const [, setSuggestionAssignees] = useAtom(suggestionAssigneesAtom);

  /* State variables */
  const [poData, setPOData] = useState<PODashboardDataRowType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPOEditModal, setShowPOEditModal] = useState<boolean>(false);
  const [isShowOnHold, setIsShowOnHold] = useState<boolean>(false);
  const [showPOHoldModal, setShowPOHoldModal] = useState<boolean>(false);
  const [isOnHold, setIsOnHold] = useState<boolean>(false);
  const [showPORemoveModal, setShowPORemoveModal] = useState<boolean>(false);
  const [showAddEditAssigneesModal, setShowAddEditAssigneesModal] = useState<boolean>(false);
  const [isHighPriority, setIsHighPriority] = useState<boolean | undefined>(false);

  /* Constants */
  const { t } = useTranslation();
  const { poId: id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tabTitles = {
    QUANTITY_UNMATCHED: t('CombinedTabs.PODetails.QuantityUnmatched'),
    QUANTITY_MATCHED: t('CombinedTabs.PODetails.QuantityMatched'),
  };

  const breadcrumbs = {
    data: [
      {
        label: t('PODashboard.Title'),
        url: PAGE_URLS.PO_DASHBOARD,
      },
      {
        label: t('PODashboard.PoWithNumber', {
          poNumber: id,
        }),
        url: '',
      },
    ],
  };

  const tabs = [
    {
      name: tabTitles.QUANTITY_UNMATCHED,
      numberOfItems: 5,
      value: 'quantity-unmatched',
      item: ProductTable,
    },
    {
      name: tabTitles.QUANTITY_MATCHED,
      numberOfItems: 5,
      value: 'quantity-matched',
      item: ProductTable,
    },
  ];

  /* Functions */
  const fetchPODetails = useCallback(() => {
    if (id) {
      const po = PO_DASHBOARD_ROWS.find((po) => po.poNumber === parseInt(id));
      setPOData(po);
      setIsHighPriority(po?.priority);
      setExistingAssignees(po?.users);
    }
  }, [id]);

  const renderMaterTitleSubTitle = (poData: PODashboardDataRowType) => {
    return (
      <View direction="row" align="center" className={styles['po-detail__master-title__sub-title']}>
        <View.Item>
          <View
            direction="row"
            justify="center"
            className={styles['po-detail__master-title__sub-title__right-items']}
          >
            {isHighPriority && (
              <View.Item>
                <PriorityTag />
              </View.Item>
            )}

            <View.Item>
              <Tag
                variant="order"
                text={poData.poType}
                className={styles['po-detail__master-title__sub-title__tag']}
              />
            </View.Item>
          </View>
        </View.Item>
        <View.Item>
          <Text color="600">
            {t('PODashboard.PoWithNumber', {
              poNumber: id,
            })}
          </Text>
        </View.Item>
        {poData?.door && (
          <View.Item>
            <Text color="600">{t('PODashboard.DoorWithName', { door: poData?.door })}</Text>
          </View.Item>
        )}
      </View>
    );
  };

  const renderPOStatistic = (title: string, primaryText: string, secondaryText?: string) => {
    return (
      <View.Item grow backgroundColor="secondary">
        {secondaryText ? (
          <Stat
            title={title}
            primaryText={primaryText}
            width="100%"
            secondaryTextProps={{
              secondaryText: secondaryText,
            }}
          />
        ) : (
          <Stat title={title} primaryText={primaryText} width="100%" />
        )}
      </View.Item>
    );
  };

  const onCloseEdit = () => {
    setShowPOEditModal(false);
    navigate(PAGE_URLS.PO_DASHBOARD);
  };

  const onClosePutPOHold = (status: string | null) => {
    setShowPOHoldModal(false);

    if (status === ACTIONS.CLOSE && !isOnHold) {
      navigate(PAGE_URLS.PO_DASHBOARD);
    }
  };

  const onCloseRemove = () => {
    setShowPORemoveModal(false);
    navigate(PAGE_URLS.PO_DASHBOARD);
  };

  const onOpenAddEditAssignees = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentAssignees(structuredClone(existingAssignees));
    setShowAddEditAssigneesModal(true);
  };

  const onAssigneeSelect = (user: User) => {
    setExistingAssignees([user]);
  };

  const onCloseAddEditAssignees = () => {
    setCurrentAssignees(null);
    setSuggestionAssignees(null);

    setShowAddEditAssigneesModal(false);
  };

  const onSubmitAssignees = () => {
    // @todo : replace this while working with backend integration
    setExistingAssignees(structuredClone(currentAssignees));

    onCloseAddEditAssignees();
  };

  const onRemoveAssignee = (userId: number) => {
    setExistingAssignees(existingAssignees?.filter((assignee) => assignee.id !== userId));
  };

  const onChangePriority = (priority: boolean) => {
    setIsHighPriority(priority);
  };

  /* Hooks */
  useEffect(() => {
    if (id) {
      fetchPODetails();
    }
  }, [fetchPODetails, id]);

  useEffect(() => {
    if (location.pathname.indexOf(ROUTES.EDIT) !== -1) {
      setShowPOEditModal(true);
    } else if (location.pathname.indexOf(ROUTES.PUT_ON_HOLD) !== -1) {
      setIsShowOnHold(true);
    } else if (location.pathname.indexOf(ROUTES.REMOVE) !== -1) {
      setShowPORemoveModal(true);
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // fake the api delay
    }, 2000);
  }, []);

  if (isLoading) {
    return <PODetailSkeleton />;
  } else {
    return (
      <View direction="column" height="100%" className={styles['po-detail']}>
        {poData && (
          <>
            <MasterTitle
              title={poData.vendorName}
              breadcrumbProps={breadcrumbs}
              statusBadgeProps={{
                variant: isOnHold ? StatusVariants.CANCELLED : statusToBadgeVariant(poData.status),
                text: isOnHold ? t('OrderStatus.OnHold') : replaceAll(poData.status, '_', ' '),
              }}
              subtitle={renderMaterTitleSubTitle(poData)}
            >
              <View direction="row" justify="end" align="center" gap={4}>
                <View.Item>
                  <Link
                    onClick={() => {
                      return;
                    }}
                    startIcon={Chat}
                    endIcon={ChevronDown}
                  >
                    {t('PODashboard.Activity')}
                  </Link>
                </View.Item>

                {isShowOnHold && !isOnHold && (
                  <View.Item>
                    <Button
                      size="large"
                      onClick={() => setShowPOHoldModal(true)}
                      variant="secondary"
                    >
                      <View direction="row">
                        <Text>{t('PODashboard.Actions.PutPOOnHold')}</Text>
                      </View>
                    </Button>
                  </View.Item>
                )}

                <View.Item>
                  {isOnHold ? (
                    <Button
                      size="large"
                      onClick={() => {
                        return;
                      }}
                    >
                      <View direction="row">
                        <Text>{t('PODashboard.Actions.RemoveHold')}</Text>
                      </View>
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      onClick={() => {
                        return;
                      }}
                    >
                      <View direction="row">
                        <Text>{t('PODashboard.Finalize')}</Text>
                      </View>
                    </Button>
                  )}
                </View.Item>

                <View.Item>
                  <View direction="row">
                    <Link
                      onClick={() => {
                        return;
                      }}
                    >
                      <Icon svg={Ellipses} />
                    </Link>
                  </View>
                </View.Item>
              </View>
            </MasterTitle>

            <View direction="row" width="100%" height="100%" wrap={false}>
              <View.Item
                columns={{ s: 4, m: 4, l: 4, xl: 3 }}
                className={styles['po-detail__left-column']}
                attributes={{
                  'data-testid': 'po-details-left-column',
                }}
              >
                <View>
                  <Accordion
                    className={styles['po-detail__left-column__accordion']}
                    headerOptions={{
                      triggerInnerClassName:
                        styles['po-detail__left-column__accordion__trigger-inner'],
                      headerElement: (
                        <View direction="row">
                          <View.Item grow>
                            <Text
                              color="primary"
                              size="100"
                              weight="bold"
                              className={styles['po-detail__left-column__accordion__header']}
                            >
                              {t('PODashboard.Assignees.Title')}
                            </Text>
                          </View.Item>
                          <View.Item>
                            <Link
                              className={
                                styles['po-detail__left-column__accordion__auxiliary-label__link']
                              }
                              onClick={(e) => onOpenAddEditAssignees(e)}
                              startIcon={Add}
                            >
                              {existingAssignees?.length === 0
                                ? t('PODashboard.Assignees.AddAssignee')
                                : t('PODashboard.Assignees.EditAssignee')}
                            </Link>
                          </View.Item>
                        </View>
                      ),
                    }}
                  >
                    {existingAssignees?.length === 0 ? (
                      <RecommendedAssignees
                        assignees={RECOMMENDED_ASSIGNEES}
                        onButtonClick={(user) => onAssigneeSelect(user)}
                      />
                    ) : (
                      <View
                        direction="column"
                        padding={[4, 0, 0, 0]}
                        className={
                          styles['po-detail__left-column__accordion__assignees_items_wrapper']
                        }
                      >
                        {existingAssignees?.map((user, index) => (
                          <View.Item
                            key={t('PODashboard.ItemKey', { item: 'assignees', key: index })}
                          >
                            <View direction="row" align="center">
                              <View.Item grow>
                                <Avatar
                                  name={user.firstName + ' ' + user.lastName}
                                  size="large"
                                  showText={true}
                                />
                              </View.Item>

                              <View.Item>
                                <ActionDropdownMenu>
                                  <View padding={[1, 0]}>
                                    <View.Item>
                                      <View padding={[3, 4]}>
                                        <Actionable
                                          fullWidth
                                          onClick={() => {
                                            return;
                                          }}
                                        >
                                          <Text>{t('PODashboard.Actions.ManageTasks')}</Text>
                                        </Actionable>
                                      </View>
                                    </View.Item>
                                    <View.Item>
                                      <View padding={[3, 4]}>
                                        <Actionable
                                          fullWidth
                                          onClick={() => onRemoveAssignee(user.id)}
                                        >
                                          <Text>{t('PODashboard.Actions.RemoveAssignee')}</Text>
                                        </Actionable>
                                      </View>
                                    </View.Item>
                                  </View>
                                </ActionDropdownMenu>
                              </View.Item>
                            </View>
                          </View.Item>
                        ))}
                      </View>
                    )}
                  </Accordion>

                  <Accordion
                    className={styles['po-detail__left-column__accordion']}
                    headerOptions={{
                      triggerInnerClassName:
                        styles['po-detail__left-column__accordion__trigger-inner'],
                      headerElement: (
                        <View direction="row">
                          <View.Item grow>
                            <Text
                              color="primary"
                              size="100"
                              weight="bold"
                              className={styles['po-detail__left-column__accordion__header']}
                            >
                              {t('PODashboard.PODetails')}
                            </Text>
                          </View.Item>
                          <View.Item>
                            <Link
                              className={
                                styles['po-detail__left-column__accordion__auxiliary-label__link']
                              }
                              onClick={() => {
                                return;
                              }}
                            >
                              {t('Edit')}
                            </Link>
                          </View.Item>
                        </View>
                      ),
                    }}
                  >
                    <View
                      direction="column"
                      padding={[4, 0, 0, 0]}
                      className={styles['po-detail__left-column__accordion__edit_items_wrapper']}
                    >
                      <View.Item>
                        <View direction="row" align="center" gap={6}>
                          <View.Item columns={6}>
                            <Text color="primary" size="100">
                              {t('PODashboard.HighPriority')}
                            </Text>
                          </View.Item>
                          <View.Item columns={6}>
                            <PriorityToggle
                              name="priority"
                              checked={isHighPriority ? true : false}
                              onValueChange={(priority) => onChangePriority(priority)}
                            />
                          </View.Item>
                        </View>
                      </View.Item>
                    </View>
                  </Accordion>

                  <Accordion
                    className={styles['po-detail__left-column__accordion']}
                    headerOptions={{
                      triggerInnerClassName:
                        styles['po-detail__left-column__accordion__trigger-inner'],
                      headerElement: (
                        <View direction="row">
                          <Text
                            color="primary"
                            size="100"
                            weight="bold"
                            className={styles['po-detail__left-column__accordion__header']}
                          >
                            {t('PODashboard.SCAContactInformation')}
                          </Text>
                        </View>
                      ),
                    }}
                  >
                    <View padding={[4, 0]}>
                      <Text color="primary" size="100">
                        {t('PODashboard.SCAContactInformation')}
                      </Text>
                    </View>
                  </Accordion>

                  <View padding={6} className={styles['po-detail__left-column__remove-po_wrapper']}>
                    <Link
                      className={styles['po-detail__left-column__remove-po_wrapper__action']}
                      onClick={() => {
                        return;
                      }}
                    >
                      <View direction="row" justify="center" align="center" gap={2}>
                        <Icon svg={ActionDelete} color="error" />
                        <Text color="error">{t('PODashboard.RemovePO.ActionText')}</Text>
                      </View>
                    </Link>
                  </View>
                </View>
              </View.Item>

              <View.Item
                grow
                className={styles['po-detail__right-column']}
                attributes={{
                  'data-testid': 'po-details-right-column',
                }}
              >
                <View
                  direction="row"
                  padding={[4, 6]}
                  className={styles['po-detail__right-column__statistics']}
                >
                  {renderPOStatistic(
                    t('PODashboard.Stats.Received'),
                    calculatePercentageWithSign(poData.lines, poData.totalLines),
                    t('PODashboard.LinesData', { count: poData.lines, total: poData.totalLines })
                  )}
                  {renderPOStatistic(
                    t('PODashboard.Stats.PiecesFitInFPS'),
                    calculatePercentageWithSign(poData.pieces, poData.totalPices),
                    t('PODashboard.PicesData', { count: poData.pieces, total: poData.totalPices })
                  )}
                  {renderPOStatistic(
                    t('PODashboard.Stats.SKUsWithFPS'),
                    calculatePercentageWithSign(poData.skusWithFPS, poData.totalSkusWithFPS),
                    t('PODashboard.SkuWithFPSData', {
                      count: poData.skusWithFPS,
                      total: poData.totalSkusWithFPS,
                    })
                  )}
                  {renderPOStatistic(
                    t('PODashboard.Stats.ReceivingLaborHoursRemaining'),
                    t('PODashboard.Stats.Hours', { count: 0.53 })
                  )}
                </View>

                {isOnHold && (
                  <View padding={[4, 6]}>
                    <Notification
                      {...WMSInlineNotification.snack}
                      title={t('InlineNotification.HoldPODetails.Title')}
                      text={t('InlineNotification.HoldPODetails.Text')}
                      ctaLabel={t('PODashboard.Actions.RemoveHold')}
                      ctaType="button"
                      ctaOnClick={() => {
                        return;
                      }}
                    />
                  </View>
                )}
                <View
                  direction="row"
                  padding={[4, 6]}
                  className={styles['po-detail__right-column__search-wrapper']}
                >
                  <SearchBar
                    className={styles['po-detail__right-column__search-bar']}
                    label={t('PODashboard.Search.DetailsPlaceholder')}
                    maxMenuHeight={300}
                  />
                </View>

                <View>
                  <ProductTabs tabs={tabs} />
                </View>
              </View.Item>
            </View>

            <EditPOModal isOpen={showPOEditModal} poData={poData} onClose={() => onCloseEdit()} />

            <PODetailStatusModal
              poId={poData.poNumber}
              isOpen={showPOHoldModal}
              onClose={(status) => onClosePutPOHold(status)}
              isOnHold={isOnHold}
              setIsOnHold={setIsOnHold}
            />

            <RemovePOModal isOpen={showPORemoveModal} onClose={() => onCloseRemove()} />

            <AddEditAssigneesModal
              isOpen={showAddEditAssigneesModal}
              onClose={() => onCloseAddEditAssignees()}
              onSubmit={() => onSubmitAssignees()}
            />
          </>
        )}
      </View>
    );
  }
};
