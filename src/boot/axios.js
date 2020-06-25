import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Cache-Control': 'no-cache'
  }
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$api = api
}
