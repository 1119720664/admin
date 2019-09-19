import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/login/login'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('./components/home/home'),
      children: [
        {
          path: "",
          component: () => import('./components/index/index'),
        },
        {
          path: "/system/menu",
          name: "SystemMenu",
          component: () => import('./views/system-menu/system-menu'),
        },
        {
          path: "/system/role",
          name: "SystemRole",
          component: () => import('./views/system-role/system-role'),
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path === "/login") {
    next()
  } else {
    if (isLogin) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router
