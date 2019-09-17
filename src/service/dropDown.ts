import axios from 'axios'
import RequestRoleDDL from '@/domain/request/dropdown/RequestRoleDDL'
import RequestTPlatformDDL from '@/domain/request/dropdown/RequestTPlatformDDL'
import RequestBankDDL from '@/domain/request/dropdown/RequestBankDDL'
export default {
  /**
   * 選單API操作 - 列表
   */
  getMenuAPIOperationalDDL() {
    return axios.post('/API/DropDown/MenuAPIOperationalListAsync')
  },
  /**
   * 選單API操作 - 角色 - 列表
   * @param {RequestRoleDDL} data
   */
  getRoleDDL(data: RequestRoleDDL) {
    return axios.post('/API/DropDown/RoleListAsync', data)
  },
  /**
   * 選單API操作 - 三方平台 - 列表
   * @param {RequestTPlatformDDL} data
   */
  getTPlatformDDL(data: RequestTPlatformDDL) {
    return axios.post('/API/DropDown/TPlatformListAsync', data)
  },
  /**
   * 選單API操作 - 銀行 - 列表
   * @param {RequestBankDDL} data
   */
  getBankDDL(data: RequestBankDDL) {
    return axios.post('/API/DropDown/BankListAsync', data)
  }
}
