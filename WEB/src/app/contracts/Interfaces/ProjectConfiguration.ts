import { ElementProperties } from './ElementProperties';
import { Material } from './Material';
import { ProjectOperationalVariable } from './OperationalVariable';

export interface ProjectConfiguration {

  operationalVariables: ProjectOperationalVariable[];
  modelConstants: ElementProperties[];
  economicVariables: Material[];
  applyForms?: boolean;

}
