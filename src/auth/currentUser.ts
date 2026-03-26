import { cache } from 'react'

import { backendApi } from '@/backend/api'
import { isApiClientError } from '@/lib/ApiClient'

import { getSession } from './session'

export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) return null

  try {
    const userData = await backendApi.getMe()
    return userData
  } catch (e) {
    if (isApiClientError(e)) {
      if (e.response?.status === 401) {
        return null
      }
    }

    throw e
  }
})
