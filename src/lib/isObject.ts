export const isObject = (value: unknown): value is object => {
  if (!value) return false
  return Object.getPrototypeOf(value) === Object.prototype
}
