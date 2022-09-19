import createCachedSelector from 're-reselect'

import getConfigListByKey from './getConfigListByKey'

const getConfigCategoryById = createCachedSelector(
  (state) => state,
  (_, key) => key,
  (_, __, id) => id,
  (state, key, id) => {
    const list = getConfigListByKey(state, key)
    return list.filter(({ _id }) => id === _id)[0]
  },
)(
  (_, key, id) => `${key}_${id}`,
)

export default getConfigCategoryById
