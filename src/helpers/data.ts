import { isPlainObject } from "./utils";

// 处理请求body的逻辑
// 请求时对data做处理
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}