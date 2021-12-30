import { isPlainObject } from "./utils";

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
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}