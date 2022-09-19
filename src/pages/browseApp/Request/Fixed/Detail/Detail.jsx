import React from 'react'
import { func, shape, string } from 'prop-types'
import { connect } from 'react-redux'

import { PageHeader, DetailWrapper } from '@local'

import DetailView from '../DetailView/DetailView.jsx'

import { actions } from './detail.conf'

const Detail = ({
  match: {
    params,
  },
  getFixedRequestById,
}) => (
  <>
    <PageHeader
      title="View fixed request"
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
        label: 'Request detail',
      }]}
    />
    <DetailWrapper
      getHandler={getFixedRequestById}
      routeParams={params}
      listRoute="/request/fixed/search"
    >
      <DetailView />
    </DetailWrapper>
  </>
)

Detail.propTypes = {
  getFixedRequestById: func.isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
}

const DetailWithConnect = connect(null, actions)(Detail)

export {
  DetailWithConnect as default,
  Detail,
}
