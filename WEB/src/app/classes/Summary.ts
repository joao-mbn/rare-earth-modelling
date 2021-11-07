import { MaterialType } from './MaterialType';
import { ElementProperties } from './ElementProperties';
import { Material } from './Material';
import { OperationalVariable } from './OperationalVariable';

export class Summary {

  operationalVariables!: OperationalVariable[];
  modelConstants!: ElementProperties[];
  economicVariables!: Material[];
  materialTypes!: MaterialType[];
  applyForms!: boolean;

}
