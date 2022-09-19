import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { model = {} } = ownProps
  const { vehicleCategory } = model
  const vehicleCategoryDetails = getConfigCategoryById(state, 'vehicleCategory', vehicleCategory)
  const { name } = vehicleCategoryDetails || {}
  return {
    selectedVehicleCategory: name,
  }
}

export {
  mapStateToProps,
}
