import { AxiosTransformer } from "../types";

// fns为转化函数，可能有可能没有
export default function transform(data: any, headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]) {

  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  // 链式调用每一个转化函数fn
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}