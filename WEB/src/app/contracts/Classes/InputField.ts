import { FormField, ParamsToForms } from './FormField';

type ParamsToInput = ParamsToForms & { min?: number, max?: number, step?: number };
export class InputField extends FormField {

  min?: number;
  max?: number;
  step?: number;

  constructor(paramsToInput: ParamsToInput = {}) {

    let paramsToForms;
    let min;
    let max;
    let step;
    ({ min, max, step, ...paramsToForms } = paramsToInput);
    super(paramsToForms);
    this.min = min;
    this.max = max;
    this.step = step;

  }
}

