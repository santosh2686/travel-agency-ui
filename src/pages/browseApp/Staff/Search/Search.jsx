/* eslint-disable react/prop-types */
import React from 'react'
import {
  arrayOf, func, number, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { Anchor, Currency } from '@base'
import { PageHeader, Grid, ActiveIndicator } from '@local'

import { formatDate } from '@utils/date'

import { mapStateToProps, actions } from './search.conf'

const Search = ({
  match,
  getStaff,
  deleteStaff,
  data,
  total,
  categoryName,
}) => {
  const { params: { category } } = match
  const columnClass = 'text-right'

  const columns = [{
    label: 'Name',
    custom: ({ _id, name }) => (
      <Anchor asLink href={`/staff/${category}/${_id}/detail`}>
        {name}
      </Anchor>
    ),
  },
  {
    label: 'Address',
    custom: ({ address }) => {
      const {
        addressLine1, addressLine2, city, state, pinCode,
      } = address
      return (
        <>
          {`${addressLine1}, ${addressLine2}, ${city}, ${state}, ${pinCode}`}
        </>
      )
    },
  },
  {
    label: 'License',
    map: 'license',
  },
  {
    label: 'contact',
    custom: ({ contact }) => (
      <>
        {`+91 ${contact}`}
      </>
    ),
  },
  {
    label: 'Joining date',
    custom: ({ joiningDate }) => (
      <>
        {formatDate(joiningDate)}
      </>
    ),
  },
  {
    label: 'Salary',
    classes: columnClass,
    custom: ({ salary }) => (
      <Currency data={salary} />
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
        btnRoute={`/staff/${category}/create`}
        btnLabel={`Add ${categoryName}`}
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getStaff}
        deleteHandler={deleteStaff}
        editRoute={`/staff/${category}`}
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
  getStaff: func.isRequired,
  deleteStaff: func.isRequired,
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
