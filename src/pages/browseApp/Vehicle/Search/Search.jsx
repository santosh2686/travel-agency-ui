/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor } from '@base'
import { PageHeader, Grid, ActiveIndicator } from '@local'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  match,
  getVehicle,
  deleteVehicle,
  data,
  total,
  categoryName,
}) => {
  const { params: { category } } = match

  const columns = [{
    label: 'Vehicle',
    custom: ({ _id, manufacturer, name }) => (
      <Anchor asLink href={`/vehicle/${category}/${_id}/detail`}>
        {`${manufacturer} ${name}`}
      </Anchor>
    ),
  },
  {
    label: 'Vehicle No.',
    map: 'registrationNo',
  },
  {
    label: 'No of seats',
    map: 'noOfSeats',
  },
  {
    label: 'type',
    map: 'type.name',
  },
  {
    label: 'AC',
    custom: ({ hasAc }) => (
      <>
        {hasAc ? 'Yes' : 'No' }
      </>
    ),
  },
  {
    label: 'Monthly fixed',
    classes: 'text-center',
    custom: ({ isMonthlyFixed }) => (
      <>
        {isMonthlyFixed ? 'Yes' : 'No' }
      </>
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
        title={`${categoryName}`}
        total={total}
        btnRoute={`/vehicle/${category}/create`}
        btnLabel={`Add ${categoryName} vehicle`}
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getVehicle}
        deleteHandler={deleteVehicle}
        editRoute={`/vehicle/${category}`}
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
  getVehicle: func.isRequired,
  deleteVehicle: func.isRequired,
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
