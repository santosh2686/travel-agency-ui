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
  getExpenseById,
  categoryName,
}) => {
  const { category } = params
  return (
    <>
      <PageHeader
        title={`View ${categoryName} expense`}
        withBreadCrumb
        breadCrumbData={[{
          label: 'Home',
          route: '/dashboard',
        },
        {
          label: `${categoryName} expense list`,
          route: `/expense/${category}/search`,
        },
        {
          label: 'expense detail',
        }]}
      />
      <DetailWrapper
        getHandler={getExpenseById}
        routeParams={params}
        listRoute={`/expense/${category}/search`}
      >
        <DetailView />
      </DetailWrapper>
    </>
  )
}

Detail.propTypes = {
  getExpenseById: func.isRequired,
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
