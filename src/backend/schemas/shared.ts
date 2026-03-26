import z from 'zod'

import type { Override } from '@/lib/typeUtils'

export const ApiErrorSchema = z.object({
  message: z.string(),
})
export type ApiError = z.infer<typeof ApiErrorSchema>

export const SelectOptionSchema = z.object({
  select: z.string().optional(),
})
export type SelectOption = z.infer<typeof SelectOptionSchema>

export const PaginationOptionsSchema = z.object({
  limit: z.number().optional(),
  skip: z.number().optional(),
})
export type PaginationOptions = z.infer<typeof PaginationOptionsSchema>

export const RequestItemsOptionsDTOSchema = SelectOptionSchema.and(
  PaginationOptionsSchema,
)
export type RequestItemsOptionsDTO = z.infer<
  typeof RequestItemsOptionsDTOSchema
>
export type RequestItemsOptions<Select extends string = string> = Override<
  RequestItemsOptionsDTO,
  {
    select?: Select[],
  }
>

export const ResponseItemsOptionsSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})
export type ResponseItemsOptions = z.infer<typeof ResponseItemsOptionsSchema>
