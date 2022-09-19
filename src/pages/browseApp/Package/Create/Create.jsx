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
  getPackageById,
  createPackage,
  updatePackage,
  categoryName,
}) => {
  const model = {
    packageCode: '',
    baseAmount: '',
    minimumKm: '',
    extraKmPerKmRate: '',
    minimumHr: '',
    extraHrPerHrRate: '',
    comment: '',
    isActive: true,
  }

  const { action, category } = params
  const isEdit = action === 'edit'
  return (
    <>
      <PageHeader
        title={isEdit ? `Update ${categoryName} package` : `Create ${categoryName} package`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} package list`,
          route: `/package/${category}/search`,
        },
        {
          label: isEdit ? 'update' : 'create',
        }]}
      />
      <AddEditWrapper
        getHandler={getPackageById}
        createHandler={createPackage}
        updateHandler={updatePackage}
        model={model}
        routeParams={params}
        validationSchema={validationSchema}
        successMessage={isEdit ? 'Package updated successfully.' : 'Package created successfully.'}
        listRoute={`/package/${category}/search`}
        isEdit={isEdit}
      >
        <CreateForm />
      </AddEditWrapper>
    </>
  )
}

Create.propTypes = {
  getPackageById: func.isRequired,
  createPackage: func.isRequired,
  updatePackage: func.isRequired,
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
