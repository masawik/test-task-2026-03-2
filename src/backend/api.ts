import { appEnv } from '@/appEnv'

import { backendApiClient } from './backendApiClient'
import { publicApiClient } from './publicApiClient'

import type {
  LogInRequestDataDTO,
  LogInResponseDTO,
  ProductDTO,
  ProductsResponse,
  RefreshRequestDTO,
  RefreshResponseDTO,
  RequestItemsOptions,
  UserDTO,
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

export const getProducts = async <
  Select extends keyof ProductDTO = keyof ProductDTO,
>(
  params?: RequestItemsOptions<Select>,
) => {
  const response = await publicApiClient.get<ProductsResponse<Select>>(
    '/products',
    { params },
  )
  return response.data
}

export const getMe = async () => {
  const response = await backendApiClient.get<UserDTO>('/auth/me')
  return response.data
}

export const backendApi = {
  logIn,
  refreshToken,
  getProducts,
  getMe,
}
