import { appEnv } from '@/appEnv'
import { getSession } from '@/auth/session'
import { ApiClient } from '@/lib/ApiClient'

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
})()
