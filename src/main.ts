// font-awesome CSS 引用
import 'font-awesome/scss/font-awesome.scss'
// simple line icon CSS 引用
import 'simple-line-icons/scss/simple-line-icons.scss'
// flag-icon CSS 引用
import 'flag-icon-css/css/flag-icon.min.css'
// bootstrap CSS
import 'bootstrap'
// element UI 的CSS
import 'element-ui/packages/theme-chalk/src/index.scss'
// SCSS 主要挡案
import '@/assets/scss/style.scss'
// vue http 响应 引用
import AxiosCustomHtpp from '@/cores/http'
// 语系 引用
import locale from '@/cores/locale'
// vue 主要
import Vue from 'vue'
// 前端结构套件
import ElementUI from 'element-ui'
// vue 主要进入点
import App from './App.vue'

// vuex 引用
import store from './store'
// 前端输出Build 挡案 serviceWorker
import './registerServiceWorker'
// Vue 勾子函數
import VueCustomDirectives from '@/directives/permission'
// 前端表单验证套件
import '@/cores/validate'
// Jquery套件
import 'jquery/dist/jquery.js'
// 时间转换套件
import 'moment'
// 卡片区块
import CpCard from '@/components/card/Card.vue'
// 分頁元件
import CpPagination from '@/components/pagination/Pagination.vue'
// Table 元件
import SubTable from '@/components/table/Table.vue'
// vue扩充 过滤方法 引用
import VueCustomFilter from '@/cores/filter'
// 擴充prototype
import '@/cores/CustomPrototype'
import VueMixin from '@/cores/mixin'
// vue 路由引用
import router from './router'
Vue.use(AxiosCustomHtpp)
// Vue 勾子函數
Vue.use(VueCustomDirectives)
// vue扩充 过滤方法 引用
Vue.use(VueCustomFilter)
// 前端结构套件
Vue.use(ElementUI)
// Vue Mixin擴充
Vue.use(VueMixin)
// 注册全域元件
Vue.component('CpCard', CpCard)
Vue.component('CpPagination', CpPagination)
Vue.component('SubTable', SubTable)
Vue.config.productionTip = false
document.title =
  document.title +
  (process.env.NODE_ENV !== 'production'
    ? ' (' + process.env.VUE_APP_ENV + ')'
    : '')

export const app = new Vue({
  router,
  store,
  i18n: locale,
  render: h => h(App)
}).$mount('#app')
