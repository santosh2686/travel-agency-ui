import React from 'react'
import { func, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { PageHeader, DetailWrapper } from '@local'

import DetailView from '../DetailView/DetailView.jsx'

import { mapStateToProps, actions } from './detail.conf'

const Detail = ({
  match: {
    params,
  },
  getVehicleById,
  categoryName,
}) => {
  const { category } = params
  return (
    <>
      <PageHeader
        title={`View ${categoryName} vehicle`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} vehicle list`,
          route: `/vehicle/${category}/search`,
        },
        {
          label: 'vehicle detail',
        }]}
      />
      <DetailWrapper
        getHandler={getVehicleById}
        routeParams={params}
        listRoute={`/vehicle/${category}/search`}
      >
        <DetailView />
      </DetailWrapper>
    </>
  )
}

Detail.propTypes = {
  getVehicleById: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  categoryName: string,
}

Detail.defaultProps = {
  categoryName: '',
}

const DetailWithConnect = connect(mapStateToProps, actions)(Detail)

export {
  DetailWithConnect as default,
  Detail,
}
