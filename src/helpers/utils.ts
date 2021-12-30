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