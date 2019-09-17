import ResponseBase from '@/models/Shared/ResponseBase'

interface IResponseMenuAPIGetMany {
  MenuAPIOperational: number
  MenuID: number
  MenuAPIKeyword: string
  MenuAPIUrl: string
  MenuAPIName: string
}
/**
 * 選單API - 多筆
 */
class ResponseMenuAPIGetMany extends ResponseBase
  implements IResponseMenuAPIGetMany {
  MenuAPIOperational: number
  MenuID: number
  MenuAPIKeyword: string
  MenuAPIUrl: string
  MenuAPIName: string
  /**
   *
   * @param options 選單API - 多筆
   * {
   * MenuAPIOperational 選單API操作
   * MenuID 選單識別碼
   * MenuAPIKeyword 選單API關鍵字
   * MenuAPIUrl 選單API網址
   * MenuAPIName 選單API名稱
   * }
   */
  constructor(options: ResponseMenuAPIGetMany) {
    super()
    this.MenuAPIOperational = options.MenuAPIOperational
    this.MenuID = options.MenuID
    this.MenuAPIKeyword = options.MenuAPIKeyword
    this.MenuAPIUrl = options.MenuAPIUrl
    this.MenuAPIName = options.MenuAPIName
    this.RowNum = options.RowNum
    this.CreateDateTime = options.CreateDateTime
    this.CreateUser = options.CreateUser
    this.UpdateDateTime = options.UpdateDateTime
    this.UpdateUser = options.UpdateUser
  }
}

export default ResponseMenuAPIGetMany
