import RequestBase from '@/models/Shared/RequestBase'

interface IRequestPageDelete {
  MenuID: number
}

/**
 * 頁面-刪除
 */
class RequestPageDelete extends RequestBase implements IRequestPageDelete {
  MenuID: number
  /**
   *
   * @param options 頁面-刪除-參數
   * {
   * MenuID 選單識別碼(-1:不使用),
   * ExecutorUser 操作者
   * }
   */
  constructor(options: RequestPageDelete) {
    super()
    this.MenuID = options.MenuID
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestPageDelete
