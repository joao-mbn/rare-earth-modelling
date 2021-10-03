export function hasKey<O>(object: O, key: PropertyKey): key is keyof O {
  return key in object
}
