import { ElementProperties } from './ElementProperties';
import { Material } from './Material';
import { SummaryOperationalVariable } from './OperationalVariable';

export interface ProjectConfiguration {

  operationalVariables: SummaryOperationalVariable[];
  modelConstants: ElementProperties[];
  economicVariables: Material[];
  applyForms?: boolean;

}
