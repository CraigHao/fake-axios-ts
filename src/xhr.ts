import { AxiosRequestConfig } from "./types";

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  // 学习XMLHttpRequest
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  // 设置headers
  Object.keys(headers).forEach(name => {
    //当没有requestbody数据时，content-type是没有意义的
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}