import React from 'react'
import { func, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { PageHeader, AddEditWrapper } from '@local'

import CreateForm from '../CreateForm/CreateForm.jsx'
import validationSchema from '../validation/schema'

import { mapStateToProps, actions } from './create.conf'

const Create = ({
  match: {
    params,
  },
  getCustomerById,
  createCustomer,
  updateCustomer,
  categoryName,
}) => {
  const model = {
    name: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pinCode: '',
    },
    contact: '',
    whatsAppNumber: '',
    email: '',
    comment: '',
    isActive: true,
  }

  const { action, category } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={isEdit ? `Update ${categoryName} customer` : `Add ${categoryName} customer`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} customer list`,
          route: `/customer/${category}/search`,
        },
        {
          label: isEdit ? 'update' : 'create',
        }]}
      />
      <AddEditWrapper
        getHandler={getCustomerById}
        createHandler={createCustomer}
        updateHandler={updateCustomer}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Customer updated successfully.' : 'Customer created successfully.'}
        listRoute={`/customer/${category}/search`}
        isEdit={isEdit}
      >
        <CreateForm isEdit={isEdit} />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getCustomerById: func.isRequired,
  createCustomer: func.isRequired,
  updateCustomer: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  categoryName: string,
}

Create.defaultProps = {
  categoryName: '',
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
