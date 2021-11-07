import { MaterialType } from './MaterialType';
import { ElementProperties } from './ElementProperties';
import { Material } from './Material';
import { OperationalVariables } from './OperationalVariables';

export class Summary {

  operationalVariablesArray!: OperationalVariables[];
  modelConstants!: ElementProperties[];
  economicVariables!: Material[];
  materialTypes!: MaterialType[];
  applyForms!: boolean;

}
