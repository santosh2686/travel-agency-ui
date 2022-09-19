import { getStaff } from '@state/actions/staff'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  categoryList: getConfigListByKey(state, 'staffCategory'),
})

const actions = {
  getStaff,
}

export {
  mapStateToProps,
  actions,
}
