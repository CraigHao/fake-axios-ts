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

const stratKeysFromConfig2 = ['url', 'param', 'data']
stratKeysFromConfig2.forEach(key => {
  strats[key] = fromConfig2Strat
})

// 默认合并策略：优先取config2
function defaultStrat(config1: any, config2: any) {
  return typeof config2 !== 'undefined' ? config2 : config1
}

// 只取config2策略
function fromConfig2Strat(config1: any, config2: any) {
  if (config2 !== 'undefined') {
    return config2
  }
}