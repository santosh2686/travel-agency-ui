import { getDataList } from '@state/selectors/common'
import { getConfigCategoryById } from '@state/selectors/appConfig'

import { getPackage, deletePackage } from '@state/actions/package'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const params = {
    category,
    stateKey: 'packages',
  }
  const { total = 0, data = [] } = getDataList(state, params)
  const { name: categoryName } = getConfigCategoryById(state, 'packageCategory', category)

  return {
    total,
    data,
    categoryName,
  }
}

const actions = {
  getPackage,
  deletePackage,
}

export {
  mapStateToProps,
  actions,
}
