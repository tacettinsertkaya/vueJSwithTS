import { ResponseBase } from '@/models/SharedModel'
/**
 *
 * @param options 角色權限 - 多筆
 * {
 * RoleID 角色識別碼
 * MenuID 選單識別碼
 * ParentMenuID 父選單識別碼
 * MenuLevel 選單層級
 * ParentMenuLevel 父選單層級
 * MenuType 選單類型
 * MenuKeyword 選單關鍵字
 * MenuUrl 選單連結
 * MenuName 選單名稱
 * Description 選單說明
 * Sequence 順序
 * MenuAPIKeyword 選單API關鍵字
 * MenuAPIUrl 選單API網址
 * MenuAPIName 選單API名稱
 * PermissionStatus 權限狀態
 * }
 */
interface IResponseRolePermissionGetMany {
  RoleID: number
  MenuID: number
  ParentMenuID: number
  MenuLevel: number
  ParentMenuLevel: number
  MenuType: number
  MenuKeyword: string
  MenuUrl: string
  MenuName: string
  Description: string
  Sequence: number
  MenuAPIKeyword: string
  MenuAPIUrl: string
  MenuAPIName: string
  PermissionStatus: boolean
}

interface IResponseRolePermissionGetManyBase {
  functionGetMany: Array<IResponseRolePermissionGetMany>
  menuGetMany: Array<IResponseRolePermissionGetMany>
  pageGetMany: Array<IResponseRolePermissionGetMany>
}
/**
 * 角色權限 - 多筆
 */
class ResponseRolePermissionGetMany extends ResponseBase
  implements IResponseRolePermissionGetManyBase {
  functionGetMany: IResponseRolePermissionGetMany[]
  menuGetMany: IResponseRolePermissionGetMany[]
  pageGetMany: IResponseRolePermissionGetMany[]
  constructor(options: ResponseRolePermissionGetMany) {
    super()
    this.functionGetMany = options.functionGetMany
    this.menuGetMany = options.menuGetMany
    this.pageGetMany = options.pageGetMany

    this.RowNum = options.RowNum
    this.CreateDateTime = options.CreateDateTime
    this.CreateUser = options.CreateUser
    this.UpdateDateTime = options.UpdateDateTime
    this.UpdateUser = options.UpdateUser
  }
}

export default ResponseRolePermissionGetMany
