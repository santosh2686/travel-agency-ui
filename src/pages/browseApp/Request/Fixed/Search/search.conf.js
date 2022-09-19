import { getDataList } from '@state/selectors/common'

import { getFixedRequest, deleteFixedRequest } from '@state/actions/fixedRequest'

const mapStateToProps = (state) => {
  const params = {
    stateKey: 'fixedRequest',
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
  getFixedRequest,
  deleteFixedRequest,
}

export {
  mapStateToProps,
  actions,
}
