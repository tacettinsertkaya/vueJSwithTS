import RequestBase from '@/models/Shared/RequestBase'

interface IRequestAgentAPIGetMany {
  AgentAccount: string
  AgentAPIStatus: number
  DateTimeType: number
  DateTimeStart: any
  DateTimeEnd: any
  PageIndex: number
  PageSize: number
}
/**
 * 代理API-新增
 */
class RequestAgentAPIGetMany extends RequestBase implements IRequestAgentAPIGetMany {
    AgentAccount: string
    AgentAPIStatus: number
    DateTimeType: number
    DateTimeStart: any
    DateTimeEnd: any
    PageIndex: number
    PageSize: number

  /**
   *
   * @param options 代理API-新增-參數 <br/>
   * { <br/>
   * AgentAccount 代理帳號(空白/NULL:不使用), <br/>
   * AgentAPIStatus 代理API狀態(-1/NULL:不使用 0:停用 1:啟用), <br/>
   * DateTimeType 時間類型(1:CreateDateTime 2:UpdateDateTime 預設:UpdateDateTime), <br/>
   * DateTimeStart 開始時間(NULL:不使用), <br/>
   * DateTimeEnd 結束時間(NULL:不使用), <br/>
   * PageIndex 第幾頁, <br/>
   * PageSize 每頁幾筆資料, <br/>
   * }
   */
  constructor(options: RequestAgentAPIGetMany) {
    super()
    this.AgentAccount = options.AgentAccount
    this.AgentAPIStatus = options.AgentAPIStatus
    this.DateTimeType = options.DateTimeType
    this.DateTimeStart = options.DateTimeStart
    this.DateTimeEnd = options.DateTimeEnd
    this.PageIndex = options.PageIndex
    this.PageSize = options.PageSize
  }
}
export default RequestAgentAPIGetMany
