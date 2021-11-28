import { DropdownField } from "../Classes/DropdownField";
import { InputField } from "../Classes/InputField";

export interface ProjectForms {

  project: InputField,
  etrOptions: DropdownField,
  modelConstants: {
    etr: InputField,
    modelConstantPropertyToForms: {
      constant: InputField,
      constantUom: DropdownField
    }[]
  }[],
  operationalVariables: {
    variableName: InputField,
    sliderRange: InputField,
    step: InputField
  }[],
  economicVariables: {
    materialType: InputField,
    material: DropdownField,
    price: InputField,
    priceUom: DropdownField
  }[]

}
