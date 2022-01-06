import { ResolvedFn, RejectedFn } from "../types"

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  // 数组，用于储存拦截器
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }
  // 将拦截器添加到interceptors数组中，返回一个id用于删除
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    // id
    return this.interceptors.length - 1
  }

  // 对interceptor做遍历，如果不为null，则对此interceptor执行传入的fn操作
  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if(interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    // 删除时不能改变数组长度，不然interceptor的位置会混乱
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}