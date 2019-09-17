import axios from 'axios'

export default {
  get(data: any) {
    return axios.post('/API/GoogleAuthenticatorQRCode/GetAsync', data)
  }
}
