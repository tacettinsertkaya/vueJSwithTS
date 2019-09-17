import RequestBase from '@/models/Shared/RequestBase'

interface IRequestRoleGetMany {
  Status: number
  PageIndex: number
  PageSize: number
}

/**
 * 角色-單筆
 */
class RequestRoleGetMany extends RequestBase implements IRequestRoleGetMany {
  Status: number
  PageIndex: number
  PageSize: number
  /**
   *
   * @param options 角色-單筆-參數
   * {
   * Status 狀態 (-1:全部 0:停用 1:啟用),
   * PageIndex 第幾頁,
   * PageSize 每頁幾筆資料,
   * ExecutorUser 操作者
   * }
   */
  constructor(options: RequestRoleGetMany) {
    super()
    this.Status = options.Status
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestRoleGetMany
