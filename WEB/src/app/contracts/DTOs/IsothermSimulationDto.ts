import { SimulationTableDto } from './SimulationTableDto';
import { SingleElementDto } from "./SingleElementDto";

export class IsothermSimulationDto {

  simulationChartDto!: { [elementSymbol: string]: SingleElementDto };
  simulationTableDto!: SimulationTableDto;

}
