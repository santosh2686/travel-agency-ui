import React from 'react'
import {
  arrayOf, func, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { PageHeader, AddEditWrapper } from '@local'

import CreateForm from '../CreateForm/CreateForm.jsx'
import validationSchema from '../validation/schema'

import { mapStateToProps, actions } from './create.conf'

const Create = ({
  match: {
    params,
  },
  getRegularRequestById,
  createRegularRequest,
  updateRegularRequest,
  requestTypes,
  paymentMethods,
}) => {
  const model = {
    ac: true,
    requestType: '',
    customerType: 'existing',
    vehicleType: 'existing',
    staffType: 'existing',
    pickUpLocation: '',
    dropOffLocation: '',
    pickUpDateTime: null,
    dropDateTime: null,
    openingKm: 0,
    closingKm: 0,
    totalKm: 0,
    totalHr: 0,
    customerCategory: null,
    customer: null,
    customerDetails: {},
    staffCategory: null,
    staff: null,
    staffDetails: {},
    vehicleCategory: null,
    vehicle: null,
    vehicleDetails: {},
    packageCategory: null,
    package: null,
    packageFromProvidedVehicle: {},
    paymentDetails: {
      status: '',
      paymentDate: null,
      paymentMethod: null,
    },
    advancedPayment: {
      advancedFromCustomer: 0,
      advancedToCustomer: 0,
      advancedFromProvidedVehicle: 0,
      advancedToProvidedVehicle: 0,
    },
    otherCharges: {
      toll: {
        amount: 0,
        isChargeableToCustomer: false,
      },
      parking: {
        amount: 0,
        isChargeableToCustomer: false,
      },
      nightHalt: {
        amount: 0,
        isChargeableToCustomer: false,
      },
      driverAllowance: {
        amount: 0,
        isChargeableToCustomer: false,
      },
    },
    requestTotal: 0,
    providedVehiclePayment: 0,
    requestExpense: 0,
    requestProfit: 0,
    customerBill: 0,
    comment: '',
  }

  const { action } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={`${isEdit ? 'Update' : 'Add'} regular request`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: 'Regular request list',
          route: '/request/regular/search',
        },
        {
          label: isEdit ? 'update' : 'create',
        }]}
      />
      <AddEditWrapper
        getHandler={getRegularRequestById}
        createHandler={createRegularRequest}
        updateHandler={updateRegularRequest}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={`Regular request ${isEdit ? 'updated' : 'added'} successfully.`}
        listRoute="/request/regular/search"
        isEdit={isEdit}
      >
        <CreateForm
          isEdit={isEdit}
          requestTypes={requestTypes}
          paymentMethods={paymentMethods}
        />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getRegularRequestById: func.isRequired,
  createRegularRequest: func.isRequired,
  updateRegularRequest: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  requestTypes: arrayOf(shape({
    name: string,
  })),
  paymentMethods: arrayOf(shape({
    name: string,
  })),
}

Create.defaultProps = {
  requestTypes: [],
  paymentMethods: [],
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
