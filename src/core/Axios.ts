import { AxiosPromise, AxiosRequestConfig } from "../types";
import dispatchRequest from "./dispatchRequest";
import { Method } from "../types";

// Axios类，实现Axios接口定义的公共方法
// 对于get post等方法都是对外提供的语法糖，内部都是通过调用request方法实现发送请求
export default class Axios {
  request(url: any, config?: any): AxiosPromise {

    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 如果url不是字符串类型，则说明我们传入的就是单个参数，且url就是config
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  // 调用request方法，把传入的url和method拼到config里面
  _requestMethodWithoutData(method: Method, url: string,
    config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  // post，put，patch可能需要传入data
  _requestMethodWithData(method: Method, url: string,
    data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}