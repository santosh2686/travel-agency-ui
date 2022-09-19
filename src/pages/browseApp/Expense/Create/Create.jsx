import React from 'react'
import {
  arrayOf, func, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { PageHeader, AddEditWrapper } from '@local'

import { toISOString } from '@utils/date'

import CreateForm from '../CreateForm/CreateForm.jsx'
import validationSchema from '../validation/schema'

import { mapStateToProps, actions } from './create.conf'

const Create = ({
  match: {
    params,
  },
  getExpenseById,
  createExpense,
  updateExpense,
  categoryName,
  expenseTypes,
  paymentMethods,
}) => {
  const model = {
    type: '',
    date: toISOString(new Date()),
    staffCategory: null,
    staff: null,
    vehicleCategory: null,
    vehicle: null,
    paymentMethod: '',
    amount: '',
    location: '',
    comment: '',
    isActive: true,
  }

  const { action, category } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={isEdit ? `Update ${categoryName} expense` : `Add ${categoryName} expense`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} expense list`,
          route: `/expense/${category}/search`,
        },
        {
          label: isEdit ? 'update' : 'create',
        }]}
      />
      <AddEditWrapper
        getHandler={getExpenseById}
        createHandler={createExpense}
        updateHandler={updateExpense}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Expense updated successfully.' : 'Expense created successfully.'}
        listRoute={`/expense/${category}/search`}
        isEdit={isEdit}
        validationParams={{
          categoryName,
        }}
      >
        <CreateForm
          isEdit={isEdit}
          expenseTypes={expenseTypes}
          paymentMethods={paymentMethods}
          categoryName={categoryName}
        />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getExpenseById: func.isRequired,
  createExpense: func.isRequired,
  updateExpense: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  categoryName: string,
  expenseTypes: arrayOf(shape({
    name: string,
  })),
  paymentMethods: arrayOf(shape({
    name: string,
  })),
}

Create.defaultProps = {
  categoryName: '',
  expenseTypes: [],
  paymentMethods: [],
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
