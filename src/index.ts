import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 在发送xhr请求之前对config做处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 需要先处理headers，再处理data
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 加工url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 加工请求的data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig): any {
  // headers是可选属性，如果没有配置，则默认给headers赋一个空值
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios