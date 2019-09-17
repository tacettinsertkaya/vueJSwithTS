interface Math {
  [key: string]: any // Add index signature
}
interface Array<T> {
  FindBy: any
  FindByArray: any
  remove: any
  removeRepeat: any
}
interface String {
  toDecimal: any
  toDecimal2: any
  getAns: any
  getCustomAnsLastTwo: any
  getAnsLastTwo: any
}
interface Date {
  Format: any
}
Array.prototype.FindBy = function(this: any, filter: any) {
  let arr: any = []
  this.forEach((ele: any) => {
    if (filter(ele)) {
      arr.push(ele)
    }
  })
  return arr
}

Array.prototype.FindByArray = function(this: any, filter: any) {
  let arr: any = []
  let i = 0
  this.forEach((ele: any) => {
    if (filter(ele)) {
      arr[i] = ele
      i++
    }
  })
  return arr
}
// 移除某元素
Array.prototype.remove = function(this: any, val: any) {
  let index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}
// 移除重复
Array.prototype.removeRepeat = function(this: any) {
  let newArr = []
  if (this.length > 0) {
    newArr = this.filter(
      (el: any, i: number, arr: any) => arr.indexOf(el) === i
    )
  }
  return newArr
}
// 保留兩位小數
// 功能：將浮點數四捨五入，取小數點後2位
String.prototype.toDecimal = function(this: any) {
  let x = this
  let f = parseFloat(x)
  if (isNaN(f)) {
    return
  }
  f = Math.round(x * 100) / 100
  return f
}
// 保留2位小数，如：2，会在2后面补上00.即2.00
String.prototype.toDecimal2 = function(this: any) {
  let x = this
  let f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(x * 100) / 100
  let s = f.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}
// 金钱格式化 没有保留小数后两位
String.prototype.getAns = function(this: any) {
  let val = this
  let pattern = /(?=((?!\b)\d{3})+$)/g
  return val.replace(pattern, ',')
}
// 金钱格式化 客制化决定要保留几位小数点 测试中不要使用
String.prototype.getCustomAnsLastTwo = function(this: any, n: number) {
  // 参数说明：
  // s：要格式化的数字
  // n：保留几位小数
  let s = this
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s
    .split('.')[0]
    .split('')
    .reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 != l.length ? ',' : '')
  }
  return (
    t
      .split('')
      .reverse()
      .join('') +
    '.' +
    r
  )
}
// 参数说明：
// number：要格式化的数字
// decimals：保留几位小数
// decpoint：小数点符号
// thousandssep：千分位符号
// roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入

String.prototype.getAnsLastTwo = function(this: any) {
  let number = this
  let decimals = 2
  let decpoint = '.'
  let thousandssep = ','
  let roundtag = 'floor'

  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'ceil' // "ceil","floor","round"
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep = typeof thousandssep === 'undefined' ? ',' : thousandssep
  let dec = typeof decpoint === 'undefined' ? '.' : decpoint
  let s: any = ''
  let toFixedFix = function(n: any, prec: any) {
    let k = Math.pow(10, prec)
    console.log()

    return (
      '' +
      parseFloat(
        Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
      ) /
        k
    )
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}
Date.prototype.Format = function(fmt: any) {
  // author: meizz
  let o: any = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
