import ResponseBase from '@/models/Shared/ResponseBase'

interface IResponseUserGet {
  UserID: number
  ParentUserID: number
  ParentAccount: string
  Account: string
  RoleID: number
  RoleCode: string
  RoleName: string
  Status: number
  Name: string
  Approve: boolean
  Authenticator: number
  Comment: string
}
/**
 * 使用者 - 單筆
 */
class ResponseUserGet extends ResponseBase implements IResponseUserGet {
  UserID: number
  ParentUserID: number
  ParentAccount: string
  Account: string
  RoleID: number
  RoleCode: string
  RoleName: string
  Status: number
  Name: string
  Approve: boolean
  Authenticator: number
  Comment: string
  /**
   *
   * @param options 使用者 - 單筆
   * {
   * UserID 使用者識別碼
   * ParentUserID 父使用者識別碼
   * ParentAccount 父帳號
   * Account 帳號
   * RoleID 角色識別碼
   * RoleCode 角色代碼
   * RoleName 角色名稱
   * Status 狀態
   * Name 使用者名稱
   * Approve 認證狀態
   * Authenticator 驗證器
   * Comment 註解
   * }
   */
  constructor(options: ResponseUserGet) {
    super()
    this.UserID = options.UserID
    this.ParentUserID = options.ParentUserID
    this.ParentAccount = options.ParentAccount
    this.Account = options.Account
    this.RoleID = options.RoleID
    this.RoleCode = options.RoleCode
    this.RoleName = options.RoleName
    this.Status = options.Status
    this.Name = options.Name
    this.Approve = options.Approve
    this.Authenticator = options.Authenticator
    this.Comment = options.Comment

    this.RowNum = options.RowNum
    this.CreateDateTime = options.CreateDateTime
    this.CreateUser = options.CreateUser
    this.UpdateDateTime = options.UpdateDateTime
    this.UpdateUser = options.UpdateUser
  }
}

export default ResponseUserGet
