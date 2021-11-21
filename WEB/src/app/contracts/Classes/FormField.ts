export class FormField {

  formsId?: number;
  key?: string;
  isMandatory?: boolean;
  isEditable?: boolean;
  value?: string | number | number[];
  label?: string;
  placeHolder?: string | number;
  hidden?: boolean;

  constructor(params: {
    formsId?: number,
    key?: string,
    label?: string,
    isMandatory?: boolean,
    isEditable?: boolean,
    value?: string | number | number[],
    placeHolder?: string | number,
    hidden?: boolean
  } = {}) {

    this.formsId = params.formsId || 0;
    this.key = params.key || '';
    this.label = params.label || '';
    this.isMandatory = params.isMandatory || false;
    this.isEditable = params.isEditable || true;
    this.value = params.value || '';
    this.placeHolder = params.placeHolder || '';
    this.hidden = params.hidden || false;

  }

}
