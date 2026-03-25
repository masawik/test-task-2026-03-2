import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

export const isApiClientError = axios.isAxiosError

export class ApiClient {
  public client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL: baseURL })
  }

  post<Data, Response>(url: string, data?: Data, config?: AxiosRequestConfig) {
    return this.client.post<Response, AxiosResponse<Response>, Data>(
      url,
      data,
      config,
    )
  }

  get<Response>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<Response, AxiosResponse<Response>>(url, config)
  }
}

export type ApiClientInstance = InstanceType<typeof ApiClient>
