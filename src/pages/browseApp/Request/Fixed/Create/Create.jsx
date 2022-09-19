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
  getFixedRequestById,
  createFixedRequest,
  updateFixedRequest,
  getMonthlyFixedVehicleByCustomerId,
  requestTypes,
}) => {
  const model = {
    requestType: '',
    vehicleType: 'regular',
    staffType: 'regular',
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
    staffCategory: null,
    staff: null,
    staffDetails: {},
    regularVehicle: '',
    vehicleCategory: null,
    vehicle: null,
    vehicleDetails: {},
    packageFromProvidedVehicle: {},
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
    providedVehiclePayment: 0,
    requestExpense: 0,
    comment: '',
  }

  const { action } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={`${isEdit ? 'Update' : 'Add'} fixed request`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: 'Fixed request list',
          route: '/request/fixed/search',
        },
        {
          label: isEdit ? 'update' : 'create',
        }]}
      />
      <AddEditWrapper
        getHandler={getFixedRequestById}
        createHandler={createFixedRequest}
        updateHandler={updateFixedRequest}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={`Fixed request ${isEdit ? 'updated' : 'added'} successfully.`}
        listRoute="/request/fixed/search"
        isEdit={isEdit}
      >
        <CreateForm
          isEdit={isEdit}
          getVehicle={getMonthlyFixedVehicleByCustomerId}
          requestTypes={requestTypes}
        />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getFixedRequestById: func.isRequired,
  createFixedRequest: func.isRequired,
  updateFixedRequest: func.isRequired,
  getMonthlyFixedVehicleByCustomerId: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  requestTypes: arrayOf(shape({
    name: string,
  })),
}

Create.defaultProps = {
  requestTypes: [],
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
