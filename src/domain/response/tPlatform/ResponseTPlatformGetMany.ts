import { RequestBase } from '@/models/SharedModel'

/**
 * @param {number} TPlatformID 三方平台識別碼
 * @param {string} TPlatformCode 三方平台代碼
 * @param {boolean} Status 狀態
 * @param {string} TPlatformName 三方平台名稱
 * @param {string} TPlatformLangName 三方平台語系
 * @param {string} TPlatformParameters 三方平台參數
 * @param {string} Description 說明
 * @param {string} Comment 註解
 */
interface IResponseTPlatformGetMany {
  TPlatformID: number
  TPlatformCode: string
  Status: boolean
  TPlatformName: string
  TPlatformLangName: string
  TPlatformParameters: string
  Description: string
  Comment: string
}

class ResponseTPlatformGetMany extends RequestBase
  implements IResponseTPlatformGetMany {
  TPlatformID: number
  TPlatformCode: string
  Status: boolean
  TPlatformName: string
  TPlatformLangName: string
  TPlatformParameters: string
  Description: string
  Comment: string
  constructor(options: ResponseTPlatformGetMany) {
    super()
    this.TPlatformID = options.TPlatformID
    this.TPlatformCode = options.TPlatformCode
    this.Status = options.Status
    this.TPlatformName = options.TPlatformName
    this.TPlatformLangName = options.TPlatformLangName
    this.TPlatformParameters = options.TPlatformParameters
    this.Description = options.Description
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}

export default ResponseTPlatformGetMany
