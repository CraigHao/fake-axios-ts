import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 在发送xhr请求之前对config做处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

// 加工url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios