import z from 'zod'

import type { ApiError } from '@/backend'

const STRING_MIN_LENGTH = 3
const minTrimmedString = (min: number, message: string) =>
  z.string().trim().min(min, { message })

export const LogInFormDataSchema = z.object({
  username: minTrimmedString(
    STRING_MIN_LENGTH,
    `Username cannot be shorter than ${STRING_MIN_LENGTH} characters`,
  ),
  password: minTrimmedString(
    STRING_MIN_LENGTH,
    `Password cannot be shorter than ${STRING_MIN_LENGTH} characters`,
  ),
})
export type LogInFormData = z.infer<typeof LogInFormDataSchema>

export type LogInFormDataError = {
  fieldErrors: z.core.$ZodFlattenedError<LogInFormData>['fieldErrors'],
}

export type LogInFormState = LogInFormDataError | ApiError | undefined
