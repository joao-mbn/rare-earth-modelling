import { PhysChemProperty } from "./PhysChemProperty";

export class Material {

  name!: string;
  symbol?: string;
  shortString!: string;
  isDefault?: boolean;
  price!: number;
  type?: string;
  physChemProperties?: PhysChemProperty[]

}
