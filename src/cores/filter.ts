import moment from 'moment'
import Vue from 'vue'
import { Regex } from 'typescript-dotnet-commonjs/System/Text/RegularExpressions'

const formatDateTime = function(value: string) {
  let regex = new Regex(
    /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][ 26 ])|((16|[2468][048]|[3579][ 26 ])00))-0?2-29))( |T)(20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d(\.\d+)?$/
  )

  if (regex.isMatch(value)) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return value
  }
}

const formatDate = function(value: string) {
  let regex = new Regex(
    /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][ 26 ])|((16|[2468][048]|[3579][ 26 ])00))-0?2-29))( |T)(20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d(\.\d+)?$/
  )

  if (regex.isMatch(value)) {
    return moment(value).format('YYYY-MM-DD')
  } else {
    return value
  }
}
const firstWordToLowerCase = function(value: any) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

const firstWordToUpperCase = function(value: any) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}
const round = function(value: any, num: number) {
  if (value !== null) {
    return value.toFixed(num)
  } else {
    return value
  }
}
const formatTrigger = function(value: number) {
  if (value != null) {
    if (value === 1) {
      return '启用'
    } else if (value === 0) {
      return '停用'
    } else {
      return value
    }
  } else {
    return '未知'
  }
}
// 時間格式 yyyy-MM-dd HH:mm:ss
Vue.filter('formatDateTime', formatDateTime)
// 時間格式 yyyy-MM-dd
Vue.filter('formatDate', formatDate)
// 第一個字母小寫
Vue.filter('firstWordToLowerCase', firstWordToLowerCase)
// 第一個字母大寫
Vue.filter('firstWordToUpperCase', firstWordToUpperCase)
// 四捨五入到第幾位
Vue.filter('round', round)
Vue.filter('formatTrigger', formatTrigger)

export default {
  install(vue: typeof Vue, options: any): void {}
}
