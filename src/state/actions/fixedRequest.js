import { fixedRequest } from '@api'

import { FETCH_FIXED_REQUEST_SUCCESS } from '../constants/fixedRequest'

import { getDataItemById, getDataList } from '../selectors/common'

const fetchFixedRequestSuccess = (response, params) => ({
  type: FETCH_FIXED_REQUEST_SUCCESS,
  response,
  params,
})

const getFixedRequest = (params) => async (dispatch) => fixedRequest.getAll(params).then((res) => {
  dispatch(fetchFixedRequestSuccess(res.data, params))
  return res.data
})

const getFixedRequestById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'fixedRequest',
    category,
    recordId: id,
  }
  const requestDetail = await getDataItemById(state, options)
  if (requestDetail) {
    return requestDetail
  }
  return fixedRequest.getById(id).then((res) => res.data)
}

const createFixedRequest = (requestBody, params) => (dispatch, getState) => {
  const state = getState()
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }

  const {
    totalHr, customer, regularVehicle, /* staffType, */
  } = requestBody

  const selectorParameters = {
    stateKey: 'monthlyFixedVehicleByCustomer',
    category: customer,
  }

  const { data: vehicleList = [] } = getDataList(state, selectorParameters)

  const vehicleDetails = vehicleList.filter(({ _id } = {}) => regularVehicle === _id)[0]
  const { monthlyFixedDetails = {} } = vehicleDetails
  const { package: requestPackage } = monthlyFixedDetails
  const { minimumHr, _id } = requestPackage
  const extraHr = (totalHr - minimumHr) < 0 ? 0 : (totalHr - minimumHr)

  updatedRequestBody.extraHr = extraHr
  updatedRequestBody.requestPackage = _id

  return fixedRequest.create(updatedRequestBody).then((res) => res)
}

const updateFixedRequest = (id, requestBody) => () => fixedRequest.update(id, requestBody)
  .then((res) => res)

const deleteFixedRequest = (id) => () => fixedRequest.delete(id).then((res) => res)

export {
  getFixedRequest,
  getFixedRequestById,
  createFixedRequest,
  updateFixedRequest,
  deleteFixedRequest,
}
