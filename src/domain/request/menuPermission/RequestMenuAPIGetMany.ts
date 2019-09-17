import RequestBase from '@/models/Shared/RequestBase'

interface IRequestMenuAPIGetMany {
  MenuID: number
  PageIndex: number
  PageSize: number
}
/**
 * 選單API - 多筆
 */
class RequestMenuAPIGetMany extends RequestBase
  implements IRequestMenuAPIGetMany {
  MenuID: number
  PageIndex: number
  PageSize: number
  /**
   *
   * @param options 選單API - 多筆
   * {
   * MenuID 選單編號(-1:不使用)
   * PageIndex 第幾頁
   * PageSize 每頁幾筆資料
   * }
   */
  constructor(options: RequestMenuAPIGetMany) {
    super()
    this.MenuID = options.MenuID
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestMenuAPIGetMany
