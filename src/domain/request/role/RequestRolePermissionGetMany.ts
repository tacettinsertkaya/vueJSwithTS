import { RequestBase } from '@/models/SharedModel'

interface IRequestRolePermissionGetMany {
  RoleID: number
}
/**
 * 角色權限 - 多筆
 */
class RequestRolePermissionGetMany extends RequestBase
  implements IRequestRolePermissionGetMany {
  RoleID: number
  /**
   *
   * @param options 角色權限 - 多筆
   * {
   * RoleID 角色編號
   * }
   */
  constructor(options: RequestRolePermissionGetMany) {
    super()
    this.RoleID = options.RoleID
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestRolePermissionGetMany
