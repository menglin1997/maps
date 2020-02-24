import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
service.defaults.withCredentials = true
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // Toast({
    //   mes: '成功',
    //   icon: 'success',
    //   timeout: 500
    // })

    if (response.data.ReturnCode === 200) {
      return response.data.Data
    } else {
      alert(response.data.ErrorMessage)
      return null
    }
  },
  error => {
    // Toast({
    //   mes: error.response.data.ErrorMessage,
    //   icon: 'error',
    //   timeout: 2000
    // })
    return Promise.reject(error)
  }
)

export default service
