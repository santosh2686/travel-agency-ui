import { getPackage } from '@state/actions/package'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  categoryList: getConfigListByKey(state, 'packageCategory'),
})

const actions = {
  getPackage,
}

export {
  mapStateToProps,
  actions,
}
