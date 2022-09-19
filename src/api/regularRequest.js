import { API } from '@config'

const url = '/regular-request'

const regularRequest = {
  getAll: (params) => API.get(url, { params }),
  getById: (id) => API.get(`${url}/${id}`),
  create: (requestBody) => API.post(url, requestBody),
  update: (id, data) => API.patch(`${url}/${id}`, data),
  delete: (id) => API.delete(`${url}/${id}`),
}

export default regularRequest
