import { RequestBase } from '@/models/SharedModel'

interface IUCTRolePermissionMerge {
  MenuID: number
  MenuAPIKeyword: string
}

interface IRequestRolePermissionMerge {
  RoleID: number
  RolePermissionData: Array<IUCTRolePermissionMerge>
}

class RequestRolePermissionMerge extends RequestBase
  implements IRequestRolePermissionMerge {
  RoleID: number
  RolePermissionData: IUCTRolePermissionMerge[]
  constructor(options: RequestRolePermissionMerge) {
    super()
    this.RoleID = options.RoleID
    this.RolePermissionData = options.RolePermissionData
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestRolePermissionMerge
