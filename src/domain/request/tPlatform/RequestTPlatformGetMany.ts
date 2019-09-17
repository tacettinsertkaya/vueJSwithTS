import { RequestBase } from '@/models/SharedModel'
/**
 * @param {string} TPlatformCode 三方平台代碼(空白/NULL:不使用)
 * @param {number} Status 狀態(0:停用 1:啟用)(-1/NULL:不使用)
 * @param {string} TPlatformName 三方平台名稱(空白/NULL:不使用)
 * @param {string} TPlatformParameters 三方平台參數(空白/NULL:不使用)
 * @param {number} PageIndex 第幾頁
 * @param {number} PageSize 每頁幾筆資料
 */
interface IRequestTPlatformGetMany {
  TPlatformCode: string
  Status: number
  TPlatformName: string
  TPlatformParameters: string
  PageIndex: number
  PageSize: number
}
/**
 * 三方平台 - 多筆
 */
class RequestTPlatformGetMany extends RequestBase
  implements IRequestTPlatformGetMany {
  TPlatformCode: string
  Status: number
  TPlatformName: string
  TPlatformParameters: string
  PageIndex: number
  PageSize: number
  constructor(options: RequestTPlatformGetMany) {
    super()
    this.TPlatformCode = options.TPlatformCode
    this.Status = options.Status
    this.TPlatformName = options.TPlatformName
    this.TPlatformParameters = options.TPlatformParameters
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestTPlatformGetMany
