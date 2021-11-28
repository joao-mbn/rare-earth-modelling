import { OptionToDropdown } from '../Interfaces/OptionToDropdown';
import { FormField, ParamsToForms } from "./FormField";

type ParamsToDropdown = ParamsToForms & { options?: OptionToDropdown[], multiple?: boolean };
export class DropdownField extends FormField {

  options!: OptionToDropdown[];
  multiple?: boolean;

  constructor(params: ParamsToDropdown = {}) {
    let paramsToForms;
    let options;
    let multiple;
    ({ options, multiple, ...paramsToForms } = params);
    super(paramsToForms);
    this.options = options || [];
    this.multiple = multiple || false;
  }

}
