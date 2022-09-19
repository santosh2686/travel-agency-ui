import { API } from '@config'

const url = '/staff-account'

const staffAccount = {
  getAll: (params) => API.get(url, { params }),
  getById: (id) => API.get(`${url}/${id}`),
}

export default staffAccount
