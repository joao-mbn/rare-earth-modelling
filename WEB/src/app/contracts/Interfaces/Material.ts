export interface Material {

  materialId: number;
  type: string;
  shortString: string;
  longString: string;
  symbol?: string;
  isDefaultOption?: boolean;
  defaultProperties: DefaultProperties[];

}

interface DefaultProperties {

  uomId: number;
  propertyId: number;
  propertyLongString: string;
  uomLongString: string;
  value: number;
  description: string;

}
