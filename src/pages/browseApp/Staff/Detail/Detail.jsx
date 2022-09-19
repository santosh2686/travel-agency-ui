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
  getStaffById,
  categoryName,
}) => {
  const { category } = params
  return (
    <>
      <PageHeader
        title={`View ${categoryName}`}
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
          label: 'staff detail',
        }]}
      />
      <DetailWrapper
        getHandler={getStaffById}
        routeParams={params}
        listRoute={`/staff/${category}/search`}
      >
        <DetailView />
      </DetailWrapper>
    </>
  )
}

Detail.propTypes = {
  getStaffById: func.isRequired,
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
