import { isPlainObject } from "./utils";

// 处理请求body的逻辑
// 请求时对data做处理
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 把返回的字符串类型的data转换为JSON对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch(e) {
      // DO NOTHING
    }
  }
  return data
}