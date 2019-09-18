import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/login'
import Home from './components/home/home'
import Index from "./components/index/index"
import menu from "./common/js/async-router"
import store from "./store"

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
    },
    /* {
       path: '/',
       name: 'Home',
       component: Home,
         children: [
           {
             path: "",
             component: Index
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
     }*/
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path === "/login") {
    next()
  } else {
    if (isLogin) {
      console.log(store.state.fresh)
      if (localStorage.router && !store.state.fresh) {
        console.log(menu)
        router.options.routes = [...router.options.routes, ...menu]
        console.log(router.options.routes)
        router.addRoutes(router.options.routes)
        console.log(router.options.routes)
        console.log(router)
        store.dispatch("setRouter", menu)
        localStorage.removeItem("router")
        console.log(123)
        next({...to, replace: true})
      } else {
        console.log(456)
        next()
      }
    } else {
      next("/login")
    }
  }
})

export default router
