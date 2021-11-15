export class SimulationTableDto {
  // TODO remove from dto, put isotherm prefix
  [elementSymbol: string]: {
    name?: string,
    symbol?: string,
    aqueousEquilibriumConcentration?: number[],
    organicEquilibriumConcentration?: number[],
    D?: number[],
    beta?: number[],
    pH?: number[],
    'H+'?: number[]
  };

}
