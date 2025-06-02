import axios, { AxiosRequestConfig } from 'axios'
import { handleUrl } from './encryptUrl'

// 自定义判断元素类型JS
function toType(obj: any): string {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)![1]
    .toLowerCase()
}
// 参数过滤函数
function filterNull(o: any) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(
  method: string,
  url: string,
  params: null | string | object,
  success: any,
  failure: any,
  unEncrypt: boolean = false // 是否不加密
) {
  let contentTypeIsJson = false
  if (params && typeof params != 'string') {
    params = filterNull(params)
  } else contentTypeIsJson = true

  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    withCredentials: true,
    crossDomain: true,
    unEncrypt,
    transformRequest: [
      function (data) {
        if (contentTypeIsJson) return data
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      },
    ],
    headers: {
      'Content-Type': contentTypeIsJson
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
    },
  } as AxiosRequestConfig<any>)
    .then(function (res) {
      let response = res.data
      if (response.status == 200) {
        if (success) {
          success(response)
        }
      } else {
        if (failure) {
          failure(response)
        } else {
          if (response.data == 2) {
             //错误处理
            setTimeout(() => {
              location.reload()
            }, 1000)
          } else {
            //错误处理
          }
        }
      }
    })
    .catch(function (err) {
      let res = err.response
      console.error(res || err)
      if (res) {
        // 清楚所有的错误提示 
        clearTimeout(timeObj)
        if (res.data.msg) {
           //错误处理
        } else {
           //错误处理
        }
        return
      }
    })
}


let requestCount = 0
let timeObj: NodeJS.Timeout
// http request 拦截器
axios.interceptors.request.use(async(config) => {
  requestCount++
  if (requestCount == 1) {
    timeObj = setTimeout(() => {
      //加载中提示
    }, 800)
  }

  if (
    config.data &&
    Object.prototype.toString.call(config.data) == '[object FormData]'
  ) {
    config.headers!!['Content-Type'] = 'multipart/form-data;charset=utf-8'
    config.transformRequest = [
      function (data) {
        return data
      },
    ]
  }
  // 拦截配置，有新的配置，在这里新增函数处理，然后合并config
  let _config = await handleUrl(config)
  config = Object.assign(config, _config)
  return config
})

// http response 拦截器
axios.interceptors.response.use((response) => {
  requestCount--
  if (requestCount === 0) {
    setTimeout(() => {
      // 关闭所有提示
    }, 1500)
    clearTimeout(timeObj)
  }
  return response
},error =>{
  	let xhrErrL = { type: "XHRERR", data: error.response };
		if (error.response) {
			const { status, data } = error.response;
			if (status === 422) {
        alert(data)
			}
		}
})


// 返回在vue模板中的调用接口
export default {
  get: function (
    url: string,
    params: string | object | null,
    success: any,
    failure: any
  ) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  // 不加密的post请求
  unEncryptPost: function (
    url: string,
    params: string | object,
    success: any,
    failure: any,
  ) {
    return apiAxios('POST', url, params, success, failure,true)
  }
}