import RequestBase from '@/models/Shared/RequestBase'

interface IRequestPageGet {
  MenuID: number
  MenuKeyword: string
}
/**
 * 頁面-單筆
 */
class RequestPageGet extends RequestBase implements IRequestPageGet {
  MenuID: number
  MenuKeyword: string
  /**
   *
   * @param options 頁面-單筆-參數 <br/>
   * { <br/>
   * MenuID 選單識別碼(-1:不使用), <br/>
   * MenuKeyword 選單關鍵字(空白:不使用), <br/>
   * ExecutorUser 操作者 <br/>
   * }
   */
  constructor(options: RequestPageGet) {
    super()
    this.MenuID = options.MenuID
    this.MenuKeyword = options.MenuKeyword
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestPageGet
