/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor, Currency } from '@base'
import { PageHeader, Grid, FilterByVehicle } from '@local'

import { formatDate } from '@utils/date'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  getRegularRequest,
  deleteRegularRequest,
  data,
  total,
  currentPage,
  totalPages,
}) => {
  const columns = [{
    label: 'Request no.',
    custom: ({ _id, requestNo }) => (
      <Anchor asLink href={`/request/regular/${_id}/detail`}>
        {requestNo}
      </Anchor>
    ),
  }, {
    label: 'Customer',
    custom: ({ customer, customerDetails }) => {
      const { name } = customer || customerDetails
      return name
    },
  }, {
    label: 'Request type',
    map: 'requestType.name',
  }, {
    label: 'Pickup date time',
    custom: ({ pickUpDateTime }) => {
      const formattedDate = formatDate(pickUpDateTime, 'DD-MMM-YYYY, hh:mm A')
      const dateTime = formattedDate.split(',')
      return (
        <>
          <span>{dateTime[0]}</span>
          <p>{dateTime[1]}</p>
        </>
      )
    },
  }, {
    label: 'Drop date time',
    custom: ({ dropDateTime }) => {
      const formattedDate = formatDate(dropDateTime, 'DD-MMM-YYYY, hh:mm A')
      const dateTime = formattedDate.split(',')
      return (
        <>
          <span>{dateTime[0]}</span>
          <p>{dateTime[1]}</p>
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
    label: 'Request KM',
    map: 'totalKm',
    classes: 'text-center',
  }, {
    label: 'Total',
    custom: ({ requestTotal }) => (
      <Currency data={requestTotal} />
    ),
    classes: 'text-right',
  }, {
    label: 'Profit',
    custom: ({ requestProfit }) => (
      <Currency data={requestProfit} />
    ),
    classes: 'text-right',
  }]
  return (
    <>
      <PageHeader
        title="Regular requests"
        total={total}
        btnRoute="/request/regular/create"
        btnLabel="Add regular request"
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getRegularRequest}
        deleteHandler={deleteRegularRequest}
        editRoute="/request/regular"
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
  getRegularRequest: func.isRequired,
  deleteRegularRequest: func.isRequired,
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
