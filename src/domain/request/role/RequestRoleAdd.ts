import RequestBase from '@/models/Shared/RequestBase'

interface IRequestRoleAdd {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
}

/**
 * 角色-新增
 */
class RequestRoleAdd extends RequestBase implements IRequestRoleAdd {
  RoleID: number // 角色識別碼
  RoleCode: string // 角色代碼
  Status: boolean // 狀態(0:停用 1:啟用)
  RoleName: string // 角色名稱
  Description: string // 說明
  Comment: string // 註解
  /**
   *
   * @param options 角色-新增-參數
   * {
   * RoleID 角色識別碼,
   * RoleCode 角色代碼,
   * Status 狀態(0:停用 1:啟用),
   * RoleName 角色名稱,
   * Description 說明,
   * Comment 註解,
   * ExecutorUser
   * }
   */
  constructor(options: RequestRoleAdd) {
    super()
    this.RoleID = options.RoleID
    this.RoleCode = options.RoleCode
    this.Status = options.Status
    this.RoleName = options.RoleName
    this.Description = options.Description
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestRoleAdd
