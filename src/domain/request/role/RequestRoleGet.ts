import RequestBase from '@/models/Shared/RequestBase'

interface IRequestRoleGet {
  RoleID: number
  RoleCode: string
}

/**
 * 角色-單筆
 */
class RequestRoleGet extends RequestBase implements IRequestRoleGet {
  RoleID: number
  RoleCode: string
  /**
   *
   * @param options 角色-單筆-參數
   * RoleID 角色識別碼(-1:不使用),
   * RoleCode 角色代碼(空白:不使用),
   * ExecutorUser 操作者
   */
  constructor(options: RequestRoleGet) {
    super()
    this.RoleID = options.RoleID
    this.RoleCode = options.RoleCode
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestRoleGet
