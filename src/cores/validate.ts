import Vue from 'vue'
import enValidate from 'vee-validate/dist/locale/en'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'
import zhCNValidate from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
Vue.use(VeeValidate, {
  inject: false,
  delay: 1,
  fieldsBagName: 'fieldBags', // 因為有衝突所以改名字
  locale: 'zh_TW',
  classes: true, // 使用命名空間
  dictionary: {
    en: enValidate,
    zh_TW: zhTWValidate,
    zh_CN: zhCNValidate
  },
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    // valid: 'is-valid', // model is valid // 非必填會顯示驗證成功綠框
    invalid: 'is-invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  }
})
// 下拉選單
Validator.extend('select', {
  messages: {},
  validate(value: any, args: any) {
    return new RegExp('^[^' + args + ']$').test(value)
  }
})
