/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor } from '@base'
import { PageHeader, Grid } from '@local'

import { formatDate } from '@utils/date'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  getAdvancedBooking,
  deleteAdvancedBooking,
  data,
  total,
  currentPage,
  totalPages,
}) => {
  const columns = [{
    label: 'Pickup date',
    custom: ({ _id, pickUpDateTime }) => (
      <Anchor asLink href={`/advanced-booking/${_id}/detail`}>
        {formatDate(pickUpDateTime, 'DD-MMM-YYYY')}
      </Anchor>
    ),
  },
  {
    label: 'Pickup time',
    custom: ({ pickUpDateTime }) => (
      <>
        {formatDate(pickUpDateTime, 'hh:mm A')}
      </>
    ),
  },
  {
    label: 'Customer type',
    map: 'customerType',
  },
  {
    label: 'Customer',
    custom: ({
      customerType, customerCategory, customerDetails, customer,
    }) => {
      if (customerType === 'existing') {
        const { _id, name } = customer
        return (
          <Anchor asLink href={`/customer/${customerCategory}/${_id}/detail`}>
            {name}
          </Anchor>
        )
      }
      return customerDetails.name
    },
  },
  {
    label: 'Pick up location',
    map: 'pickUpLocation',
  },
  {
    label: 'Drop location',
    map: 'dropOffLocation',
  },
  {
    label: 'Vehicle',
    map: 'vehicleType.name',
  },
  {
    label: 'AC',
    custom: ({ hasAc }) => {
      if (hasAc) {
        return 'Yes'
      }
      return 'No'
    },
  },
  {
    label: 'Status',
    map: 'status',
  }]

  return (
    <>
      <PageHeader
        title="Advanced booking"
        total={total}
        btnRoute="/advanced-booking/create"
        btnLabel="Add booking"
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getAdvancedBooking}
        deleteHandler={deleteAdvancedBooking}
        editRoute="/advanced-booking"
        currentPage={currentPage}
        totalPages={totalPages}
        withPagination
      />
    </>
  )
}

Search.propTypes = {
  getAdvancedBooking: func.isRequired,
  deleteAdvancedBooking: func.isRequired,
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
