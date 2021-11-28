import { Material } from './../app/contracts/Interfaces/Material';

export const FORMS_TYPES = [
  { formsId: 1, isMandatory: true, isDisabled: false, hasDefaultValue: true, isInput: true, description: 'mandatory editable Input with default value' },
  { formsId: 2, isMandatory: true, isDisabled: false, hasDefaultValue: true, isInput: false, description: 'mandatory editable Dropdown with default value' },
  { formsId: 3, isMandatory: true, isDisabled: false, hasDefaultValue: false, isInput: true, description: 'mandatory editable Input without default value' },
  { formsId: 4, isMandatory: true, isDisabled: false, hasDefaultValue: false, isInput: false, description: 'mandatory editable Dropdown without default value' },
  { formsId: 5, isMandatory: true, isDisabled: true, hasDefaultValue: true, isInput: true, description: 'mandatory uneditable Input with default value' },
  { formsId: 6, isMandatory: true, isDisabled: true, hasDefaultValue: true, isInput: false, description: 'mandatory uneditable Dropdown with default value' },
  { formsId: 7, isMandatory: true, isDisabled: true, hasDefaultValue: false, isInput: true, description: 'mandatory uneditable Input without default value' },
  { formsId: 8, isMandatory: true, isDisabled: true, hasDefaultValue: false, isInput: false, description: 'mandatory uneditable Dropdown without default value' },
  { formsId: 9, isMandatory: false, isDisabled: false, hasDefaultValue: true, isInput: true, description: 'optional editable Input with default value' },
  { formsId: 10, isMandatory: false, isDisabled: false, hasDefaultValue: true, isInput: false, description: 'optional editable Dropdown with default value' },
  { formsId: 11, isMandatory: false, isDisabled: false, hasDefaultValue: false, isInput: true, description: 'optional editable Input without default value' },
  { formsId: 12, isMandatory: false, isDisabled: false, hasDefaultValue: false, isInput: false, description: 'optional editable Dropdown without default value' },
  { formsId: 13, isMandatory: false, isDisabled: true, hasDefaultValue: true, isInput: true, description: 'optional uneditable Input with default value' },
  { formsId: 14, isMandatory: false, isDisabled: true, hasDefaultValue: true, isInput: false, description: 'optional uneditable Dropdown with default value' },
  { formsId: 15, isMandatory: false, isDisabled: true, hasDefaultValue: false, isInput: true, description: 'optional uneditable Input without default value' },
  { formsId: 16, isMandatory: false, isDisabled: true, hasDefaultValue: false, isInput: false, description: 'optional uneditable Dropdown without default value' },
]

export const PROPERTIES = [
  { propertyId: 1, longString: 'Price', shortString: 'price' },
  { propertyId: 2, longString: 'ETR Concentration', shortString: 'etr-concentration' },
  { propertyId: 3, longString: 'Concentration', shortString: 'concentration' },
  { propertyId: 4, longString: 'Model Coefficient', shortString: 'model-coefficient' },
]

export const UOMS = [
  { uomId: 0, uomType: 'none', shortString: 'none', longString: 'Dimensionless' },
  { uomId: 1, uomType: 'pounderal-price', shortString: 'usd/kg', longString: 'USD/Kg' },
  { uomId: 2, uomType: 'volumetric-price', shortString: 'usd/l', longString: 'USD/L' },
  { uomId: 3, uomType: 'unit-price', shortString: 'usd/un', longString: 'USD/Un.' },
  { uomId: 4, uomType: 'pounderal-price', shortString: 'brl/kg', longString: 'BRL/Kg' },
  { uomId: 5, uomType: 'volumetric-price', shortString: 'brl/l', longString: 'BRL/L' },
  { uomId: 6, uomType: 'unit-price', shortString: 'brl/un', longString: 'BRL/Un.' },
  { uomId: 7, uomType: 'etr-concentration', shortString: 'mol/l-element', longString: 'mol/L of Element' },
  { uomId: 8, uomType: 'etr-concentration', shortString: 'mol/l-oxide', longString: 'mol/L of Oxide' },
  { uomId: 9, uomType: 'etr-concentration', shortString: 'g/l-element', longString: 'g/L of Element' },
  { uomId: 10, uomType: 'etr-concentration', shortString: 'g/l-oxide', longString: 'g/L of Oxide' },
  { uomId: 11, uomType: 'concentration', shortString: 'mol/l', longString: 'mol/L' },
  { uomId: 12, uomType: 'concentration', shortString: 'g/l', longString: 'g/L' },
]

