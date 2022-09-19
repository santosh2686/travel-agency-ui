import { vehicleReport } from '@api'

const getVehicleReport = (params) => () => vehicleReport.getAll(params).then((res) => res.data)

export {
  getVehicleReport,
}
