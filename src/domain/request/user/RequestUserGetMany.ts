import RequestBase from '@/models/Shared/RequestBase'

interface IRequestUserGetMany {
  ParentAccount: string
  Account: string
  RoleID: number
  Status: number
  Name: string
  Approve: number
  Authenticator: number
  DateTimeType: number
  DateTimeStart: any
  DateTimeEnd: any
  PageIndex: number
  PageSize: number
}
/**
 * 使用者-多筆
 */
class RequestUserGetMany extends RequestBase implements IRequestUserGetMany {
  ParentAccount: string
  Account: string
  RoleID: number
  Status: number
  Name: string
  Approve: number
  Authenticator: number
  DateTimeType: number
  DateTimeStart: any
  DateTimeEnd: any
  PageIndex: number
  PageSize: number
  /**
   *
   * @param options 使用者-多筆
   * {
   * ParentAccount 父使用者帳號(空白/NULL:不使用)
   * Account 使用者帳號(空白/NULL:不使用)
   * RoleID 角色識別碼(-1:不使用)
   * Status 狀態(-1:不使用 0:停用 1:啟用)
   * Name 使用者名稱(空白/NULL:不使用)
   * Approve 認證狀態(-1:不使用 0:未認證 1:已認證)
   * Authenticator 驗證器(-1:不使用 1:顯示 QR Code)
   * DateTimeType 時間類型(1:CreateDateTime 2:UpdateDateTime 預設:UpdateDateTime)
   * DateTimeStart 開始時間(NULL:不使用)
   * DateTimeEnd 結束時間(NULL:不使用)
   * PageIndex 第幾頁
   * PageSize 每頁幾筆資料
   * ExecutorUser 操作者
   * }
   */
  constructor(options: RequestUserGetMany) {
    super()
    this.ParentAccount = options.ParentAccount
    this.Account = options.Account
    this.RoleID = options.RoleID
    this.Status = options.Status
    this.Name = options.Name
    this.Approve = options.Approve
    this.Authenticator = options.Authenticator
    this.DateTimeType = options.DateTimeType
    this.DateTimeStart = options.DateTimeStart
    this.DateTimeEnd = options.DateTimeEnd
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestUserGetMany
