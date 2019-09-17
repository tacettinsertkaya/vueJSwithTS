/**
 * @param {number} Status 狀態(0:停用 1:啟用)
 */
interface IRequestBankDDL {
  Status: number
}
/**
 * 選單API操作 - 銀行 - 列表
 */
class RequestBankDDL implements IRequestBankDDL {
  Status: number
  constructor(options: RequestBankDDL) {
    this.Status = options.Status
  }
}
export default RequestBankDDL
