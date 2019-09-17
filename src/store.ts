import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import WebUserService from '@/service/user'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: any): any => ({
    loading: state.loading,
    locale: state.locale,
    accessToken: state.accessToken,
    menu: state.menu,
    permission: state.permission,
    identity: state.identity
  }) // 持久化
  // filter: (mutation) => mutation.type !== types.SET_TRANSLATE // 排除持久化事件
})
const types = {
  SET_LOADING: 'SET_LOADING',
  SET_LOCALE: 'SET_LOCALE',
  SET_TRANSLATE: 'SET_TRANSLATE',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_MENU: 'SET_MENU',
  SET_IDENTITY: 'SET_IDENTITY',
  SET_PERMISSION: 'SET_PERMISSION'
}
export default new Vuex.Store({
  state: {
    loading: false,
    locale: 'zh-CN',
    translate: {},
    accessToken: '',
    menu: [],
    permission: [],
    identity: null
  },
  mutations: {
    [types.SET_LOADING](state, data) {
      // 設定 loading
      state.loading = data
    },
    [types.SET_LOCALE](state, data) {
      // 設定 locale
      state.locale = data
    },
    [types.SET_TRANSLATE](state, data) {
      // 設定 translate
      state.translate = data
    },
    [types.SET_ACCESS_TOKEN](state, data) {
      // 設定 accessToken
      state.accessToken = data
    },
    [types.SET_MENU](state, data) {
      // 設定側邊選單
      state.menu = data
    },
    [types.SET_PERMISSION](state, data) {
      // 設定權限
      state.permission = data
    },
    [types.SET_IDENTITY](state, data) {
      state.identity = data
    }
  },
  actions: {
    setAccessToken({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_ACCESS_TOKEN, data) // 存到 store
        resolve()
      })
    },
    setLoading({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_LOADING, data) // 存到 store
        resolve()
      })
    },
    setLocale({ commit }, data) {
      return new Promise((resolve, reject) => {
        // locale.set(data) // 存到 localstoreage
        commit(types.SET_LOCALE, data) // 存到 store
        resolve()
      })
    },
    setTranslate({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_TRANSLATE, data) // 存到 store
        resolve()
      })
    },
    setMenu({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_MENU, data) // 存到 store
        resolve()
      })
    },
    clearToken({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.SET_ACCESS_TOKEN, '')
        resolve()
      })
    },
    logout({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_ACCESS_TOKEN, '')
        resolve()
        // WebUserService.logoutAsync().then((response: any) => {
        //    commit(types.SET_ACCESS_TOKEN, '')
        //    resolve(response)
        // })
      })
    },
    setPermission({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_PERMISSION, data) // 存到 store
        resolve()
      })
    },
    setIdentity({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_IDENTITY, data) // 存到 store
        resolve()
      })
    }
  },
  plugins: [vuexLocal.plugin], // 使用插件不用自己建 storage
  getters: {
    loading: state => state.loading,
    locale: state => state.locale,
    translate: state => state.translate,
    accessToken: state => state.accessToken,
    menu: state => state.menu,
    identity: state => state.identity,
    permission: state => state.permission
  }
})
