export interface IElementExtractionData {
  name: string,
  symbol: string,
  aqueousConcentrations: number[],
  organicConcentrations: number[],
}

export interface IElementsExtractionData {
  [element: string]: IElementExtractionData
}
