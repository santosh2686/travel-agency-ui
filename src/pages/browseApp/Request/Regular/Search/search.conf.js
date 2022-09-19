import { getDataList } from '@state/selectors/common'

import { getRegularRequest, deleteRegularRequest } from '@state/actions/regularRequest'

const mapStateToProps = (state) => {
  const params = {
    stateKey: 'regularRequest',
  }

  const {
    total = 0, totalPages = 0, currentPage = 1, data = [],
  } = getDataList(state, params)

  return {
    total,
    currentPage,
    totalPages,
    data,
  }
}

const actions = {
  getRegularRequest,
  deleteRegularRequest,
}

export {
  mapStateToProps,
  actions,
}
