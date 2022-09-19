import { getDataList } from '@state/selectors/common'
import { getConfigCategoryById } from '@state/selectors/appConfig'

import { getExpense, deleteExpense } from '@state/actions/expense'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const params = {
    stateKey: 'expense',
    category,
  }
  const {
    total = 0, totalPages = 0, currentPage = 1, data = [],
  } = getDataList(state, params)
  const { name: categoryName } = getConfigCategoryById(state, 'expenseCategory', category)

  return {
    total,
    currentPage,
    totalPages,
    data,
    categoryName,
  }
}

const actions = {
  getExpense,
  deleteExpense,
}

export {
  mapStateToProps,
  actions,
}
