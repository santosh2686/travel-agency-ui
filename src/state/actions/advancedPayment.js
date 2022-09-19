import { advancedPayment } from '@api'
import {
  FETCH_ADVANCED_PAYMENT_SUCCESS,
} from '../constants/advancedPayment'

import { getDataItemById } from '../selectors/common'

const fetchAdvancedPaymentSuccess = (response, params) => ({
  type: FETCH_ADVANCED_PAYMENT_SUCCESS,
  response,
  params,
})

const getAdvancedPayment = (params) => async (dispatch) => advancedPayment.getAll(params).then((res) => {
  dispatch(fetchAdvancedPaymentSuccess(res.data, params))
  return res.data
})

const getAdvancedPaymentById = (id) => async (_, getState) => {
  const state = getState()
  const options = {
    stateKey: 'advancedPayment',
    recordId: id,
  }
  const advancedPaymentDetail = await getDataItemById(state, options)
  if (advancedPaymentDetail) {
    return advancedPaymentDetail
  }
  return advancedPayment.getById(id).then((res) => res.data)
}

const createAdvancedPayment = (requestBody) => () => advancedPayment.create(requestBody).then((res) => res)

const updateAdvancedPayment = (id, requestBody) => () => advancedPayment.update(id, requestBody)
  .then((res) => res)

const deleteAdvancedPayment = (id) => () => advancedPayment.delete(id).then((res) => res)

export {
  getAdvancedPayment,
  getAdvancedPaymentById,
  createAdvancedPayment,
  updateAdvancedPayment,
  deleteAdvancedPayment,
}
