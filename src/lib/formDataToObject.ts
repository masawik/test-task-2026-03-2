export const formDataToObject = (
  fd: FormData,
): Record<string, FormDataEntryValue | FormDataEntryValue[]> => {
  const keys = [ ...new Set(fd.keys()) ]
  const out: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {}

  for (const key of keys) {
    const values = fd.getAll(key)
    out[key] = values.length === 1 ? values[0]! : values
  }

  return out
}
