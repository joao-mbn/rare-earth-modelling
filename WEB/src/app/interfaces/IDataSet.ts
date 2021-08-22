export interface ISingleElementDataSet {
  labels: number[],
  datasets: [{
    label: string,
    data: number[],
  }]
};

export interface IAllElementsDataSets {
  [name: string]: ISingleElementDataSet
};
