import { getDataList } from '@state/selectors/common'

import { getAdvancedBooking, deleteAdvancedBooking } from '@state/actions/advancedBooking'

const mapStateToProps = (state) => {
  const params = {
    stateKey: 'advancedBooking',
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
  getAdvancedBooking,
  deleteAdvancedBooking,
}

export {
  mapStateToProps,
  actions,
}
