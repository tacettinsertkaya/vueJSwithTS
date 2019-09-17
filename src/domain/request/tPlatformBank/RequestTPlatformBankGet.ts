import { RequestBase } from '@/models/SharedModel'
/**
 * @param {number} TPlatformID - 三方平台識別碼
 * @param {number} BankID - 銀行識別碼
 * @param {string} ThirdPartyBankCode - 三方支付銀行代碼
 */
interface IRequestTPlatformBankGet {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
}

class RequestTPlatformBankGet extends RequestBase
  implements IRequestTPlatformBankGet {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
  constructor(options: RequestTPlatformBankGet) {
    super()
    this.TPlatformID = options.TPlatformID
    this.BankID = options.BankID
    this.ThirdPartyBankCode = options.ThirdPartyBankCode
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestTPlatformBankGet
