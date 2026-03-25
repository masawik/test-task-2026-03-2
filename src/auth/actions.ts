'use server'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from 'next/navigation'
import z from 'zod'

import { ApiErrorSchema } from '@/backend'
import { backendApi } from '@/backend/api'
import { isDev } from '@/config/constants'
import { isApiClientError } from '@/lib/ApiClient'

import { LogInFormDataSchema, type LogInFormState } from './schemas'
import { setSessionByTokens } from './session'

const FALLBACK_ERROR_MESSAGE =
  'An unexpected error has occurred. Try again later.'

export const logIn = async (
  _: LogInFormState,
  formData: unknown,
): Promise<LogInFormState | undefined> => {
  const validatedFormData = LogInFormDataSchema.safeParse(formData)

  if (!validatedFormData.success) {
    return { fieldErrors: z.flattenError(validatedFormData.error).fieldErrors }
  }

  try {
    const response = await backendApi.logIn(validatedFormData.data)
    await setSessionByTokens(response)
    redirect('/')
  } catch (e) {
    if (isRedirectError(e)) {
      throw e
    }

    if (isApiClientError(e)) {
      const validatedApiError = ApiErrorSchema.safeParse(e.response?.data)
      if (validatedApiError.success) {
        return validatedApiError.data
      }
    }

    if (isDev) {
      throw e
    }

    return { message: FALLBACK_ERROR_MESSAGE }
  }
}
