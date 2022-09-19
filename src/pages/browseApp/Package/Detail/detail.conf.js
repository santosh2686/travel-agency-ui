import { getPackageById } from '@state/actions/package'
import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'packageCategory', category)
  return {
    categoryName,
  }
}

const actions = {
  getPackageById,
}

export {
  mapStateToProps,
  actions,
}
