import RequestBase from '@/models/Shared/RequestBase'

interface IRequestPageGetMany {
  ParentMenuID: number
  MenuType: number
  MenuKeyword: string
  PageIndex: number
  PageSize: number
}

/**
 * 頁面-多筆
 */
class RequestPageGetMany extends RequestBase implements IRequestPageGetMany {
  ParentMenuID: number
  MenuType: number
  MenuKeyword: string
  PageSize: number
  PageIndex: number
  /**
   *
   * @param options 頁面-多筆-參數
   * {
   * ParentMenuID 父選單識別碼(-1:不使用),
   * MenuType 選單類型(-1:不使用 1:選單 2:頁面),
   * MenuKeyword 選單關鍵字(空白:不使用),
   * PageIndex 第幾頁,
   * PageSize 每頁幾筆資料,
   * ExecutorUser 操作者
   * }
   */
  constructor(options: RequestPageGetMany) {
    super()
    this.ParentMenuID = options.ParentMenuID
    this.MenuType = options.MenuType
    this.MenuKeyword = options.MenuKeyword
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestPageGetMany
