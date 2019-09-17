import Vue, { DirectiveOptions } from 'vue'
import store from '@/store'
const directive: DirectiveOptions = {
  bind: function(el: any, binding, vnode) {
    el.permission = store.getters['permission']
    let exp = binding.value.toString()
    do {
      let index = exp.indexOf("'")
      if (index >= 0) {
        exp = exp.replace("'", '')
      } else {
        break
      }
    } while (true)
    if (!el.permission) {
      return
    }
    let r = el.permission.FindBy((ele: any) => {
      return ele.KeyWord === exp
    })
    if (r.length === 0) {
      el.style = 'display:none'
      var oriName = el.className
      oriName += ' custom-hide'
      el.className = oriName
    }
  },
  inserted: function(el, binding, vnode) {},
  update: function(el: any, binding, vnode) {
    el.permission = store.getters['permission']
    let exp = binding.value.toString()
    do {
      let index = exp.indexOf("'")
      if (index >= 0) {
        exp = exp.replace("'", '')
      } else {
        break
      }
    } while (true)
    if (!el.permission) {
      return
    }
    let r = el.permission.FindBy((ele: any) => {
      return ele.KeyWord === exp
    })
    if (r.length === 0) {
      el.style = 'display:none'
      var oriName = el.className
      oriName += ' custom-hide'
      el.className = oriName
    }
  }
}
Vue.directive('permission', directive)

export default {
  install(vue: typeof Vue, options: any): void {}
}
