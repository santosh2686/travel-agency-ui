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
  getRegularRequestById,
}) => (
  <>
    <PageHeader
      title="View regular request"
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
        label: 'Request detail',
      }]}
    />
    <DetailWrapper
      getHandler={getRegularRequestById}
      routeParams={params}
      listRoute="/request/regular/search"
    >
      <DetailView />
    </DetailWrapper>
  </>
)

Detail.propTypes = {
  getRegularRequestById: func.isRequired,
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
