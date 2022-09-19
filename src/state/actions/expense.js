import { expense } from '@api'

import { FETCH_EXPENSE_SUCCESS } from '../constants/expense'

import { getDataItemById } from '../selectors/common'

const fetchExpenseSuccess = (response, params) => ({
  type: FETCH_EXPENSE_SUCCESS,
  response,
  params,
})

const getExpense = (params) => async (dispatch) => expense.getAll(params).then((res) => {
  const { filterData } = params
  dispatch(fetchExpenseSuccess(res.data, filterData))
  return res.data
})

const getExpenseById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'expense',
    category,
    recordId: id,
  }
  const expenseDetail = await getDataItemById(state, options)
  if (expenseDetail) {
    return expenseDetail
  }
  return expense.getById(id).then((res) => res.data)
}

const createExpense = (requestBody, params) => () => {
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }
  return expense.create(updatedRequestBody).then((res) => res)
}

const updateExpense = (id, requestBody) => () => expense.update(id, requestBody)
  .then((res) => res)

const deleteExpense = (id) => () => expense.delete(id).then((res) => res)

export {
  getExpense,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
}
