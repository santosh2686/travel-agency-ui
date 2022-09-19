import { getCustomerById, createCustomer, updateCustomer } from '@state/actions/customer'
import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'customerCategory', category)
  return {
    categoryName,
  }
}

const actions = {
  getCustomerById,
  createCustomer,
  updateCustomer,
}

export {
  mapStateToProps,
  actions,
}
