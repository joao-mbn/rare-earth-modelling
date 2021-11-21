import { FormField } from './FormField';

export class InputField extends FormField {

  min?: number;
  max?: number;
  step?: number;

  constructor(params: {
    min?: number,
    max?: number,
    step?: number,
    key?: string,
    formsId?: number,
    label?: string,
    isMandatory?: boolean,
    isEditable?: boolean,
    value?: string | number | number[],
    placeHolder?: string | number,
    hidden?: boolean,
  } = {}) {

    let paramsToForms;
    let min;
    let max;
    let step;
    ({ min, max, step, ...paramsToForms } = params);
    super(paramsToForms);
    this.min = min;
    this.max = max;
    this.step = step;

  }
}
