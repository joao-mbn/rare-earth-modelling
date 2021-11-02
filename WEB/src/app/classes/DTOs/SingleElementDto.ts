export class SingleElementDto {
  // TODO remove from dto, put isotherm prefix
  name!: string;
  symbol!: string;
  aqueousEquilibriumConcentrations!: number[];
  organicEquilibriumConcentrations!: number[];
  aqueousOperatingConcentrations!: number[];
  organicOperatingConcentrations!: number[];
  aqueousStageConcentrations!: number[];
  organicStageConcentrations!: number[];

}
