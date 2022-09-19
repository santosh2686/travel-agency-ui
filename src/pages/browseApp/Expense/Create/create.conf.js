import { getExpenseById, createExpense, updateExpense } from '@state/actions/expense'
import { getConfigListByKey, getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'expenseCategory', category)
  const expenseTypes = getConfigListByKey(state, 'expenseType')
  const paymentMethods = getConfigListByKey(state, 'paymentMethod')

  return {
    categoryName,
    expenseTypes,
    paymentMethods,
  }
}

const actions = {
  getExpenseById,
  createExpense,
  updateExpense,
}

export {
  mapStateToProps,
  actions,
}
