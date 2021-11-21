import { ETRS, ACIDS, BASES, EXTRACTANT, SOLVENT, CELLS } from './defaultOptions';
export const OPERATIONAL_VARIABLE = {
  name: 'pH', shortString: 'ph', min: 0, max: 2, step: 0.1, value: 0.5
};

export const OPERATIONAL_VARIABLE_RANGE = {
  name: 'pH', shortString: 'ph', min: 0, max: 2, step: 0.1, value: [0.5, 1.5]
};

export const OPERATIONAL_VARIABLES = [
  OPERATIONAL_VARIABLE,
  { name: 'A/O Ratio', shortString: 'aor', min: 0.5, max: 2.5, step: 0.1, value: 1.5 },
  { name: 'Number of Cells', shortString: 'cells-number', min: 2, max: 40, step: 1, value: 20 },
];

export const OPERATIONAL_VARIABLES_RANGES = [
  OPERATIONAL_VARIABLE_RANGE,
  { name: 'A/O Ratio', shortString: 'aor', min: 0.5, max: 2.5, step: 0.1, value: [1.0, 2.0] },
  { name: 'Number of Cells', shortString: 'cells-number', min: 2, max: 40, step: 1, value: [10, 35] },
];

export const MODEL_CONSTANTS = [
  {
    materialId: 1, type: 'etr', shortString: 'dysprosium', longString: 'Dysprosium', symbol: 'Dy', defaultProperties: [
      { propertyId: 4, propertyLongString: 'Model Coefficient', uomId: 0, uomType: 'none', uomLongString: 'Dimensionless', value: 1.111, description: 'a' },
      { propertyId: 4, propertyLongString: 'Model Coefficient', uomId: 0, uomType: 'none', uomLongString: 'Dimensionless', value: 2.222, description: 'b' },
      { propertyId: 2, propertyLongString: 'ETR Concentration', uomId: 10, uomType: 'etr-concentration', uomLongString: 'g/L of Oxide', value: 3.18, description: 'Initial Aqueous Concentration' },
      { propertyId: 2, propertyLongString: 'ETR Concentration', uomId: 10, uomType: 'etr-concentration', uomLongString: 'g/L of Oxide', value: 0, description: 'Initial Organic Concentration' },
    ]
  },
  {
    materialId: 2, type: 'etr', shortString: 'holmium', longString: 'Holmium', symbol: 'Ho', defaultProperties: [
      { propertyId: 4, propertyLongString: 'Model Coefficient', uomId: 0, uomType: 'none', uomLongString: 'Dimensionless', value: 2.111, description: 'a' },
      { propertyId: 4, propertyLongString: 'Model Coefficient', uomId: 0, uomType: 'none', uomLongString: 'Dimensionless', value: 3.222, description: 'b' },
      { propertyId: 2, propertyLongString: 'ETR Concentration', uomId: 10, uomType: 'etr-concentration', uomLongString: 'g/L of Oxide', value: 5.97, description: 'Initial Aqueous Concentration' },
      { propertyId: 2, propertyLongString: 'ETR Concentration', uomId: 10, uomType: 'etr-concentration', uomLongString: 'g/L of Oxide', value: 0, description: 'Initial Organic Concentration' },
    ]
  },
];

export const MATERIALS = [ETRS[0], ETRS[1], ACIDS[0], BASES[1], EXTRACTANT[1], SOLVENT[0], CELLS[0]];

export const PROJECT_CONFIGURATION = {
  operationalVariables: OPERATIONAL_VARIABLES_RANGES,
  modelConstants: MODEL_CONSTANTS,
  economicVariables: MATERIALS,
  applyForms: false
};

export const PROJECT = {
  projectId: 1,
  shortString: 'dyho-p507-26',
  longString: 'Dy/Ho P507 26%',
  projectConfiguration: PROJECT_CONFIGURATION
};

export const PROJECTS = [
  PROJECT,
  { longString: 'Pr/Nd/Sm P507 16%', projectId: 2, shortString: 'prndsm-p507-16', projectConfiguration: PROJECT_CONFIGURATION }
];

export const ISOTHERM = {
  project: PROJECT,
  operationalVariable: OPERATIONAL_VARIABLES
};
