import { staff } from '@api'
import { FETCH_STAFF_SUCCESS, EMPTY_STAFF_LIST } from '../constants/staff'

import { getDataList, getDataItemById } from '../selectors/common'

const fetchStaffSuccess = (response, params) => ({
  type: FETCH_STAFF_SUCCESS,
  response,
  params,
})

const emptyStaffList = (params) => ({
  type: EMPTY_STAFF_LIST,
  params,
})

const getAllStaff = () => () => staff.getAll().then((res) => res.data)

const getStaff = (params = {}) => async (dispatch, getState) => {
  const { filterData = {} } = params
  const { category } = filterData
  const state = getState()
  const options = {
    stateKey: 'staff',
    category,
  }
  const { total, data = [] } = await getDataList(state, options)
  if (data.length) {
    return {
      total,
      data,
    }
  }
  return staff.getAll(params).then((res) => {
    dispatch(fetchStaffSuccess(res.data, filterData))
    return res.data
  })
}

const getStaffById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'staff',
    category,
    recordId: id,
  }
  const staffDetail = await getDataItemById(state, options)
  if (staffDetail) {
    return staffDetail
  }
  return staff.getById(id).then((res) => res.data)
}

const createStaff = (requestBody, params) => (dispatch) => {
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }
  return staff.create(updatedRequestBody).then((res) => {
    dispatch(emptyStaffList(params))
    return res
  })
}

const updateStaff = (id, requestBody, params) => (dispatch) => staff.update(id, requestBody)
  .then((res) => {
    dispatch(emptyStaffList(params))
    return res
  })

const deleteStaff = (id, params) => (dispatch) => staff.delete(id).then((res) => {
  dispatch(emptyStaffList(params))
  return res
})

export {
  getAllStaff,
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
}
