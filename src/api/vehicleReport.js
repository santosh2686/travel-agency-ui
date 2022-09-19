import { API } from '@config'

const url = '/vehicle-report'

const vehicleReport = {
  getAll: (params) => API.get(url, { params }),
  getById: (id) => API.get(`${url}/${id}`),
}

export default vehicleReport
