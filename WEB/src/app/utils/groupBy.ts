type ObjectType = { [property: string]: any };
type groupedByObject = { [property: string]: Array<ObjectType> };

export function groupBy(objectsArray: Array<ObjectType>, property: string): groupedByObject {

  return objectsArray.reduce((acc: groupedByObject, object) => {
    let key = object[property];
    if (!acc[key]) { acc[key] = [] };
    acc[key].push(object);
    return acc;
  }, {})

}
