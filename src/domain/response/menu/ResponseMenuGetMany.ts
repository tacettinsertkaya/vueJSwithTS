import ResponseBase from '@/models/Shared/ResponseBase'

// 選單-多筆-Class
class ResponseMenuGetMany extends ResponseBase {
  MenuID: number // 選單識別碼
  ParentMenuID: number // 父選單識別碼
  MenuLevel: string // 選單層級
  ParentMenuLevel: number // 父選單層級
  MenuType: number // 選單類型
  MenuKeyword: string // 選單關鍵字
  MenuUrl: string // 選單連結
  MenuName: string // 選單名稱
  Description: string // 選單說明
  Sequence: number // 順序
  Comment: string // 註解
  constructor(options: ResponseMenuGetMany) {
    super()
    this.MenuID = options.MenuID
    this.ParentMenuID = options.ParentMenuID
    this.MenuLevel = options.MenuLevel
    this.ParentMenuLevel = options.ParentMenuLevel
    this.MenuType = options.MenuType
    this.MenuKeyword = options.MenuKeyword
    this.MenuUrl = options.MenuUrl
    this.MenuName = options.MenuName
    this.Description = options.Description
    this.Sequence = options.Sequence
    this.Comment = options.Comment
    this.RowNum = options.RowNum
    this.CreateDateTime = options.CreateDateTime
    this.CreateUser = options.CreateUser
    this.UpdateDateTime = options.UpdateDateTime
    this.UpdateUser = options.UpdateUser
  }
}
export default ResponseMenuGetMany
