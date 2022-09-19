import React from 'react'
import { func, shape, string } from 'prop-types'
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
  getStaffById,
  createStaff,
  updateStaff,
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
    joiningDate: toISOString(new Date()),
    salary: '',
    license: '',
    comment: '',
    isActive: true,
  }

  const { action, category } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={isEdit ? `Update ${categoryName}` : `Add ${categoryName}`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} list`,
          route: `/staff/${category}/search`,
        },
        {
          label: isEdit ? 'update' : 'create',
        }]}
      />
      <AddEditWrapper
        getHandler={getStaffById}
        createHandler={createStaff}
        updateHandler={updateStaff}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Staff updated successfully.' : 'Staff created successfully.'}
        listRoute={`/staff/${category}/search`}
        isEdit={isEdit}
      >
        <CreateForm isEdit={isEdit} />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getStaffById: func.isRequired,
  createStaff: func.isRequired,
  updateStaff: func.isRequired,
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
