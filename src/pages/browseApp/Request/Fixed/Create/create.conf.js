import { getFixedRequestById, createFixedRequest, updateFixedRequest } from '@state/actions/fixedRequest'
import { getMonthlyFixedVehicleByCustomerId } from '@state/actions/vehicle'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => {
  const requestTypes = getConfigListByKey(state, 'requestType')

  return {
    categoryName: 'fixed',
    requestTypes,
  }
}

const actions = {
  getFixedRequestById,
  createFixedRequest,
  updateFixedRequest,
  getMonthlyFixedVehicleByCustomerId,
}

export {
  mapStateToProps,
  actions,
}
