import { RequestBase } from '@/models/SharedModel'

interface IRequestUserGet {
  UserID: any
  Account: string
}
/**
 * 後台 - 使用者 - 單筆
 */
class RequestUserGet extends RequestBase implements IRequestUserGet {
  UserID: any
  Account: string

  /**
   *
   * @param options 後台 - 使用者 - 單筆
   * {
   * Account 使用者帳號
   * UserID 使用者 ID
   * }
   */
  constructor(options: RequestUserGet) {
    super()

    this.Account = options.Account
    this.UserID = options.UserID
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestUserGet
