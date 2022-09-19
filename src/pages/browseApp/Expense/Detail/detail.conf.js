import { getExpenseById } from '@state/actions/expense'
import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'expenseCategory', category)

  return {
    categoryName,
  }
}

const actions = {
  getExpenseById,
}

export {
  mapStateToProps,
  actions,
}
