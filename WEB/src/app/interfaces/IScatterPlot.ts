import { ISingleElementDataSet } from './IDataSet';

export interface IScatterPlot {
  data: [dataSet: ISingleElementDataSet],
  layout: {
    title: string
  }
}
