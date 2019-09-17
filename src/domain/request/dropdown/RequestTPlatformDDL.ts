/**
 * @param {number} Status - 狀態(0:停用 1:啟用)
 */
interface IRequestTPlatformDDL {
  Status: number
}
/**
 * 檢視 - 三方平台 - 多筆
 */
class RequestTPlatformDDL implements IRequestTPlatformDDL {
  Status: number
  constructor(options: RequestTPlatformDDL) {
    this.Status = options.Status
  }
}

export default RequestTPlatformDDL
