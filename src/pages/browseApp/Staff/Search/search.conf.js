import { getDataList } from '@state/selectors/common'
import { getConfigCategoryById } from '@state/selectors/appConfig'

import { getStaff, deleteStaff } from '@state/actions/staff'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const params = {
    category,
    stateKey: 'staff',
  }
  const { total = 0, data = [] } = getDataList(state, params)
  const { name: categoryName } = getConfigCategoryById(state, 'staffCategory', category)

  return {
    total,
    data,
    categoryName,
  }
}

const actions = {
  getStaff,
  deleteStaff,
}

export {
  mapStateToProps,
  actions,
}
