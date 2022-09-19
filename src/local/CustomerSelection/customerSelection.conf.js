import { getCustomer } from '@state/actions/customer'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  categoryList: getConfigListByKey(state, 'customerCategory'),
})

const actions = {
  getCustomer,
}

export {
  mapStateToProps,
  actions,
}
