import { OptionToDropdown } from '../Interfaces/OptionToDropdown';
import { Uom } from '../Interfaces/Uom';
import { Material } from './../Interfaces/Material';

export function materialToOptionToDropdown(material: Material): OptionToDropdown {
  return { value: material.longString, id: material.materialId, disabled: false }
}

export function materialsToOptionsToDropdown(materials: Material[]): OptionToDropdown[] {
  return materials.map(material => materialToOptionToDropdown(material));
}

export function uomToOptionToDropdown(uom: Uom): OptionToDropdown {
  return { value: uom.longString, id: uom.uomId, disabled: false }
}

export function uomsToOptionsToDropdown(uoms: Uom[]): OptionToDropdown[] {
  return uoms.map(uom => uomToOptionToDropdown(uom));
}
