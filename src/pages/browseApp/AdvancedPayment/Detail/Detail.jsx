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
  getAdvancedPaymentById,
}) => (
  <>
    <PageHeader
      title="View advanced payment"
      withBreadCrumb
      breadCrumbData={[{
        label: 'Home',
        route: '/dashboard',
      },
      {
        label: 'advanced payment list',
        route: '/advanced-payment/search',
      },
      {
        label: 'Advanced payment detail',
      }]}
    />
    <DetailWrapper
      getHandler={getAdvancedPaymentById}
      routeParams={params}
      listRoute="/advanced-payment/search"
    >
      <DetailView />
    </DetailWrapper>
  </>
)

Detail.propTypes = {
  getAdvancedPaymentById: func.isRequired,
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
