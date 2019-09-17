import axios from 'axios'

export default {
  firstLoginAccountAsync(data: any) {
    return axios.post('/API/Authenticate/FirstLoginAccountAsync', data)
  },
  secondLoginTokenAsync(data: any) {
    return axios.post('/API/Authenticate/SecondLoginTokenAsync', data)
  }
}
