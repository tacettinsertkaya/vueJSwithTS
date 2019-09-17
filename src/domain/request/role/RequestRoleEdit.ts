import RequestBase from '@/models/Shared/RequestBase'

interface IRequestRoleEdit {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
}

/**
 * 角色-編輯
 */
class RequestRoleEdit extends RequestBase implements IRequestRoleEdit {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
  /**
   *
   * @param options 角色-編輯-參數
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
  constructor(options: RequestRoleEdit) {
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

export default RequestRoleEdit
