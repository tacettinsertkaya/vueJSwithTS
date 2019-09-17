/**
 * @param {number} TPlatformID - 三方平台識別碼
 * @param {number} BankID - 銀行識別碼
 * @param {string} ThirdPartyBankCode - 三方支付銀行代碼
 */
interface IResponseTPlatformBankGet {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
}
/**
 * 三方平台銀行 - 單筆
 */
class ResponseTPlatformBankGet implements IResponseTPlatformBankGet {
  TPlatformID: number
  BankID: number
  ThirdPartyBankCode: string
  constructor(options: ResponseTPlatformBankGet) {
    this.TPlatformID = options.TPlatformID
    this.BankID = options.BankID
    this.ThirdPartyBankCode = options.ThirdPartyBankCode
  }
}

export default ResponseTPlatformBankGet
