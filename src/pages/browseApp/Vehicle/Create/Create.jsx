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
  getVehicleById,
  createVehicle,
  updateVehicle,
  categoryName,
  vehicleTypes,
}) => {
  const model = {
    type: '',
    manufacturer: '',
    name: '',
    registrationNo: '',
    noOfSeats: '',
    hasAc: true,
    isMonthlyFixed: false,
    monthlyFixedDetails: {},
    comment: '',
    isActive: true,
  }

  const { action, category } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={isEdit ? `Update ${categoryName} vehicle` : `Add ${categoryName} vehicle`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} vehicle list`,
          route: `/Vehicle/${category}/search`,
        },
        {
          label: isEdit ? 'update vehicle' : 'add vehicle',
        }]}
      />
      <AddEditWrapper
        getHandler={getVehicleById}
        createHandler={createVehicle}
        updateHandler={updateVehicle}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Vehicle updated successfully.' : 'Vehicle created successfully.'}
        listRoute={`/Vehicle/${category}/search`}
        isEdit={isEdit}
      >
        <CreateForm isEdit={isEdit} vehicleTypes={vehicleTypes} />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getVehicleById: func.isRequired,
  createVehicle: func.isRequired,
  updateVehicle: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  categoryName: string,
  vehicleTypes: arrayOf(shape({
    name: string,
  })),
}

Create.defaultProps = {
  categoryName: '',
  vehicleTypes: [],
}

const CreateWithConnect = connect(mapStateToProps, actions)(Create)

export {
  CreateWithConnect as default,
  Create,
}
