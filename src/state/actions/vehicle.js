import { vehicle } from '@api'
import {
  FETCH_VEHICLE_SUCCESS, EMPTY_VEHICLE_LIST,
  FETCH_MONTHLY_FIXED_VEHICLE_SUCCESS,
} from '../constants/vehicle'

import { getDataList, getDataItemById } from '../selectors/common'

const fetchVehicleSuccess = (response, params) => ({
  type: FETCH_VEHICLE_SUCCESS,
  response,
  params,
})

const emptyVehicleList = (params) => ({
  type: EMPTY_VEHICLE_LIST,
  params,
})

const fetchMonthlyFixedVehicleSuccess = (response, params) => ({
  type: FETCH_MONTHLY_FIXED_VEHICLE_SUCCESS,
  response,
  params,
})

const getVehicle = (params) => async (dispatch, getState) => {
  const { filterData } = params
  const { category } = filterData
  const state = getState()
  const options = {
    stateKey: 'vehicle',
    category,
  }
  const { total, data = [] } = await getDataList(state, options)
  if (data.length) {
    return {
      total,
      data,
    }
  }
  return vehicle.getAll(params).then((res) => {
    dispatch(fetchVehicleSuccess(res.data, filterData))
    return res.data
  })
}

const getMonthlyFixedVehicleByCustomerId = (params) => async (dispatch) => {
  const { customer } = params
  return vehicle.getAll({ 'monthlyFixedDetails.customer': customer }).then((res) => {
    dispatch(fetchMonthlyFixedVehicleSuccess(res.data, params))
    return res.data
  })
}

const getVehicleById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'vehicle',
    category,
    recordId: id,
  }
  const vehicleDetail = await getDataItemById(state, options)
  if (vehicleDetail) {
    return vehicleDetail
  }
  return vehicle.getById(id).then((res) => res.data)
}

const createVehicle = (requestBody, params) => (dispatch) => {
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }
  return vehicle.create(updatedRequestBody).then((res) => {
    dispatch(emptyVehicleList(params))
    return res
  })
}

const updateVehicle = (id, requestBody, params) => (dispatch) => vehicle.update(id, requestBody)
  .then((res) => {
    dispatch(emptyVehicleList(params))
    return res
  })

const deleteVehicle = (id, params) => (dispatch) => vehicle.delete(id).then((res) => {
  dispatch(emptyVehicleList(params))
  return res
})

export {
  getVehicle,
  getVehicleById,
  getMonthlyFixedVehicleByCustomerId,
  createVehicle,
  updateVehicle,
  deleteVehicle,
}
