import createCachedSelector from 're-reselect'

const getDataList = createCachedSelector(
  (state) => state,
  (_, params) => params,
  (state, { stateKey, category }) => {
    const data = category ? state[stateKey][category] : state[stateKey]
    return data || {}
  },
)(
  (_, { stateKey, category }) => {
    if (category) {
      return `${stateKey}_${category}`
    }
    return stateKey
  },
)

export default getDataList
