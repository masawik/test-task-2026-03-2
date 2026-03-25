import { appEnv } from '@/appEnv'

import { backendApiClient } from './backendApiClient'

import type {
  LogInRequestDataDTO,
  LogInResponseDTO,
  RefreshRequestDTO,
  RefreshResponseDTO,
} from './schemas'

export const logIn = async (creds: LogInRequestDataDTO) => {
  const response = await backendApiClient.post<
    LogInRequestDataDTO,
    LogInResponseDTO
  >('/auth/login', {
    expiresInMins: appEnv.DUMMY_TOKEN_EXPIRES_IN_MINS,
    ...creds,
  })

  return response.data
}

export const refreshToken = async (data: RefreshRequestDTO) => {
  const response = await backendApiClient.post<
    RefreshRequestDTO,
    RefreshResponseDTO
  >('/auth/refresh', {
    expiresInMins: appEnv.DUMMY_TOKEN_EXPIRES_IN_MINS,
    ...data,
  })

  return response.data
}

export const backendApi = {
  logIn,
  refreshToken,
}
