import createCachedSelector from 're-reselect'

import getDataList from './getDataList'

const getDataItemById = createCachedSelector(
  getDataList,
  (_, { recordId }) => recordId,
  ({ data = [] }, recordId) => data.filter(({ _id }) => _id === recordId)[0],
)(
  (_, { recordId }) => recordId,
)

export default getDataItemById
