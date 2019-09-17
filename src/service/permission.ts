import axios from 'axios'

export default {
  getLevel(data: any) {
    return axios.post('/API/Permission/GetLevelAsync', data)
  },
  pageCheck(data: any) {
    return axios.post('/API/Permission/PageCheckAsync', data)
  },
  checkList() {
    return axios.post('/API/Permission/CheckListAsync')
  }
}
