export class OperationalVariable {

  name!: string;
  shortString!: string
  min!: number;
  max!: number;
  step!: number;
  value!: number | number[] | null;

}

export class SummaryOperationalVariable {

  name!: string;
  shortString!: string
  min!: number;
  max!: number;
  step!: number;
  value!: number[];

}
