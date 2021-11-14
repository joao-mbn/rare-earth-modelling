import { PhysChemProperty } from "./PhysChemProperty";
export class MaterialType {

  type!: string;
  isEditable!: boolean;
  isMandatory!: boolean;
  hasDefaultValue!: boolean;
  physChemProperties?: PhysChemProperty[]

}
