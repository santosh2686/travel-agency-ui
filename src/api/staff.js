import { API } from '@config'

const url = '/staff'

const staff = {
  getAll: (params) => API.get(url, { params }),
  getById: (id) => API.get(`${url}/${id}`),
  create: (requestBody) => API.post(url, requestBody),
  update: (id, data) => API.patch(`${url}/${id}`, data),
  delete: (id) => API.delete(`${url}/${id}`),
}

export default staff
