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
  getAdvancedPaymentById,
  createAdvancedPayment,
  updateAdvancedPayment,
  paymentMethods,
}) => {
  const model = {
    staff: '',
    staffCategory: '',
    paymentDate: toISOString(new Date()),
    paymentMethod: '',
    amount: '',
    comment: '',
  }

  const { action } = params
  const isEdit = action === 'edit'

  return (
    <>
      <PageHeader
        title={`${isEdit ? 'Update' : 'Add'} advanced payment`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: 'Advanced payment',
          route: '/advanced-payment/search',
        },
        {
          label: isEdit ? 'Update' : 'Create',
        }]}
      />
      <AddEditWrapper
        getHandler={getAdvancedPaymentById}
        createHandler={createAdvancedPayment}
        updateHandler={updateAdvancedPayment}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Advanced payment updated successfully.' : 'Advanced payment created successfully.'}
        listRoute="/advanced-payment/search"
        isEdit={isEdit}
      >
        <CreateForm paymentMethods={paymentMethods} isEdit={isEdit} />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getAdvancedPaymentById: func.isRequired,
  createAdvancedPayment: func.isRequired,
  updateAdvancedPayment: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  paymentMethods: arrayOf(shape({
    name: string,
  })),
}

Create.defaultProps = {
  paymentMethods: [],
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
