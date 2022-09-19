import { getDataList } from '@state/selectors/common'
import { getConfigCategoryById } from '@state/selectors/appConfig'

import { getCustomer, deleteCustomer } from '@state/actions/customer'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const params = {
    category,
    stateKey: 'customer',
  }
  const { total = 0, data = [] } = getDataList(state, params)
  const { name: categoryName } = getConfigCategoryById(state, 'customerCategory', category)

  return {
    total,
    data,
    categoryName,
  }
}

const actions = {
  getCustomer,
  deleteCustomer,
}

export {
  mapStateToProps,
  actions,
}
