import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // 学习XMLHttpRequest
    const request = new XMLHttpRequest()

    // 如果在config中设置了responseType，则给request中的responseType赋值
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    // 当请求被发送到服务器时，我们需要执行一些基于响应的任务。
    // 每当 readyState 改变时，就会触发 onreadystatechange 事件。
    // readyState 属性存有 XMLHttpRequest 的状态信息。
    request.onreadystatechange = function handleLoad() {
      // 0: 请求未初始化
      // 1: 服务器连接已建立
      // 2: 请求已接收
      // 3: 请求处理中
      // 4: 请求已完成，且响应已就绪
      if (request.readyState !== 4) {
        return
      }
      // 获取response的所有headers
      const responseHeaders = request.getAllResponseHeaders()
      // 决定responseData从哪个属性里面拿
      const responseData = responseType !== 'text' ? 
        request.response : 
        request.responseText
      
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    // 设置headers
    Object.keys(headers).forEach(name => {
      // 当没有requestbody数据时，content-type是没有意义的
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })

}