import RequestBase from '@/models/Shared/RequestBase'

interface IRequestMenuEdit {
  MenuID: number
  MenuType: number
  MenuKeyword: string
  MenuUrl: string
  MenuName: string
  Description: string
  Sequence: number
  Comment: string
}
/**
 * 選單-編輯
 */
class RequestMenuEdit extends RequestBase implements IRequestMenuEdit {
  MenuID: number
  MenuType: number
  MenuKeyword: string
  MenuUrl: string
  MenuName: string
  Description: string
  Sequence: number
  Comment: string

  /**
   *
   * @param options 選單-編輯-參數 <br/>
   * { <br/>
   * MenuID 選單識別碼(-1:不使用), <br/>
   * MenuType 選單類型(1:選單 2:頁面), <br/>
   * MenuKeyword 選單關鍵字, <br/>
   * MenuUrl 選單連結, <br/>
   * MenuName 選單名稱, <br/>
   * Description 選單說明, <br/>
   * Sequence 順序, <br/>
   * Comment 註解, <br/>
   * }
   */
  constructor(options: RequestMenuEdit) {
    super()
    this.MenuID = options.MenuID
    this.MenuType = options.MenuType
    this.MenuKeyword = options.MenuKeyword
    this.MenuUrl = options.MenuUrl
    this.MenuName = options.MenuName
    this.Description = options.Description
    this.Sequence = options.Sequence
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestMenuEdit
