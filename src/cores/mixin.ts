import Vue from 'vue'
import moment from 'moment'

let loading: any
const setloading = function(this: any, value: any) {
  let option = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }
  if (value === true) {
    loading = this.$loading(option)
  } else {
    if (loading !== undefined && loading !== null) {
      setTimeout(function() {
        loading.close()
      }, 50)
    }
  }
}
const getNowDate = function(this: any) {
  var today = new Date()
  var nowDate = moment(today).format('YYYY-MM-DD HH:mm:ss')
  return nowDate + '  ' + this.getChDate(today.getDay())
}
const getChDate = function(this: any, value: any) {
  var arr = ['一', '二', '三', '四', '五', '六', '日']
  return '周' + arr[value - 1]
}
/**
 * 共用訊息
 * @param {object} options 訊息參數
 */
const messageHelper = function(this: any, options: any) {
  let params = {
    type: 'info',
    message: '',
    dangerouslyUseHTMLString: false,
    duration: 1000,
    onClose: null
  }

  params = Object.assign(params, options)

  this.$message(params)
}
/**
 * 共用的 Ajax Response，用來做一般呼叫 Ajax 後反應的動作用
 * @param {object} response Ajax 回應
 * @param {object} options 其他參數
 */
const sharedResponse = function(this: any, response: any, options: any) {
  let params = {
    useBack: false,
    useSuccessMessage: true,
    useErrorMessage: true,
    duration: 1000,
    callback: () => {},
    useErrorCodeMsg: false
  }

  params = Object.assign(params, options)
  if (!response.data.Success) {
    if (params.useErrorMessage) {
      if (params.useErrorCodeMsg) {
        if (response.data.Code.indexOf('B') > -1) {
          this.messageHelper({
            type: 'error',
            message: `${this.$i18n.t('BackEnd.' + response.data.Code)}`,
            duration: params.duration
          })
        } else {
          this.messageHelper({
            type: 'error',
            message: `${this.$i18n.t('Message.' + response.data.Code)}`,
            duration: params.duration
          })
        }
      } else {
        this.messageHelper({
          type: 'error',
          message: `${this.$i18n.t('Message.' + response.data.Message)}(${
            response.data.Code
          })`,
          duration: params.duration
        })
      }
    }
    this.setloading(false)
    return
  }

  if (params.useSuccessMessage) {
    if (params.useErrorCodeMsg) {
      this.messageHelper({
        type: 'success',
        message: this.$i18n.t('Message.' + response.data.Code),
        onClose: () => {
          this.setloading(false)
          if (params.callback) {
            params.callback()
          }
          if (params.useBack) {
            this.$router.go(-1)
          }
        },
        duration: params.duration
      })
    } else {
      this.messageHelper({
        type: 'success',
        message: this.$i18n.t('Message.Success'),
        onClose: () => {
          this.setloading(false)
          if (params.callback) {
            params.callback()
          }
          if (params.useBack) {
            this.$router.go(-1)
          }
        },
        duration: params.duration
      })
    }
  } else {
    setTimeout(() => {
      this.setloading(false)
      if (params.callback) {
        params.callback()
      }
      if (params.useBack) {
        this.$router.go(-1)
      }
    }, params.duration)
  }
}
const hasPermission = function(this: any, privatePermission: string) {
  if (Object.is(privatePermission, '')) {
    return true
  }
  var permission = this.$store.getters['permission']
  let r = permission.FindBy((ele: any) => {
    return ele.MenuKeyword === privatePermission
  })

  if (r.length === 0) {
    return false
  }

  return true
}
/**
 *
 * @param {string} localLang 當前語系
 * @param {string} jsonStr Json字串 Object [{LangCode:'',LangValue:''}]
 */
const LanguageRecon = function(localLang, jsonStr) {
  switch (localLang) {
    case 'en':
      return jsonStr.find(e => {
        return Object.is(e.LangCode, 'en')
      }).LangValue
    case 'zh-CN':
      return jsonStr.find(e => {
        return Object.is(e.LangCode, 'zh-CN')
      }).LangValue
    case 'zh-TW':
      return jsonStr.find(e => {
        return Object.is(e.LangCode, 'zh-TW')
      }).LangValue
  }
}
Vue.mixin({
  data() {
    return {
      firstLoad: true, // 判斷是否第一次讀
      overlay: false // 是否顯示遮罩
    }
  },
  methods: {
    setloading,
    getNowDate,
    getChDate,
    messageHelper,
    sharedResponse,
    hasPermission,
    LanguageRecon
  }
})
export default {
  install(vue: typeof Vue, options: any): void {}
}
