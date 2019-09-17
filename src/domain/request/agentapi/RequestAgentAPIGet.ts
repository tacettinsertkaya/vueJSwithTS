import RequestBase from '@/models/Shared/RequestBase'

interface IRequestAgentAPIGet {
  AgentAPIID: number
  AgentAPICode: string
}
/**
 * 代理API-編輯
 */
class RequestAgentAPIGet extends RequestBase implements IRequestAgentAPIGet {
  AgentAPIID: number
  AgentAPICode: string

  /**
   *
   * @param options 代理API-編輯-參數 <br/>
   * { <br/>
   * AgentAPIID 代理API識別碼(-1/NULL:不使用), <br/>
   * AgentAPICode 代理API代碼(空白/NULL:不使用), <br/>
   * }
   */
  constructor(options: RequestAgentAPIGet) {
    super()
    this.AgentAPIID = options.AgentAPIID
    this.AgentAPICode = options.AgentAPICode
    this.ExecutorUser = options.ExecutorUser
  }
}
export default RequestAgentAPIGet
