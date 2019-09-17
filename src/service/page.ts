import axios from 'axios'
import {
  RequestPageGet,
  RequestPageGetMany,
  RequestPageAdd,
  RequestPageEdit,
  RequestPageDelete
} from '@/views/page/model/PageModel'

export default {
  get(data: RequestPageGet) {
    return axios.post('/API/Menu/GetAsync', data)
  },
  getMany(data: RequestPageGetMany) {
    return axios.post('/API/Menu/GetManyAsync', data)
  },
  add(data: RequestPageAdd) {
    return axios.post('/API/Menu/AddAsync', data)
  },
  edit(data: RequestPageEdit) {
    return axios.post('/API/Menu/EditAsync', data)
  },
  delete(data: RequestPageDelete) {
    return axios.post('/API/Menu/DeleteAsync', data)
  }
}
