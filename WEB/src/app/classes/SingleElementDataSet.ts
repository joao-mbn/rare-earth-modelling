export class SingleElementDataSet {

  x!: number[]; // aqueous concentrations
  y!: number[]; // organic concentrations
  name?: string;
  mode?: string;

  public stageConcentrations(equilibriumAqueousConcentrations: number[], equilibriumOrganicConcentrations: number[]): number[][] {

    const stageAqueousConcentrations: number[] = [];
    const stageOrganicConcentrations: number[] = [];

    equilibriumAqueousConcentrations.forEach( (aqueousConcentration, arrayIndex) => {
      stageAqueousConcentrations.push(aqueousConcentration);
      if (arrayIndex !== 0) {
        stageAqueousConcentrations.push(aqueousConcentration);
      }
    });
    equilibriumOrganicConcentrations.forEach( (organicConcentration, arrayIndex, array) => {
      stageOrganicConcentrations.push(organicConcentration);
      if (arrayIndex !== array.length - 1) {
        stageAqueousConcentrations.push(organicConcentration);
      }
    });

    return [stageAqueousConcentrations, stageOrganicConcentrations];

  }

}
