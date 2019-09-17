import ResponseBase from '@/models/Shared/ResponseBase'
interface IResponseRoleGetMany {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
}
/**
 * 角色-多筆
 */
class ResponseRoleGetMany extends ResponseBase implements IResponseRoleGetMany {
  RoleID: number
  RoleCode: string
  Status: boolean
  RoleName: string
  Description: string
  Comment: string
  /**
   *
   * @param options 角色-多筆
   * {
   * RoleID 角色識別碼,
   * RoleCode 角色代碼,
   * Status 狀態(0:停用 1:啟用),
   * RoleName 角色名稱,
   * Description 說明,
   * Comment 註解
   * }
   */
  constructor(options: ResponseRoleGetMany) {
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

export default ResponseRoleGetMany
