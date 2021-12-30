import { isDate, isObject } from "./utils"

// 编码规则
function encode(val: string): String {
  // encodeURIComponent可把字符串作为 URI 组件进行编码
  // 同时把特殊字符再转化回来
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

// url拼接函数
export function buildURL(url: string, params?: any): string {

  // 如果不传url
  if (!params) {
    return url
  }

  // 用来拼接url
  const parts: string[] = []

  // 拿到params的每个key
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 判断类型是否为空或undefined
    if (val === null || typeof val === 'undefined') {
      return
    }

    // 判断val是否为数组，如果是数组则赋值给临时的变量values
    // 不是数组则统一转成数组的格式
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 把parts用&拼接起来
  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 检查url是否有hash标识
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 检查url是否有问号
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}