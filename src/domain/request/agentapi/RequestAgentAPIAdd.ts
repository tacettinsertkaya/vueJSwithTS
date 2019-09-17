import RequestBase from '@/models/Shared/RequestBase'

interface IRequestAgentAPIAdd {
  AgentAPICode: string
  Account: string
  AgentAPIStatus: number
  AgentAPIName: string
  AgentAPIKey: string
  AgentAPIHash: string
  Description: string
  Comment: string
}
/**
 * 代理API-新增
 */
class RequestAgentAPIAdd extends RequestBase implements IRequestAgentAPIAdd {
  AgentAPICode: string
  Account: string
  AgentAPIStatus: number
  AgentAPIName: string
  AgentAPIKey: string
  AgentAPIHash: string
  Description: string
  Comment: string

  /**
   *
   * @param options 代理API-新增-參數 <br/>
   * { <br/>
   * AgentAPICode 代理API代碼, <br/>
   * Account 帳號, <br/>
   * AgentAPIStatus 代理API狀態(0:停用 1:啟用), <br/>
   * AgentAPIName 代理API名稱, <br/>
   * AgentAPIKey 代理API金鑰, <br/>
   * AgentAPIHash 代理API雜湊碼, <br/>
   * Description 說明, <br/>
   * Comment 註解, <br/>
   * }
   */
  constructor(options: RequestAgentAPIAdd) {
    super()
    this.AgentAPICode = options.AgentAPICode
    this.Account = options.Account
    this.AgentAPIStatus = options.AgentAPIStatus
    this.AgentAPIName = options.AgentAPIName
    this.AgentAPIKey = options.AgentAPIKey
    this.AgentAPIHash = options.AgentAPIHash
    this.Description = options.Description
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestAgentAPIAdd
