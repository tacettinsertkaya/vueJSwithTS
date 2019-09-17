import { RequestBase } from '@/models/SharedModel'

/**
 * @param {number} TPlatformID - 三方平台識別碼
 * @param {number} BankID - 銀行識別碼
 * @param {string} ThirdPartyBankCode - 三方支付銀行代碼
 */
interface IRequestTPlatformBankEdit {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
}
/**
 * 三方平台銀行 - 編輯
 */
class RequestTPlatformBankEdit extends RequestBase
  implements IRequestTPlatformBankEdit {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
  constructor(options: RequestTPlatformBankEdit) {
    super()
    this.TPlatformID = options.TPlatformID
    this.BankID = options.BankID
    this.ThirdPartyBankCode = options.ThirdPartyBankCode
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestTPlatformBankEdit
