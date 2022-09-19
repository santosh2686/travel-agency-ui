/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor, Currency } from '@base'

import { PageHeader, Grid } from '@local'
import { formatDate } from '@utils/date'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  getAdvancedPayment,
  deleteAdvancedPayment,
  data,
  total,
  currentPage,
  totalPages,
}) => {
  const columns = [{
    label: 'Staff name',
    custom: ({ _id, staff = {} }) => (
      <Anchor asLink href={`/advanced-payment/${_id}/detail`}>
        {staff.name}
      </Anchor>
    ),
  },
  {
    label: 'Payment Date',
    custom: ({ paymentDate }) => formatDate(paymentDate),
  },
  {
    label: 'Payment method',
    map: 'paymentMethod.name',
  },
  {
    label: 'Amount',
    classes: 'text-right',
    custom: ({ amount }) => (
      <Currency data={amount} />
    ),
  }]

  return (
    <>
      <PageHeader
        title="Advanced payment"
        total={total}
        btnRoute="/advanced-payment/create"
        btnLabel="Add advanced payment"
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getAdvancedPayment}
        deleteHandler={deleteAdvancedPayment}
        editRoute="/advanced-payment"
        currentPage={currentPage}
        totalPages={totalPages}
        withPagination
      />
    </>
  )
}

Search.propTypes = {
  getAdvancedPayment: func.isRequired,
  deleteAdvancedPayment: func.isRequired,
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
