import axios from '../../src/index'

/**
 * url参数测试用例
 */
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })
// -------------------------------

/**
 * 请求body测试用例
 */
// axios({
//   method: 'POST',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'POST',
//   url: '/base/buffer',
//   data: arr
// })
// -------------------------------

/**
 * headers测试用例
 */
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'content-type': 'application/json'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })
// --------------------------------

/**
 * response测试用例
 */
axios({
  method: 'POST',
  url: '/base/post',
  data: {
    a: 11,
    b: 22
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'POST',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 11,
    b: 22
  }
}).then(res => {
  console.log(res)
})