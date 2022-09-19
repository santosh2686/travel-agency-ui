import createCachedSelector from 're-reselect'

const getConfigListByKey = createCachedSelector(
  (state) => state,
  (_, key) => key,
  (state, key) => state.appConfig[key],
)(
  (_, key) => key,
)

export default getConfigListByKey
