import { OptionToDropdown } from '../Interfaces/OptionToDropdown';
import { FormField } from "./FormField";

export class DropdownField extends FormField {

  options!: OptionToDropdown[];

  constructor(params: {
    options?: OptionToDropdown[],
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
    let options;
    ({ options, ...paramsToForms } = params);
    super(paramsToForms);
    this.options = options || [];
  }

}
