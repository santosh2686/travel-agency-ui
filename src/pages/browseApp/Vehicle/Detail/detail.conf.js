import { getVehicleById } from '@state/actions/vehicle'
import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'vehicleCategory', category)
  return {
    categoryName,
  }
}

const actions = {
  getVehicleById,
}

export {
  mapStateToProps,
  actions,
}
