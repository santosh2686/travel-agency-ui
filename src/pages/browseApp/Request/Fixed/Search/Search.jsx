/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor } from '@base'
import { PageHeader, Grid, FilterByVehicle } from '@local'
import { formatDate } from '@utils/date'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  getFixedRequest,
  deleteFixedRequest,
  data,
  total,
  currentPage,
  totalPages,
}) => {
  const columns = [{
    label: 'Request no.',
    custom: ({ _id, requestNo }) => (
      <Anchor asLink href={`/request/fixed/${_id}/detail`}>
        {requestNo}
      </Anchor>
    ),
  }, {
    label: 'Date',
    custom: ({ pickUpDateTime }) => formatDate(pickUpDateTime, 'DD-MMM-YYYY'),
  }, {
    label: 'Customer Name',
    map: 'customer.name',
  }, {
    label: 'Request type',
    map: 'requestType.name',
  }, {
    label: 'Vehicle provided',
    map: 'vehicleType',
  }, {
    label: 'Vehicle',
    custom: ({ vehicle, vehicleDetails }) => {
      const { manufacturer, name, registrationNo } = vehicle || vehicleDetails
      return (
        <>
          <p>{`${manufacturer} ${name}`}</p>
          <p>{`${registrationNo}`}</p>
        </>
      )
    },
  }, {
    label: 'Driver',
    custom: ({ staff, staffDetails }) => {
      const { name } = staff || staffDetails
      return name
    },
  }, {
    label: 'Total KM',
    map: 'totalKm',
    classes: 'text-center',
  }, {
    label: 'Total HR',
    map: 'totalHr',
    classes: 'text-center',
  }]
  return (
    <>
      <PageHeader
        title="Fixed requests"
        total={total}
        btnRoute="/request/fixed/create"
        btnLabel="Add fixed request"
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getFixedRequest}
        deleteHandler={deleteFixedRequest}
        editRoute="/request/fixed"
        currentPage={currentPage}
        totalPages={totalPages}
        withPagination
        withFilter
      >
        <FilterByVehicle />
      </Grid>
    </>
  )
}

Search.propTypes = {
  getFixedRequest: func.isRequired,
  deleteFixedRequest: func.isRequired,
  data: arrayOf(shape({
    _id: string,
  })),
  total: number,
  totalPages: number,
  currentPage: number,
}

Search.defaultProps = {
  data: [],
  total: 0,
  totalPages: 0,
  currentPage: 1,
}

const SearchWithConnect = connect(mapStateToProps, actions)(Search)

export {
  SearchWithConnect as default,
  Search,
}
