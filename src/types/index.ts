// 所有的公共类型定义文件
// 到处给外面的应用进行使用

export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'post' | 'POST'
  | 'options' | 'OPTIONS'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// axios返回的promise对象，继承Promise泛型接口
export interface AxiosPromise extends Promise<AxiosResponse> {

}

// Error对外接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// 混合类型接口，既有下面定义的函数又有从上面继承的方法
export interface AxiosInstance extends Axios {
  // 接口本身是个函数
  (config: AxiosRequestConfig): AxiosPromise
}