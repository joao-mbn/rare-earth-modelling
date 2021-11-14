import { MaterialType } from './MaterialType';
import { ElementProperties } from './ElementProperties';
import { Material } from './Material';
import { SummaryOperationalVariable } from './OperationalVariable';

export class Summary {

  operationalVariables!: SummaryOperationalVariable[];
  modelConstants!: ElementProperties[];
  economicVariables!: Material[];
  materialTypes!: MaterialType[];
  applyForms!: boolean;

}
