import { getVehicle } from '@state/actions/vehicle'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  categoryList: getConfigListByKey(state, 'vehicleCategory'),
})

const actions = {
  getVehicle,
}

export {
  mapStateToProps,
  actions,
}
