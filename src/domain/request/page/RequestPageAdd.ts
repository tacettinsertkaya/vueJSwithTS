import RequestBase from '@/models/Shared/RequestBase'

interface IRequestPageAdd {
  ParentMenuID: number
  MenuType: number
  MenuKeyword: string
  MenuUrl: string
  MenuName: string
  Description: string
  Sequence: number
  Comment: string
}

// 頁面-新增-Class
class RequestPageAdd extends RequestBase implements IRequestPageAdd {
  ParentMenuID: number
  MenuType: number // 選單類型(1:選單 2:頁面)
  MenuKeyword: string // 選單關鍵字(空白:不使用)
  MenuUrl: string // 選單連結
  MenuName: string // 選單名稱
  Description: string // 選單說明
  Sequence: number // 順序
  Comment: string // 註解
  constructor(options: RequestPageAdd) {
    super()
    this.ParentMenuID = options.ParentMenuID
    this.MenuType = options.MenuType
    this.MenuKeyword = options.MenuKeyword
    this.MenuUrl = options.MenuUrl
    this.MenuName = options.MenuName
    this.Description = options.Description
    this.Sequence = options.Sequence
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestPageAdd
