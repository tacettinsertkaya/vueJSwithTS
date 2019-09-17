import List from '@/models/Shared/List'
import IFields from '@/interface/IFields'

class TPlatformFields {
  fields: List<IFields>
  constructor() {
    this.fields = new List<IFields>()
    this.fields.add({
      name: 'TPlatformID',
      locale: '三方平台識別碼',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'TPlatformCode',
      locale: '三方平台代碼',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'Status',
      locale: '狀態',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'TPlatformName',
      locale: '三方平台名稱',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'TPlatformLangName',
      locale: '三方平台語系',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'TPlatformParameters',
      locale: '三方平台參數',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'Description',
      locale: '說明',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'Comment',
      locale: '註解',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
  }
  getFields() {
    return this.fields.ToArray()
  }
}
export default TPlatformFields
