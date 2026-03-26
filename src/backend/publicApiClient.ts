import { appEnv } from '@/appEnv'
import { ApiClient } from '@/lib/ApiClient'

export const publicApiClient = new ApiClient(appEnv.API_URL)
