import { API } from '@config'

const url = '/package'

const packages = {
  getAll: (params) => API.get(url, { params }),
  getById: (id) => API.get(`${url}/${id}`),
  create: (requestBody) => API.post(url, requestBody),
  update: (id, data) => API.patch(`${url}/${id}`, data),
  delete: (id) => API.delete(`${url}/${id}`),
}

export default packages
