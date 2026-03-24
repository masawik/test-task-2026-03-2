type ClassDictionary = Record<string, unknown>
type ClassArray = ClassValue[]

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined

function toString(value: unknown): string {
  if (value == null || value === false) {
    return ''
  }
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint'
  ) {
    return String(value)
  }
  if (Array.isArray(value)) {
    let out = ''
    for (const item of value) {
      const part = toString(item)
      if (part) {
        out += out ? ` ${part}` : part
      }
    }
    return out
  }
  if (typeof value === 'object') {
    let out = ''
    for (const key of Object.keys(value as ClassDictionary)) {
      if ((value as ClassDictionary)[key]) {
        out += out ? ` ${key}` : key
      }
    }
    return out
  }
  return ''
}

export function cn(...inputs: ClassValue[]): string {
  let out = ''
  for (const input of inputs) {
    const part = toString(input)
    if (part) {
      out += out ? ` ${part}` : part
    }
  }
  return out
}
