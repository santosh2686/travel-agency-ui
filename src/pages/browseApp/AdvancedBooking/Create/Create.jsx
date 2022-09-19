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
  getAdvancedBookingById,
  createAdvancedBooking,
  updateAdvancedBooking,
  vehicleTypes,
}) => {
  const model = {
    pickUpLocation: '',
    pickUpDateTime: toISOString(new Date()),
    dropOffLocation: '',
    vehicleType: '',
    noOfSeats: '',
    hasAc: true,
    customerCategory: null,
    customer: null,
    customerType: 'existing',
    customerDetails: {},
    comment: '',
  }

  const { action } = params
  const isEdit = action === 'edit'

  return (
    <>
      <PageHeader
        title={`${isEdit ? 'Update' : 'Add'} advanced booking`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: 'Advanced booking',
          route: '/advanced-booking/search',
        },
        {
          label: isEdit ? 'Update' : 'Create',
        }]}
      />
      <AddEditWrapper
        getHandler={getAdvancedBookingById}
        createHandler={createAdvancedBooking}
        updateHandler={updateAdvancedBooking}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Advanced booking updated successfully.' : 'Advanced booking created successfully.'}
        listRoute="/advanced-booking/search"
        isEdit={isEdit}
      >
        <CreateForm vehicleTypes={vehicleTypes} isEdit={isEdit} />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getAdvancedBookingById: func.isRequired,
  createAdvancedBooking: func.isRequired,
  updateAdvancedBooking: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  vehicleTypes: arrayOf(shape({
    name: string,
  })),
}

Create.defaultProps = {
  vehicleTypes: [],
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
