/**
 * @param {string} BankID - 銀行識別碼
 * @param {string} BankCode - 銀行代碼
 * @param {string} BankName - 銀行名稱
 * @param {string} TPlatformID - 三方平台識別碼
 * @param {string} TPlatformCode - 三方平台代碼
 * @param {string} TPlatformName - 三方平台名稱
 * @param {string} ThirdPartyBankCode - 三方支付銀行代碼
 */
interface IResponseTPlatformBankGetMany {
  BankID: string
  BankCode: string
  BankName: string
  TPlatformID: string
  TPlatformCode: string
  TPlatformName: string
  ThirdPartyBankCode: string
}
/**
 * 三方平台銀行 - 多筆
 */
class ResponseTPlatformBankGetMany implements IResponseTPlatformBankGetMany {
  BankID: string
  BankCode: string
  BankName: string
  TPlatformID: string
  TPlatformCode: string
  TPlatformName: string
  ThirdPartyBankCode: string
  constructor(options: ResponseTPlatformBankGetMany) {
    this.BankID = options.BankID
    this.BankCode = options.BankCode
    this.BankName = options.BankName
    this.TPlatformID = options.TPlatformID
    this.TPlatformCode = options.TPlatformCode
    this.TPlatformName = options.TPlatformName
    this.ThirdPartyBankCode = options.ThirdPartyBankCode
  }
}
export default ResponseTPlatformBankGetMany
