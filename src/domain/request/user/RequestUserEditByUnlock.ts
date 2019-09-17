import { RequestBase } from '@/models/SharedModel'

interface IRequestUserEditByUnlock {
  Account: string
}
/**
 * 後台 - 使用者 - 編輯By解除封鎖。
 */
class RequestUserEditByUnlock extends RequestBase
  implements IRequestUserEditByUnlock {
  Account: string
  /**
   *
   * @param options 後台 - 使用者 - 編輯By解除封鎖。
   * {
   * Account 角色帳號
   * }
   */
  constructor(options: RequestUserEditByUnlock) {
    super()
    this.Account = options.Account
    this.ExecutorUser = options.ExecutorUser
  }
}

export default RequestUserEditByUnlock
