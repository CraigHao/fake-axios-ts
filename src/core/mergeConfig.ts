import { isPlainObject, deepClone } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";

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

const strats = Object.create(null)

const stratKeysFromConfig2 = ['url', 'params', 'data']
stratKeysFromConfig2.forEach(key => {
  strats[key] = fromConfig2Strat
})

const stratsKeysDeepMerge = ['headers']
stratsKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

// 默认合并策略：优先取config2
function defaultStrat(config1: any, config2: any): any {
  return typeof config2 !== 'undefined' ? config2 : config1
}

// 只取config2策略
function fromConfig2Strat(config1: any, config2: any): any {
  if (typeof config2 !== 'undefined') {
    return config2
  }
}

function deepMergeStrat(config1: any, config2: any): any {
  if (isPlainObject(config2)) {
    return deepClone(config1, config2)
  } else if (typeof config2 !== 'undefined') {
    return config2
  } else if (isPlainObject(config1)) {
    return deepClone(config1)
  } else if (typeof config1 !== 'undefined') {
    return config1
  }
}


