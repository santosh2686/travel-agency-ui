import { report } from '@api'

const getReport = (params) => async () => report.getAll(params).then((res) => res.data)

export {
  getReport,
}
