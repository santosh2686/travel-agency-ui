import {
  createAppConfig, updateAppConfig, deleteAppConfig,
} from '@state/actions/appConfig'

const mapStateToProps = (state) => {
  const { appConfig } = state
  return {
    configuration: appConfig,
  }
}

const actions = {
  createAppConfig,
  updateAppConfig,
  deleteAppConfig,
}

export {
  mapStateToProps,
  actions,
}
