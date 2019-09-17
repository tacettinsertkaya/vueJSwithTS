import axios from 'axios'
import {
  RequestMenuAPIGetMany,
  RequestMenuAPIMerge
} from '@/models/PermissionModel'

export default {
  getMany(data: RequestMenuAPIGetMany) {
    return axios.post('/API/MenuAPl/GetManyAsync', data)
  },
  MergeAsync(data: RequestMenuAPIMerge) {
    console.log('axios', data)
    return axios.post('/API/MenuAPl/MergeAsync', data)
  }
}
