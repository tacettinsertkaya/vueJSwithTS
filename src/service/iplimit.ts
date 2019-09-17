import axios from 'axios'

export default {
  get(data: any) {
    return axios.post('/API/IPWhiteList/GetAsync', data)
  },
  getMany(data: any) {
    return axios.post('/API/IPWhiteList/GetManyAsync', data)
  },
  add(data: any) {
    return axios.post('/API/IPWhiteList/AddAsync', data)
  },
  edit(data: any) {
    return axios.post('/API/IPWhiteList/EditAsync', data)
  },
  delete(data: any) {
    return axios.post('/API/IPWhiteList/DeleteAsync', data)
  },
  enableOrDisableAsync(data: any) {
    return axios.post('/API/IPWhiteList/EnableOrDisableAsync', data)
  }
}
