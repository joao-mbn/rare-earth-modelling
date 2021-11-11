export const CONCENTRATION_UOM_LIST = ['mol/L Oxide', 'g/L Oxide', 'mol/L Element', 'g/L Element'];

export const OPERATIONAL_VARIABLE = {
  name: 'pH', shortString: 'ph', min: 0, max: 2, step: 0.1, value: 0.5
};

export const OPERATIONAL_VARIABLE_RANGE = {
  name: 'pH', shortString: 'ph', min: 0, max: 2, step: 0.1, value: [0.5, 1.5]
};

export const OPERATIONAL_VARIABLES = [
  OPERATIONAL_VARIABLE,
  { name: 'A/O Ratio', shortString: 'aor', min: 0.5, max: 2.5, step: 0.1, value: 1.5 },
  { name: 'Number of Cells', shortString: 'cellsNumber', min: 2, max: 40, step: 1, value: 20 },
];

export const OPERATIONAL_VARIABLES_RANGES = [
  OPERATIONAL_VARIABLE_RANGE,
  { name: 'A/O Ratio', shortString: 'aor', min: 0.5, max: 2.5, step: 0.1, value: [1.0, 2.0] },
  { name: 'Number of Cells', shortString: 'cellsNumber', min: 2, max: 40, step: 1, value: [10, 35] },
];

export const ELEMENT_PROPERTIES = {
  name: 'Dysprosium', symbol: 'Dy', shortString: 'dysprosium', a: 1.111, b: 2.222, initialAqueousConcentration: 3.18, initialOrganicConcentration: 0
};

export const MODEL_CONSTANTS = [
  ELEMENT_PROPERTIES,
  { name: 'Dysprosium', symbol: 'Dy', shortString: 'dysprosium', a: 1.111, b: 2.222, initialAqueousConcentration: 3.18, initialOrganicConcentration: 0 },
  { name: 'Holmium', symbol: 'Ho', shortString: 'holmium', a: 2.111, b: 3.222, initialAqueousConcentration: 6.00, initialOrganicConcentration: 0 }
];

export const PHYSCHEM_PROPERTY = {
  name: 'Density', shortString: 'density', value: 1.17, uomShortString: 'gram-per-cubic-centimeter', uomLongString: 'g/cm3'
};

export const PHYSQUEM_PROPERTIES = [
  PHYSCHEM_PROPERTY,
  { name: 'Concentration', shortString: 'concentration', value: 11.87, uomShortString: 'mol-per-liter', uomLongString: 'mol/L' },
  { name: 'Purity', shortString: 'purity', value: 37, uomShortString: 'percent', uomLongString: '%' }
];

export const MATERIAL = {
  name: 'Hydrochloric Acid',
  shortString: 'hydrochloric-acid',
  symbol: 'HCl',
  isDefault: true,
  price: 8.99,
  type: 'acid',
  physChemProperties: PHYSQUEM_PROPERTIES
};

export const MATERIALS = [
  MATERIAL,
  { name: 'Sodium Hydroxide', shortString: 'sodium-hydroxide', symbol: 'NaOH', isDefault: true, price: 8.99, type: 'base', physChemProperties: PHYSQUEM_PROPERTIES },
  { name: 'D2EHPA', shortString: 'd2ehpa', isDefault: false, price: 16, type: 'extractant', physChemProperties: PHYSQUEM_PROPERTIES }
];

export const MATERIAL_TYPE = {
  type: 'extractant',
  isEditable: true,
  isMandatory: false,
  hasDefaultValue: false
};

export const MATERIAL_TYPES = [
  MATERIAL_TYPE,
  { type: 'acid', isEditable: true, isMandatory: false, hasDefaultValue: true },
  { type: 'rare-earth', isEditable: true, isMandatory: true, hasDefaultValue: false }
];

export const SUMMARY = {
  operationalVariables: OPERATIONAL_VARIABLES_RANGES,
  modelConstants: MODEL_CONSTANTS,
  economicVariables: MATERIALS,
  materialTypes: MATERIAL_TYPES,
  applyForms: false
  //false when displaying, true when editing
};

export const PROJECT_CONFIGURATIONS = {
  name: 'Dy/Ho P507 26%',
  id: 1,
  shortString: 'dyho-p507-26',
  summary: SUMMARY
};

export const PROJECTS_CONFIGURATIONS = [
  PROJECT_CONFIGURATIONS,
  { name: 'Pr/Nd/Sm P507 16%', id: 2, shortString: 'prndsm-p507-16', summary: SUMMARY }
];

export const ISOTHERM_CONFIGURATION = {
  project: PROJECT_CONFIGURATIONS,
  operationalVariable: OPERATIONAL_VARIABLES
};
