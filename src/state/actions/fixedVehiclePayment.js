import { fixedVehiclePayment } from '@api'

const getFixedVehiclePayment = (params) => () => fixedVehiclePayment.getAll(params).then((res) => res.data)

export {
  getFixedVehiclePayment,
}
