import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from "../../router"

let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: "rgba(0, 0, 0, 0.7)"
  })
}

function endLoading() {
  loading.close()
}


axios.interceptors.request.use(config => {
  startLoading()
  if (localStorage.eleToken) { //设置统一的请求的header
    config.headers.auth = localStorage.eleToken
  }
  return config
}, error => Promise.reject(error))

/*响应拦截*/
axios.interceptors.response.use(response => {
  endLoading()
  const {data} = response
  if (data.code === 401) {
    Message.error("token失效,请从新登录")
    //清除token
    localStorage.removeItem('eleToken')
    localStorage.removeItem('user')
    /*跳转登录页面*/
    router.push("/login")
  }
  return response
}, error => {
  console.log(error)
  endLoading();
  Message.error("服务器异常,需要重新登录")
  localStorage.removeItem('eleToken')
  localStorage.removeItem('user')
  router.push("/login")
  return Promise.reject(error)
})

export default axios
