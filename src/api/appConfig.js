import { API } from '@config'

const url = '/app-config'

const appConfig = {
  get: () => API.get(url),
  create: (requestBody) => API.post(url, requestBody),
  update: (id, data) => API.patch(`${url}/${id}`, data),
  delete: (id, requestBody) => API.delete(`${url}/${id}`, { data: requestBody }),
}

export default appConfig
