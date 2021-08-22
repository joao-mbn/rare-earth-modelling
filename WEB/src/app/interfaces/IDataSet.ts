export interface ISingleElementDataSet {
  x: number[],
  y: number[],
  mode: string,
  name: string,
};

export interface IAllElementsDataSets {
  [name: string]: ISingleElementDataSet
};
