import { getDataList } from '@state/selectors/common'

import { getAdvancedPayment, deleteAdvancedPayment } from '@state/actions/advancedPayment'

const mapStateToProps = (state) => {
  const params = {
    stateKey: 'advancedPayment',
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
  getAdvancedPayment,
  deleteAdvancedPayment,
}

export {
  mapStateToProps,
  actions,
}
