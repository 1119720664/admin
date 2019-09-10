import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/login'
import Home from './components/home/home'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path === "/login") {
    next()
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
