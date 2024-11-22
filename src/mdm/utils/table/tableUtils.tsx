/**
 * Copyright 2023 AutoZone, Inc.
 * Content is confidential to and proprietary information of AutoZone, Inc., its
 * subsidiaries and affiliates.
 */

import {
  ConsolidationLocationListRowTypes,
  LocationListRowTypes,
  SubZoneListRowTypes,
  VehicleListRowTypes,
  ZoneListRowTypes,
} from '@shared/components/Table/Table.types.ts';
import { ActionDropdownMenu } from '@shared/components/ActionDropdownMenu/ActionDropdownMenu.tsx';
import { Actionable, Checkbox, Icon, Text, View } from '@az/starc-ui';
import { t } from 'i18next';
import { ExternalLink } from '@az/starc-ui-icons';
import { getFormFieldIndexByKey } from '@mdm/utils/form/formUtils.tsx';

export const mapZoneTableRows = (
  rows: ZoneListRowTypes[],
  onViewDetails: (row: ZoneListRowTypes) => void
) => {
  return rows.map((zone) => ({
    id: zone.id.toString(),
    cells: [
      { value: zone.zoneId, sortValue: zone.zoneId },
      {
        value: zone.attributes
          ? zone.attributes[`${getFormFieldIndexByKey(zone.attributes, 'mapSequence')}`]?.value
          : '-',
        sortValue: zone.attributes
          ? zone.attributes[`${getFormFieldIndexByKey(zone.attributes, 'mapSequence')}`]?.value
          : '',
      },
      { value: zone.totalSubzones, sortValue: zone.totalSubzones.toString() },
      { value: zone.description, sortValue: zone.description },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => onViewDetails(zone)}>
                    <Text>{t('ViewDetails')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth>
                    <Text>Download</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveZone')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};

export const mapZoneAssociatedSubzoneTableRows = (
  rows: SubZoneListRowTypes[],
  onViewDetails: (row: SubZoneListRowTypes) => void
) => {
  return rows.map((subzone) => ({
    id: subzone.id.toString(),
    cells: [
      { value: subzone.name, sortValue: subzone.name },
      { value: subzone.description, sortValue: subzone.description },
      { value: subzone.type, sortValue: subzone.type },
      { value: subzone.totalLocations, sortValue: subzone.totalLocations.toString() },
      { value: subzone.totalVehicles, sortValue: subzone.totalVehicles.toString() },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => onViewDetails(subzone)}>
                    <View direction="row" gap={2}>
                      <Text>{t('ManageSubzone')}</Text>
                      <Icon svg={ExternalLink} />
                    </View>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveSubzone')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};

export const mapSubzoneTableRows = (
  rows: SubZoneListRowTypes[],
  onViewDetails: (row: SubZoneListRowTypes) => void
) => {
  return rows.map((subzone) => ({
    id: subzone.id.toString(),
    cells: [
      { value: subzone.name, sortValue: subzone.name },
      { value: subzone.zoneName, sortValue: subzone.zoneName },
      { value: subzone.description, sortValue: subzone.description },
      { value: subzone.type, sortValue: subzone.type },
      { value: subzone.pickRouteType, sortValue: subzone.pickRouteType },
      { value: subzone.totalLocations, sortValue: subzone.totalLocations.toString() },
      { value: subzone.totalVehicles, sortValue: subzone.totalVehicles.toString() },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => onViewDetails(subzone)}>
                    <Text>{t('ViewDetails')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth>
                    <Text>Download</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveSubzone')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};

export const mapSubzoneAssociatedVehicleTableRows = (rows: VehicleListRowTypes[]) => {
  return rows.map((vehicle, index: number) => ({
    id: vehicle.id.toString(),
    cells: [
      { value: vehicle.vehicleId, sortValue: vehicle.vehicleId },
      { value: vehicle.type, sortValue: vehicle.type },
      { value: vehicle.description, sortValue: vehicle.description },
      {
        value: vehicle.isFullPallet ? 'Yes' : 'No',
        sortValue: vehicle.isFullPallet ? 'Yes' : 'No',
      },
      {
        value: vehicle.isPartPallet ? 'Yes' : 'No',
        sortValue: vehicle.isPartPallet ? 'Yes' : 'No',
      },
      {
        value: (
          <Checkbox.Group name="isPickingAllowed">
            <Checkbox
              name="isPickingAllowed"
              value={`isPickingAllowed:${index.toString()}`}
              checked={vehicle.isPickingAllowed}
              label={t('Table.VehicleList.PickingAllowed')}
            />
          </Checkbox.Group>
        ),
        sortValue: vehicle.isPickingAllowed ? 'Yes' : 'No',
      },
      {
        value: (
          <Checkbox.Group name="isPutAwayAllowed">
            <Checkbox
              name="isPutAwayAllowed"
              value={`isPutAwayAllowed:${index.toString()}`}
              checked={vehicle.isPutAwayAllowed}
              label={t('Table.VehicleList.PutawayAllowed')}
            />
          </Checkbox.Group>
        ),
        sortValue: vehicle.isPutAwayAllowed ? 'Yes' : 'No',
      },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth>
                    <View direction="row" gap={2}>
                      <Text>{t('ManageVehicle')}</Text>
                      <Icon svg={ExternalLink} />
                    </View>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveVehicle')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};

export const mapSubzoneAssociatedLocationTableRows = (rows: LocationListRowTypes[]) => {
  return rows.map((location) => ({
    id: location.id.toString(),
    cells: [
      { value: location.locationId, sortValue: location.locationId },
      { value: location.type, sortValue: location.type },
      { value: location.stockRoom, sortValue: location.stockRoom },
      { value: location.sku, sortValue: location.sku },
      { value: location.quantityUnits, sortValue: location.quantityUnits.toString() },
      { value: location.quantityReserved, sortValue: location.quantityReserved.toString() },
      { value: location.minimum, sortValue: location.minimum.toString() },
      { value: location.maximum, sortValue: location.maximum.toString() },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth>
                    <View direction="row" gap={2}>
                      <Text>{t('ManageLocation')}</Text>
                      <Icon svg={ExternalLink} />
                    </View>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveLocation')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};

export const mapLocationTableRows = (
  rows: LocationListRowTypes[],
  onViewDetails: (row: LocationListRowTypes) => void
) => {
  return rows.map((location) => ({
    id: location.id.toString(),
    cells: [
      { value: location.locationId, sortValue: location.locationId },
      { value: location.zone, sortValue: location.zone.toString() },
      { value: location.subzone, sortValue: location.subzone.toString() },
      {
        value:
          location.attributes[`${getFormFieldIndexByKey(location.attributes, 'sku')}`]?.value ||
          '-',
        sortValue: location.sku,
      },
      { value: location.type, sortValue: location.type },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => onViewDetails(location)}>
                    <View direction="row" gap={2}>
                      <Text>{t('ManageLocation')}</Text>
                      <Icon svg={ExternalLink} />
                    </View>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveLocation')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};

export const mapConsolidationLocationTableRows = (
  rows: ConsolidationLocationListRowTypes[],
  onViewDetails: (row: ConsolidationLocationListRowTypes) => void
) => {
  return rows.map((location) => ({
    id: location.id.toString(),
    cells: [
      { value: location.locationId, sortValue: location.locationId },
      { value: location.zoneName, sortValue: location.zoneName.toString() },
      { value: location.subzoneName, sortValue: location.subzoneName.toString() },
      {
        value:
          location.attributes[`${getFormFieldIndexByKey(location.attributes, 'locationType')}`]
            ?.value || '',
        sortValue:
          location.attributes[`${getFormFieldIndexByKey(location.attributes, 'locationType')}`]
            ?.value || '',
      },
      {
        value: (
          <ActionDropdownMenu>
            <View padding={[1, 0]}>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => onViewDetails(location)}>
                    <View direction="row" gap={2}>
                      <Text>{t('ManageLocation')}</Text>
                      <Icon svg={ExternalLink} />
                    </View>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text>{t('Duplicate')}</Text>
                  </Actionable>
                </View>
              </View.Item>
              <View.Item>
                <View padding={[3, 4]}>
                  <Actionable fullWidth onClick={() => ({})}>
                    <Text color="error">{t('RemoveLocation')}</Text>
                  </Actionable>
                </View>
              </View.Item>
            </View>
          </ActionDropdownMenu>
        ),
        sortValue: '',
      },
    ],
  }));
};
