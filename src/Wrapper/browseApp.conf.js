import { getAppConfig } from '@state/actions/appConfig'

import { getNavigationMenu } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  navigationMenu: getNavigationMenu(state),
})

const actions = {
  getAppConfig,
}

export {
  mapStateToProps,
  actions,
}
