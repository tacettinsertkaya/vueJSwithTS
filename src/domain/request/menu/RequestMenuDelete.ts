import RequestBase from '@/models/Shared/RequestBase'

interface IRequestMenuDelete {
  MenuID: number
}

/**
 * 選單-刪除
 */
class RequestMenuDelete extends RequestBase implements IRequestMenuDelete {
  MenuID: number
  /**
   *
   * @param options 選單-刪除-參數
   * {
   * MenuID 選單識別碼(-1:不使用),
   * ExecutorUser 操作者
   * }
   */
  constructor(options: RequestMenuDelete) {
    super()
    this.MenuID = options.MenuID
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestMenuDelete
