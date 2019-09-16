import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/login'
import Home from './components/home/home'
import Index from "./components/index/index"
import Member from "./components/member/member"

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
      component: Home,
      children: [
        {
          path: "",
          component: Index
        },
        {
          path: "/person/member",
          name: "Member",
          component: Member
        },
      ]
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
