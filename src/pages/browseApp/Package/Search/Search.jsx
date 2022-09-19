/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor, Currency } from '@base'
import { PageHeader, Grid, ActiveIndicator } from '@local'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  match,
  getPackage,
  deletePackage,
  data,
  total,
  categoryName,
}) => {
  const { params: { category } } = match
  const columnClass = 'text-right'

  const columns = [{
    label: 'Package code',
    custom: ({ _id, packageCode }) => (
      <Anchor asLink href={`/package/${category}/${_id}/detail`}>
        {packageCode}
      </Anchor>
    ),
  },
  {
    label: 'Base amount',
    classes: columnClass,
    custom: ({ baseAmount }) => (
      <Currency data={baseAmount} />
    ),
  },
  {
    label: 'Minimum KM',
    classes: columnClass,
    map: 'minimumKm',
  },
  {
    label: 'Extra KM rate',
    classes: columnClass,
    custom: ({ extraKmPerKmRate }) => (
      <Currency data={extraKmPerKmRate} />
    ),
  },
  {
    label: 'Minimum HR',
    classes: columnClass,
    map: 'minimumHr',
  },
  {
    label: 'Extra HR rate',
    classes: columnClass,
    custom: ({ extraHrPerHrRate }) => (
      <Currency data={extraHrPerHrRate} />
    ),
  },
  {
    label: 'Active',
    custom: ({ isActive }) => (
      <ActiveIndicator isActive={isActive} />
    ),
  }]

  return (
    <>
      <PageHeader
        title={`${categoryName} packages`}
        total={total}
        btnRoute={`/package/${category}/create`}
        btnLabel={`Add ${categoryName} package`}
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getPackage}
        deleteHandler={deletePackage}
        editRoute={`/package/${category}`}
        routeParams={{
          category,
        }}
        queryParams={{
          category,
        }}
      />
    </>
  )
}

Search.propTypes = {
  match: shape({
    params: shape({
      category: string,
    }),
  }).isRequired,
  getPackage: func.isRequired,
  deletePackage: func.isRequired,
  data: arrayOf(shape({
    _id: string,
  })),
  total: number,
  categoryName: string,
}

Search.defaultProps = {
  data: [],
  total: 0,
  categoryName: '',
}

const SearchWithConnect = connect(mapStateToProps, actions)(Search)

export {
  SearchWithConnect as default,
  Search,
}
