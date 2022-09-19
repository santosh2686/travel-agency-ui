import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
})

// API.defaults.headers.common.TA_CONSUMER_ID = '1234'

export default API
