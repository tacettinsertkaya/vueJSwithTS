import axios from 'axios'
import {
  RequestMenuGet,
  RequestMenuGetMany,
  RequestMenuAdd,
  RequestMenuEdit,
  RequestMenuDelete
} from '@/views/menu/model/MenuModel'

export default {
  get(data: RequestMenuGet) {
    return axios.post('/API/Menu/GetAsync', data)
  },
  getMany(data: RequestMenuGetMany) {
    return axios.post('/API/Menu/GetManyAsync', data)
  },
  getManyByMenuALL(data: any) {
    return axios.post('/API/Menu/GetManyByMenuALLAsync', data)
  },
  add(data: RequestMenuAdd) {
    return axios.post('/API/Menu/AddAsync', data)
  },
  edit(data: RequestMenuEdit) {
    return axios.post('/API/Menu/EditAsync', data)
  },
  delete(data: RequestMenuDelete) {
    return axios.post('/API/Menu/DeleteAsync', data)
  }
}
