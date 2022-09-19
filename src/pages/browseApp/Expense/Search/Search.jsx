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
  match,
  getExpense,
  deleteExpense,
  data,
  total,
  currentPage,
  totalPages,
  categoryName,
}) => {
  const { params: { category } } = match
  const expenseCategory = categoryName.toLowerCase()
  const vehicleColumn = expenseCategory === 'vehicle' ? [{
    label: 'Vehicle',
    map: 'vehicle.registrationNo',
  }] : []
  const staffColumn = expenseCategory === 'staff' ? [{
    label: 'Staff name',
    map: 'staff.name',
  }] : []
  const columns = [{
    label: 'Expense date',
    custom: ({ _id, date }) => (
      <Anchor asLink href={`/expense/${category}/${_id}/detail`}>
        {formatDate(date)}
      </Anchor>
    ),
  },
  {
    label: 'Expense type',
    map: 'type.name',
  },
  ...vehicleColumn,
  ...staffColumn,
  {
    label: 'Location',
    map: 'location',
  },
  {
    label: 'Amount',
    classes: 'text-right',
    custom: ({ amount }) => (
      <Currency data={amount} />
    ),
  },
  {
    label: 'Payment method',
    classes: 'text-center',
    map: 'paymentMethod.name',
  }]

  return (
    <>
      <PageHeader
        title={`${categoryName} expenses`}
        total={total}
        btnRoute={`/expense/${category}/create`}
        btnLabel={`Add ${categoryName} expense`}
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getExpense}
        deleteHandler={deleteExpense}
        editRoute={`/expense/${category}`}
        currentPage={currentPage}
        totalPages={totalPages}
        withPagination
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
  getExpense: func.isRequired,
  deleteExpense: func.isRequired,
  data: arrayOf(shape({
    _id: string,
  })),
  total: number,
  totalPages: number,
  currentPage: number,
  categoryName: string,
}

Search.defaultProps = {
  data: [],
  total: 0,
  totalPages: 0,
  currentPage: 1,
  categoryName: '',
}

const SearchWithConnect = connect(mapStateToProps, actions)(Search)

export {
  SearchWithConnect as default,
  Search,
}
