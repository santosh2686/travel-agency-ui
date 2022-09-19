import { getRegularRequestById, createRegularRequest, updateRegularRequest } from '@state/actions/regularRequest'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => {
  const paymentMethods = getConfigListByKey(state, 'paymentMethod')
  const requestTypes = getConfigListByKey(state, 'requestType')

  return {
    paymentMethods,
    requestTypes,
  }
}

const actions = {
  getRegularRequestById,
  createRegularRequest,
  updateRegularRequest,
}

export {
  mapStateToProps,
  actions,
}
