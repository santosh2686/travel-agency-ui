import { getDataList } from '@state/selectors/common'
import { getConfigCategoryById } from '@state/selectors/appConfig'

import { getVehicle, deleteVehicle } from '@state/actions/vehicle'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const params = {
    category,
    stateKey: 'vehicle',
  }
  const { total = 0, data = [] } = getDataList(state, params)
  const { name: categoryName } = getConfigCategoryById(state, 'vehicleCategory', category)

  return {
    total,
    data,
    categoryName,
  }
}

const actions = {
  getVehicle,
  deleteVehicle,
}

export {
  mapStateToProps,
  actions,
}
