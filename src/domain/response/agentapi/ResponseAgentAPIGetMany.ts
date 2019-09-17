import ResponseBase from '@/models/Shared/ResponseBase'

// 代理API - 多筆
class ResponseAgentAPIGetMany extends ResponseBase {
    AgentAccount: string // 代理帳號
    AgentName: string // 代理名稱
    AgentAPIID: number // 代理API識別碼
    AgentAPICode: string // 代理API代碼
    Status: number // 狀態
    AgentAPIName: string // 代理API名稱
    AgentAPIKey: string // 代理API金鑰
    AgentAPIHash: string // 代理API雜湊碼
    Description: string // 說明
    Comment: string // 註解
  constructor(options: ResponseAgentAPIGetMany) {
    super()
    this.AgentAccount = options.AgentAccount
    this.AgentName = options.AgentName
    this.AgentAPIID = options.AgentAPIID
    this.AgentAPICode = options.AgentAPICode
    this.Status = options.Status
    this.AgentAPIName = options.AgentAPIName
    this.AgentAPIKey = options.AgentAPIKey
    this.AgentAPIHash = options.AgentAPIHash
    this.Description = options.Description
    this.Comment = options.Comment
    this.RowNum = options.RowNum
    this.CreateDateTime = options.CreateDateTime
    this.CreateUser = options.CreateUser
    this.UpdateDateTime = options.UpdateDateTime
    this.UpdateUser = options.UpdateUser
  }
}
export default ResponseAgentAPIGetMany
