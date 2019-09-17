import axios from 'axios'

export default {
  get(data: any) {
    return axios.post('/API/Translate/GetAsync', data)
  },
  getAll() {
    return axios.post('/API/Translate/GetAllAsync')
  }
}
