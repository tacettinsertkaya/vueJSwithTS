import { RequestBase } from '@/models/SharedModel'

interface IRequestUserEdit {
  Account: string
  Name: string
  Status: number
  Comment: string
}
/**
 * 後台 - 使用者 - 編輯
 */
class RequestUserEdit extends RequestBase implements IRequestUserEdit {
  Account: string
  Name: string
  Status: number
  Comment: string
  /**
   *
   * @param options 後台 - 使用者 - 編輯
   * {
   * Account 使用者帳號
   * Name 使用者名稱
   * Status 狀態(0:停用 1:啟用)
   * Comment 註解
   * }
   */
  constructor(options: RequestUserEdit) {
    super()

    this.Account = options.Account
    this.Name = options.Name
    this.Status = options.Status
    this.Comment = options.Comment
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestUserEdit
