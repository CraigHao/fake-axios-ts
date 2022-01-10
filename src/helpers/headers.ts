import { Method } from "../types";
import { isPlainObject, deepClone } from "./utils";

// 处理请求中配置headers的情况
export function processHeaders(headers: any, data: any): any {
  normalizedHeaderName(headers, 'Content-Type')

  // 如果data是普通对象
  if (isPlainObject(data)) {
    // 传入了headers且没有配置headers的contenttype
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// headers规范化，其中normalizedName为传入的规范化的名称
// eg：把headers传入的小写的content-type转成Content-Type
function normalizedHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // 对传入的headers的key进行遍历
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 把得到的headers字符串转化成对象
export function parseHeaders(headers: string): any {

  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    // 根据冒号前后进行解构赋值
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepClone(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options',
    'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}