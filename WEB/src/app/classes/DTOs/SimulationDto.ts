import { SimulationTableDto } from './SimulationTableDto';
import { SingleElementDto } from "./SingleElementDto";

export class SimulationDto {

  simulationChartDto!: { [elementSymbol: string]: SingleElementDto };
  simulationTableDto!: SimulationTableDto;

}
