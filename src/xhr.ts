import { AxiosRequestConfig } from "./types";

export default function xhr(config: AxiosRequestConfig): void {
  const {data = null, url, method='get'} = config

  // 学习XMLHttpRequest
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}