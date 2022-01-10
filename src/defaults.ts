import { AxiosRequestConfig } from "./types";

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  // 对于以上类型的请求，不需要添加默认header
  defaults.headers[method] = {}
})

const methodWithData = ['post', 'push', 'patch']

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-type': 'application/json'
  }
})

export default defaults