export const ETRS = [
  { materialId: 1, type: 'etr', shortString: 'dysprosium', longString: 'Dysprosium', symbol: 'Dy', defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 200 }] },
  { materialId: 2, type: 'etr', shortString: 'holmium', longString: 'Holmium', symbol: 'Ho', defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 30 }] },
  { materialId: 3, type: 'etr', shortString: 'yttrium', longString: 'Yttrium', symbol: 'Y', defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 50 }] },
  { materialId: 4, type: 'etr', shortString: 'neodymium', longString: 'Neodymium', symbol: 'Nd', defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 80 }] },
  { materialId: 5, type: 'etr', shortString: 'samarium', longString: 'Samarium', symbol: 'Sm', defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 25 }] },
]

export const ACIDS = [
  { materialId: 6, type: 'acid', shortString: 'hcl', longString: 'Hydrochloric Acid', symbol: 'HCl', isDefaultOption: true, defaultProperties: [{ propertyId: 1, uomId: 2, uomType: 'volumetric-price', propertyLongString: 'Price', uomLongString: 'USD/L', description: 'Price', value: 0.75 }] },
  { materialId: 7, type: 'acid', shortString: 'h2so4', longString: 'Sulfuric Acid', symbol: 'H2SO4', isDefaultOption: false, defaultProperties: [{ propertyId: 1, uomId: 2, uomType: 'volumetric-price', propertyLongString: 'Price', uomLongString: 'USD/L', description: 'Price', value: 0.55 }] },
  { materialId: 8, type: 'acid', shortString: 'hno3', longString: 'Nitric Acid', symbol: 'HNO3', isDefaultOption: false, defaultProperties: [{ propertyId: 1, uomId: 2, uomType: 'volumetric-price', propertyLongString: 'Price', uomLongString: 'USD/L', description: 'Price', value: 1.15 }] },
]

export const BASES = [
  { materialId: 9, type: 'base', shortString: 'naoh', longString: 'Sodium Hydroxide', symbol: 'NaOH', isDefaultOption: true, defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 1.25 }] },
  { materialId: 10, type: 'base', shortString: 'nh4oh', longString: 'Ammonium Hydroxide', symbol: 'NH4OH', isDefaultOption: false, defaultProperties: [{ propertyId: 1, uomId: 1, uomType: 'pounderal-price', propertyLongString: 'Price', uomLongString: 'USD/Kg', description: 'Price', value: 2.55 }] },
]

export const EXTRACTANT = [
  { materialId: 11, type: 'extractant', shortString: 'd2ehpa', longString: 'D2EHPA', symbol: 'D2EHPA', isDefaultOption: false, defaultProperties: [{ propertyId: 1, uomId: 2, uomType: 'volumetric-price', propertyLongString: 'Price', uomLongString: 'USD/L', description: 'Price', value: 8.5 }] },
  { materialId: 12, type: 'extractant', shortString: 'p507', longString: 'P507', symbol: 'P507', isDefaultOption: false, defaultProperties: [{ propertyId: 1, uomId: 2, uomType: 'volumetric-price', propertyLongString: 'Price', uomLongString: 'USD/L', description: 'Price', value: 17.85 }] },
]

export const SOLVENT = [
  { materialId: 13, type: 'solvent', shortString: 'isoparaffin', longString: 'Isoparaffin', isDefaultOption: true, defaultProperties: [{ propertyId: 1, uomId: 2, uomType: 'volumetric-price', propertyLongString: 'Price', uomLongString: 'USD/L', description: 'Price', value: 2.10 }] },
]

export const CELLS = [
  { materialId: 14, type: 'cell', shortString: 'mix-settle', longString: 'Mix-Settle Cell', isDefaultOption: true, defaultProperties: [{ propertyId: 1, uomId: 3, uomType: 'unit-price', propertyLongString: 'Price', uomLongString: 'USD/Un.', description: 'Price', value: 550 }] },
]

export const MATERIALS: Material[] = ([] as Material[]).concat.apply([], [ETRS, ACIDS, BASES, EXTRACTANT, SOLVENT, CELLS])
