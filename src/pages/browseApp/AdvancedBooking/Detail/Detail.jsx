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
  getAdvancedBookingById,
}) => (
  <>
    <PageHeader
      title="View advanced booking"
      withBreadCrumb
      breadCrumbData={[{
        label: 'Home',
        route: '/dashboard',
      },
      {
        label: 'advanced booking list',
        route: '/advanced-booking/search',
      },
      {
        label: 'Advanced booking detail',
      }]}
    />
    <DetailWrapper
      getHandler={getAdvancedBookingById}
      routeParams={params}
      listRoute="/advanced-booking/search"
    >
      <DetailView />
    </DetailWrapper>
  </>
)

Detail.propTypes = {
  getAdvancedBookingById: func.isRequired,
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
