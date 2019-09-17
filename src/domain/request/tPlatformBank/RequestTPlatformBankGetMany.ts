import { RequestBase } from '@/models/SharedModel'
/**
 * @param {number} TPlatformID - 三方平台識別碼
 * @param {number} BankID - 銀行識別碼
 * @param {string} ThirdPartyBankCode - 三方支付銀行代碼
 * @param {number} PageIndex - 第幾頁
 * @param {number} PageSize - 每頁幾筆資料
 */
interface IRequestTPlatformBankGetMany {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
  PageIndex: number
  PageSize: number
}
/**
 * 三方平台銀行 - 多筆
 */
class RequestTPlatformBankGetMany extends RequestBase
  implements IRequestTPlatformBankGetMany {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
  PageIndex: number
  PageSize: number
  constructor(options: RequestTPlatformBankGetMany) {
    super()
    this.TPlatformID = options.TPlatformID
    this.BankID = options.BankID
    this.ThirdPartyBankCode = options.ThirdPartyBankCode
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestTPlatformBankGetMany
