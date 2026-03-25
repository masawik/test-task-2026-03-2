import z from 'zod'

import type { ApiError } from '@/backend'

const STRING_MIN_LENGTH = 3
const requiredString = z.string().trim().min(STRING_MIN_LENGTH)

export const LogInFormDataSchema = z.object({
  username: requiredString,
  password: requiredString,
})
export type LogInFormData = z.infer<typeof LogInFormDataSchema>

export type LogInFormDataError = {
  fieldErrors: z.core.$ZodFlattenedError<LogInFormData>['fieldErrors'],
}

export type LogInFormState = LogInFormDataError | ApiError | undefined
