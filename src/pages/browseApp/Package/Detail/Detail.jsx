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
  getPackageById,
  categoryName,
}) => {
  const { category } = params
  return (
    <>
      <PageHeader
        title={`View ${categoryName} package`}
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
          label: 'Package detail',
        }]}
      />
      <DetailWrapper
        getHandler={getPackageById}
        routeParams={params}
        listRoute={`/package/${category}/search`}
      >
        <DetailView />
      </DetailWrapper>
    </>
  )
}

Detail.propTypes = {
  getPackageById: func.isRequired,
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
