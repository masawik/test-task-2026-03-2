import { appEnv } from '@/appEnv'
import { getSession, setSessionByTokens } from '@/auth/session'
import { ApiClient } from '@/lib/ApiClient'

import { refreshToken } from './api'

import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const AUTH_PUBLIC_URLS = [ '/auth/login', '/auth/refresh' ]
const isAuthPublicUrl = (url: string) =>
  AUTH_PUBLIC_URLS.some((authPublicUrl) => url.includes(authPublicUrl))

export const backendApiClient = new ApiClient(appEnv.API_URL);
(function setupAuthInterceptors() {
  backendApiClient.client.interceptors.request.use(async (config) => {
    if (!isAuthPublicUrl(config.url || '')) {
      const payload = await getSession()
      if (payload) {
        config.headers.Authorization = `Bearer ${payload.accessToken}`
      }
    }

    return config
  })

  backendApiClient.client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean,
      }
      if (!originalRequest) {
        return Promise.reject(error)
      }

      const status = error.response?.status
      const url = originalRequest.url ?? ''

      if (status !== 401) {
        return Promise.reject(error)
      }

      if (isAuthPublicUrl(url)) {
        return Promise.reject(error)
      }

      if (originalRequest._retry) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const tokens = await getSession()
        if (!tokens) throw error

        const updatedTokens = await refreshToken({
          refreshToken: tokens.refreshToken,
        })
        await setSessionByTokens(updatedTokens)

        return backendApiClient.client(originalRequest)
      } catch {
        return Promise.reject(error)
      }
    },
  )
})()
