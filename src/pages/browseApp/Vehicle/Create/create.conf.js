import { getVehicleById, createVehicle, updateVehicle } from '@state/actions/vehicle'
import { getConfigListByKey, getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'vehicleCategory', category)
  const vehicleTypes = getConfigListByKey(state, 'vehicleType')

  return {
    categoryName,
    vehicleTypes,
  }
}

const actions = {
  getVehicleById,
  createVehicle,
  updateVehicle,
}

export {
  mapStateToProps,
  actions,
}
