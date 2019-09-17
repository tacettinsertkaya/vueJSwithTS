import { RequestBase, List } from '@/models/SharedModel'

interface IUCTLangName {
  LangCode: string
  LangValue: string
}
/**
 * @param {number} TPlatformID 三方平台識別碼
 * @param {string} TPlatformCode 三方平台代碼
 * @param {number} Status 狀態(0:停用 1:啟用)
 * @param {string} TPlatformName 三方平台名稱
 * @param {List<IUCTLangName>} TPlatformLangNameDate 三方平台語系名稱
 * @param {string} TPlatformParameters 三方平台參數
 * @param {string} Description 說明
 * @param {string} Comment 註解
 */
interface IRequestTPlatformEdit {
  TPlatformID: number
  TPlatformCode: string
  Status: number
  TPlatformName: string
  TPlatformLangNameDate: List<IUCTLangName>
  TPlatformParameters: string
  Description: string
  Comment: string
}
/**
 * 三方平台 - 新增、編輯 一筆
 */
class RequestTPlatformEdit extends RequestBase
  implements IRequestTPlatformEdit {
  TPlatformID: number
  TPlatformCode: string
  Status: number
  TPlatformName: string
  TPlatformLangNameDate: List<IUCTLangName>
  TPlatformParameters: string
  Description: string
  Comment: string
  constructor(options: RequestTPlatformEdit) {
    super()
    this.TPlatformID = options.TPlatformID
    this.TPlatformCode = options.TPlatformCode
    this.Status = options.Status
    this.TPlatformName = options.TPlatformName
    this.TPlatformLangNameDate = options.TPlatformLangNameDate
    this.TPlatformParameters = options.TPlatformParameters
    this.Description = options.Description
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestTPlatformEdit
