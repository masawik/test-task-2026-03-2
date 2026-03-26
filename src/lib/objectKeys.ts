type StringKeys<T> = Extract<keyof T, string>

export const objectKeys = <T extends object>(obj: T): StringKeys<T>[] => {
  return Object.keys(obj) as StringKeys<T>[]
}
