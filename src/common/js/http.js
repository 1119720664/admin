import axios from 'axios'
import {Message, Loading} from 'element-ui';
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
  console.log(456)
  if (localStorage.eleToken) { //设置统一的请求的header
    config.headers.auth = localStorage.eleToken
  }
  return config
}, error => Promise.reject(error))

/*响应拦截*/
axios.interceptors.response.use(response => {
  endLoading()
  return response
}, error => {
  console.log(456789)
  endLoading();
  Message.error("服务器异常")
  const {msg, code} = error.response
  if (code === 401) {
    Message.error("token失效,请从新登录")
    //清除token
    localStorage.removeItem('eleToken')
    localStorage.removeItem('user')
    /*跳转登录页面*/
    router.push("/login")
  }
  //return Promise.reject(error)
})

export default axios
