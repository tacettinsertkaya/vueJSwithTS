import { RequestBase } from '@/models/SharedModel'

interface IRequestUserAdd {
  ParentAccount: string
  Account: string
  Password: string
  RoleID: number
  Name: string
  Approve: boolean
  Comment: string
}
/**
 * 後台 - 使用者 - 新增
 */
class RequestUserAdd extends RequestBase implements IRequestUserAdd {
  ParentAccount: string
  Account: string
  Password: string
  RoleID: number
  Name: string
  Approve: boolean
  Comment: string
  /**
   *
   * @param options 後台 - 使用者 - 新增
   * {
   * ParentAccount 父使用者帳號(空白/NULL:不使用)
   * Account 使用者帳號
   * Password 使用者密碼
   * RoleID 角色識別碼(請參考Role)
   * Name 使用者名稱
   * Approve 認證狀態(0:未認證 1:已認證)
   * Comment 註解
   * }
   */
  constructor(options: RequestUserAdd) {
    super()
    this.ParentAccount = options.ParentAccount
    this.Account = options.Account
    this.Password = options.Password
    this.RoleID = options.RoleID
    this.Name = options.Name
    this.Approve = options.Approve
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestUserAdd
