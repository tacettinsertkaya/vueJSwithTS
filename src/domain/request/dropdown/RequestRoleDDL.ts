interface IRequestRoleDDL {
  Status: number
  FilterRole: boolean
}
/**
 * 檢視 - 角色 - 多筆
 */
class RequestRoleDDL implements IRequestRoleDDL {
  Status: number
  FilterRole: boolean
  /**
   *
   * @param options 檢視 - 角色 - 多筆
   * {
   * Status 狀態 (-1:全部 0:停用 1:啟用)
   * FilterRole 篩選角色(true:篩選 False:不篩選)-篩選登入者角色以下角色
   * ExecutorUser 操作者
   * }
   */
  constructor(options: RequestRoleDDL) {
    this.Status = options.Status
    this.FilterRole = options.FilterRole
  }
}

export default RequestRoleDDL
