export interface ParamsToForms {
  key?: string,
  formsId?: number,
  label?: string,
  isMandatory?: boolean,
  isDisabled?: boolean,
  value?: string | number | number[],
  placeholder?: string,
  hidden?: boolean,
  hint?: string,
}
export class FormField {

  formsId: number;
  key: string;
  isMandatory: boolean;
  isDisabled: boolean;
  value: string | number | number[];
  label: string;
  placeholder: string;
  hidden: boolean;
  hint: string;

  constructor(params: ParamsToForms = {}) {

    this.formsId = params.formsId || 0;
    this.key = params.key || '';
    this.label = params.label || '';
    this.isMandatory = params.isMandatory || false;
    this.isDisabled = params.isDisabled || false;
    this.value = params.value || '';
    this.placeholder = params.placeholder || '';
    this.hidden = params.hidden || false;
    this.hint = params.hint || '';

  }

}
