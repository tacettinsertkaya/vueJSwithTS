import axios from 'axios'
import { RequestTPlatformGetMany } from '@/views/tPlatform/model/TPlatformModel'
export default {
  getMany(data: RequestTPlatformGetMany) {
    return axios.post('/API/TPlatform/GetManyAsync', data)
  },
  get(data) {
    return axios.post('/API/TPlatform/GetAsync', data)
  },
  add(data) {
    return axios.post('/API/TPlatform/AddAsync', data)
  },
  edit(data) {
    return axios.post('/API/TPlatform/EditAsync', data)
  }
}
