import axios from 'axios'
import {
  RequestUserGetMany,
  RequestUserAdd,
  RequestUserEdit,
  RequestUserEditByUnlock
} from '@/views/user/model/UserModel'
export default {
  getAllSessionStorange() {
    return axios.post('/API/User/GetAllSessionStorange')
  },
  logoutAsync() {
    return axios.post('/API/User/Logout')
  },
  getMany(data: RequestUserGetMany) {
    return axios.post('/API/User/GetManyAsync', data)
  },
  get(data) {
    return axios.post('/API/User/GetAsync', data)
  },
  add(data: RequestUserAdd) {
    return axios.post('/API/User/AddAsync', data)
  },
  edit(data: RequestUserEdit) {
    return axios.post('/API/User/EditAsync', data)
  },
  unlock(data: RequestUserEditByUnlock) {
    return axios.post('/API/User/EditByUnlockAsync', data)
  }
}
