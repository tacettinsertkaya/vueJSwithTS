import Vue, { PluginObject } from 'vue'
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { app } from '@/main.ts'
import utils from '@/cores/utils'

axios.defaults.timeout = 600000
axios.defaults.baseURL = process.env.VUE_APP_MGT_API
// http request 攔截器
axios.interceptors.request.use(
  config => {
    // console.log(`bearer ${store.getters["manager/accessToken"]}`)
    // console.log(config)
    // 如果有 token 則帶入 header
    if (store.getters['accessToken']) {
      config.headers.Authorization = `bearer ${store.getters['accessToken']}`
      // console.log('run signature')
      config.headers['signature'] = new utils().md5(
        (JSON.stringify(config.data) === undefined
          ? ''
          : JSON.stringify(config.data)) + process.env.VUE_APP_MD5_HASH
      )

      // config.headers['body'] = JSON.stringify(config.data) === undefined ? '' : JSON.stringify(config.data)
    } else {
      // console.log(config)
    }

    // 太久没动作
    return config
  },
  error => {
    // 印出錯誤訊息
    //  console.log('global request', error)
    // console.log(error)
    return Promise.reject(error.response)
  }
)
// http response 攔截器
axios.interceptors.response.use(
  response => {
    const responseCode = response.status
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        console.log('超时了')
        Message.error('请求超时，请检查网络是否连接正常')
      } else {
        // 可以展示断网组件
        console.log('断网了')
        Message.error('请求失败，请检查网络是否已连接')
      }
      return
    }
    // 印出錯誤訊息
    console.log('global response', error)

    // 對不同狀態進行處理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (location.pathname !== '/login') {
            // this.$message.error({
            //   dangerouslyUseHTMLString: true,
            //   message: this.$store.getters['locale'] === 'zh-CN' ?
            //     '您没有页面浏览权限 请重新登入获取正确权限' : 'You do not have page view permission, please login again to get the correct permissions.'
            // })
            // 可能 token 失效所以進行清除
            store.dispatch('logout')
            // 導到登入畫面，使用 replace 不留 history
            location.replace('/login')
          }
          break
        case 400:
          if (location.pathname !== '/login') {
            // 可能 token 失效所以進行清除
            store.dispatch('logout')
            // 導到登入畫面，使用 replace 不留 history
            location.replace('/login')
          }
          break
        case 403:
          if (location.pathname !== '/login') {
            // 可能 token 失效所以進行清除
            store.dispatch('logout')
            // 導到登入畫面，使用 replace 不留 history
            location.replace('/login')
          }
          break
        case 404:
          if (location.pathname !== '/login') {
            // this.$message.error({
            //   dangerouslyUseHTMLString: true,
            //   message: this.$store.getters['locale'] === 'zh-CN' ?
            //     '找不到此页面' : 'This page could not be found'
            // })
            // 可能 token 失效所以進行清除
            store.dispatch('logout')
            // 導到登入畫面，使用 replace 不留 history
            location.replace('/login')
          }
          break
        case 500:
          if (location.pathname !== '/login') {
            // this.$message.error({
            //   dangerouslyUseHTMLString: true,
            //   message: this.$store.getters['locale'] === 'zh-CN' ?
            //     'Opps' : 'Opps'
            // })
            // 可能 token 失效所以進行清除
            store.dispatch('logout')
            // 導到登入畫面，使用 replace 不留 history
            location.replace('/login')
          }
          break
        default:
          Message.error({
            message: `${app.$i18n.t('Message.Fail')}`
          })
      }
    } else {
      Message.error({
        message: `${app.$i18n.t('Message.Fail')}`
      })
    }

    // return Promise.reject(error.response)
    // 統一處理回傳錯誤就不需另外寫 catch
    return Promise.resolve(error.response)
  }
)
export default {
  install(vue: typeof Vue, options: any): void {}
}
