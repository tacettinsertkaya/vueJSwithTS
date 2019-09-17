import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import { Validator } from 'vee-validate'
import TranslateService from '@/service/translate'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    en: {},
    'zh-TW': {},
    'zh-CN': {}
  },
  silentTranslationWarn: true // 不要出現語系警告
})

// 設定語系資料
const asyncTranslate = async () => {
  if (
    store.getters['translate'] === undefined ||
    store.getters['translate'] === null ||
    store.getters['translate'] === {} ||
    store.getters['translate']['en-US'] === undefined
  ) {
    await TranslateService.getAll().then((response: any) => {
      store.dispatch('setTranslate', response.data.Data)
    })
  }
  i18n.setLocaleMessage('en', store.getters['translate']['en-US'])
  i18n.setLocaleMessage('zh-TW', store.getters['translate']['zh-TW'])
  i18n.setLocaleMessage('zh-CN', store.getters['translate']['zh-CN'])
  // 驗證器語系
  Validator.localize({
    en: {
      attributes: store.getters['translate']['en-US']
    },
    zh_TW: {
      attributes: store.getters['translate']['zh-TW']
    },
    zh_CN: {
      attributes: store.getters['translate']['zh-CN']
    }
  })
}

asyncTranslate()

export default i18n
