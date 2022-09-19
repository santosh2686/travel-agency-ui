import { advancedBooking } from '@api'
import {
  FETCH_ADVANCED_BOOKING_SUCCESS,
} from '../constants/advancedBooking'

import { getDataItemById } from '../selectors/common'

const fetchAdvancedBookingSuccess = (response, params) => ({
  type: FETCH_ADVANCED_BOOKING_SUCCESS,
  response,
  params,
})

const getAdvancedBooking = (params) => async (dispatch) => advancedBooking.getAll(params).then((res) => {
  dispatch(fetchAdvancedBookingSuccess(res.data, params))
  return res.data
})

const getAdvancedBookingById = (id) => async (_, getState) => {
  const state = getState()
  const options = {
    stateKey: 'advancedBooking',
    recordId: id,
  }
  const advancedBookingDetail = await getDataItemById(state, options)
  if (advancedBookingDetail) {
    return advancedBookingDetail
  }
  return advancedBooking.getById(id).then((res) => res.data)
}

const createAdvancedBooking = (requestBody) => () => advancedBooking.create(requestBody).then((res) => res)

const updateAdvancedBooking = (id, requestBody) => () => advancedBooking.update(id, requestBody)
  .then((res) => res)

const deleteAdvancedBooking = (id) => () => advancedBooking.delete(id).then((res) => res)

export {
  getAdvancedBooking,
  getAdvancedBookingById,
  createAdvancedBooking,
  updateAdvancedBooking,
  deleteAdvancedBooking,
}
