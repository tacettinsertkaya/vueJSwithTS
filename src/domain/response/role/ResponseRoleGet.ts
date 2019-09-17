import ResponseBase from '@/models/Shared/ResponseBase'

interface IResponseRoleGet {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
}
/**
 * 角色-單筆
 */
class ResponseRoleGet extends ResponseBase implements IResponseRoleGet {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
  /**
   *
   * @param options 角色-單筆-參數
   * {
   * RoleID 角色識別碼
   * RoleCode 角色代碼
   * Status 狀態
   * RoleName 角色名稱
   * Description 說明
   * Comment 註解
   * }
   */
  constructor(options: ResponseRoleGet) {
    super()
    this.RoleID = options.RoleID
    this.RoleCode = options.RoleCode
    this.Status = options.Status
    this.RoleName = options.RoleName
    this.Description = options.Description
    this.Comment = options.Comment
    this.RowNum = options.RowNum
    this.CreateDateTime = options.CreateDateTime
    this.CreateUser = options.CreateUser
    this.UpdateDateTime = options.UpdateDateTime
    this.UpdateUser = options.UpdateUser
  }
}

export default ResponseRoleGet
