import RequestBase from '@/models/Shared/RequestBase'

import { List } from '@/models/SharedModel'
import MenuAPIData from '@/models/Shared/MenuAPIData'

interface IRequestMenuAPIMerge {
  MenuID: number // 選單識別碼
  MenuAPIData: List<MenuAPIData> // 選單API資料
}

/**
 * 選單API - 新增、編輯 多筆
 */
class RequestMenuAPIMerge extends RequestBase implements IRequestMenuAPIMerge {
  MenuID: number
  MenuAPIData: List<MenuAPIData>
  /**
   *
   * @param options 選單API - 新增、編輯 多筆
   * {
   * MenuID 選單識別碼
   * MenuAPIData 選單API資料
   * }
   */
  constructor(options: RequestMenuAPIMerge) {
    super()
    this.MenuID = options.MenuID
    this.MenuAPIData = options.MenuAPIData
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestMenuAPIMerge
