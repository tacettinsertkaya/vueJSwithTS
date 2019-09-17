import List from '@/models/Shared/List'
import IFields from '@/interface/IFields'

class TPlatformBankFields {
  fields: List<IFields>
  constructor() {
    this.fields = new List<IFields>()
    this.fields.add({
      name: 'BankID',
      locale: '銀行識別碼',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'BankCode',
      locale: '銀行代碼',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'BankName',
      locale: '銀行名稱',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
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
      name: 'TPlatformName',
      locale: '三方平台名稱',
      show: true,
      permission: '',
      customField: false,
      memo: ''
    })
    this.fields.add({
      name: 'ThirdPartyBankCode',
      locale: '三方支付銀行代碼',
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
export default TPlatformBankFields
