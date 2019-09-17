import axios from 'axios'
import {
  RequestTPlatformBankGetMany,
  RequestTPlatformBankAdd,
  RequestTPlatformBankEdit
} from '@/views/tPlatformBank/model/TPlatformBankModel'

export default {
  getMany(data: RequestTPlatformBankGetMany) {
    return axios.post('/API/TPlatformBank/GetManyAsync', data)
  },
  get(data) {
    return axios.post('/API/TPlatformBank/GetAsync', data)
  },
  add(data: RequestTPlatformBankAdd) {
    return axios.post('/API/TPlatformBank/AddAsync', data)
  },
  edit(data: RequestTPlatformBankEdit) {
    return axios.post('/API/TPlatformBank/EditAsync', data)
  }
}
