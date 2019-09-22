import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./common/scss/reset.scss"
import "./common/scss/font-awesome.scss"
import "./plugins/element"

Vue.config.productionTip = false
console.log(123,process.env.VUE_APP_BASE_URL)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
