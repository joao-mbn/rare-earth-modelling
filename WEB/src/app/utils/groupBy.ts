export function groupBy<ObjectType>(objectsArray: Array<ObjectType>, property: string): { [property: string]: Array<ObjectType> } {

  return objectsArray.reduce((acc: { [property: string]: Array<ObjectType> }, obj: ObjectType) => {
    let key = obj[property as keyof ObjectType] as unknown as string;
    if (!acc[key]) { acc[key] = [] };
    acc[key].push(obj);
    return acc;
  }, {})

}
