import { getStaffById } from '@state/actions/staff'
import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params: { category } } = match
  const { name: categoryName } = getConfigCategoryById(state, 'staffCategory', category)

  return {
    categoryName,
  }
}

const actions = {
  getStaffById,
}

export {
  mapStateToProps,
  actions,
}
