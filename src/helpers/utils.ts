const toString = Object.prototype.toString

// 工具函数
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  // 普通对象的判断
  return toString.call(val) === '[object Object]'
}
// extend的最终目的是把from里的属性都扩展到to中，包括原型上的属性
// 需使用交叉类型T&U，并且用到了类型断言
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ; (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepClone(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 判断result[key]是否已经存在
          if (isPlainObject(result[key])) {
            result[key] = deepClone(result[key], val)
          }
          result[key] = deepClone(val)
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}