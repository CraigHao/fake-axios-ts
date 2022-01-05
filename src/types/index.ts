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

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// axios返回的promise对象，继承Promise泛型接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

// Error对外接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 为所有支持请求方法扩展一些接口
// 使用这些方法就不必在config中指定url、method、data这些属性了
// 把Axios改造成混合对象，本身是个方法，又有很多方法属性
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型接口，既有下面定义的函数又有从上面继承的方法
export interface AxiosInstance extends Axios {
  
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 重载，可能传一个参数也可能传两个参数
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}