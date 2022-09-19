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
  getCustomerById,
  categoryName,
}) => {
  const { category } = params
  return (
    <>
      <PageHeader
        title={`View ${categoryName} customer`}
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
          label: 'customer detail',
        }]}
      />
      <DetailWrapper
        getHandler={getCustomerById}
        routeParams={params}
        listRoute={`/customer/${category}/search`}
      >
        <DetailView />
      </DetailWrapper>
    </>
  )
}

Detail.propTypes = {
  getCustomerById: func.isRequired,
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
