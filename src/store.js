import Vue from 'vue'
import Vuex from 'vuex'
import qs from "qs"

Vue.use(Vuex)

const types = {
  SET_USER: "SET_USER",
  SET_ISAUTH: "SET_ISAUTH"
}

export default new Vuex.Store({
  state: {
    user: {},
    isAuth: false
  },
  mutations: {
    [types.SET_USER](state, user) {
      console.log("user存储成功")
      state.user = user
    },
    [types.SET_ISAUTH](state, isAuth) {
      state.isAuth = isAuth
    }
  },
  actions: {
    setUser({commit, dispatch, state}, user) {
      commit(types.SET_USER, user)
    },
    setAuth({commit, dispatch, state}, isAuth) {
      commit(types.SET_ISAUTH, isAuth)
    }
  },
  getters: {
    user: state => state.user,
    isAuth: state => state.isAuth
  }
})
