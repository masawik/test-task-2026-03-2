export const addMins = (date: Date, mins: number): Date =>
  new Date(date.getTime() + mins * 60_000)

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getTime() + days * 86_400_000)

export const isAfter = (date: Date, dateToCompare: Date): boolean =>
  date.getTime() > dateToCompare.getTime()

export const dateToString = (date: Date) => date.toISOString()
export const stringToDate = (str: string) => new Date(str)
