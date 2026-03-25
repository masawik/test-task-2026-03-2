import z from 'zod'

export const stringToDate = z.string().transform((s) => new Date(s))
