interface ProtoOperationalVariable {

  name: string;
  shortString: string
  min: number;
  max: number;
  step: number;

}
export interface OperationalVariable extends ProtoOperationalVariable {

  value: number | number[] | null;

}

export interface SummaryOperationalVariable extends ProtoOperationalVariable {

  value: number[];

}
