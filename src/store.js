import Vue from 'vue'
import Vuex from 'vuex'
import qs from "qs"
import axios from "./common/js/http"

Vue.use(Vuex)

const types = {
  SET_USER: "SET_USER",
  SET_ISAUTH: "SET_ISAUTH",
  SET_ROUTER: "SET_ROUTER",
  SET_FRESH: "SET_FRESH"
}

export default new Vuex.Store({
  state: {
    user: {},
    isAuth: false,
    router: [],
    fresh: false   /*页面刷新时进行判断*/
  },
  mutations: {
    [types.SET_USER](state, user) {
      console.log("user存储成功")
      state.user = user
    },
    [types.SET_ISAUTH](state, isAuth) {
      state.isAuth = isAuth
    },
    [types.SET_ROUTER](state, router) {
      state.router = router
    },
    [types.SET_FRESH](state, fresh) {
      state.fresh = fresh
    }
  },
  actions: {
    setUser({commit, dispatch, state}, user) {
      commit(types.SET_USER, user)
    },
    setAuth({commit, dispatch, state}, isAuth) {
      commit(types.SET_ISAUTH, isAuth)
    },
    setRouter({commit, dispatch, state}, router) {
      commit(types.SET_ROUTER, router)
    },
    setFresh({commit, dispatch, state}, fresh) {
      commit(types.SET_FRESH, fresh)
    }
  },
  getters: {
    user: state => state.user,
    isAuth: state => state.isAuth,
    router: state => state.router,
    fresh: state => state.fresh
  }
})
