import { isPlainObject, deepClone } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";

const strats = Object.create(null)

// 默认合并策略：优先取config2
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取config2策略
function fromConfig2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepClone(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepClone(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromConfig2 = ['url', 'params', 'data']
stratKeysFromConfig2.forEach(key => {
  strats[key] = fromConfig2Strat
})

const stratKeysDeepMerge = ['headers','auth']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})


export default function mergeConfig(config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  // 定义合并结果
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  // config合并策略
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}



