import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helpers/utils'
import defaults from './defaults'

// 工厂函数创建Axios混合对象的实例
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 创建instance指向Axios.prototype.request方法，并把this绑定为context
  const instance = Axios.prototype.request.bind(context)
  // 把Axios实例context的原型方法和实例方法全部拷贝到instance上
  // 此时的instance本身是一个函数（request），又拥有了Axios类的原型属性和实例属性
  extend(instance, context)
  // 类型断言为AxiosInstance
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios