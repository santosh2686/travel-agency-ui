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
  getCustomer,
  deleteCustomer,
  data,
  total,
  categoryName,
}) => {
  const { params: { category } } = match

  const columns = [{
    label: 'Customer name',
    custom: ({ _id, name }) => (
      <Anchor asLink href={`/customer/${category}/${_id}/detail`}>
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
    label: 'contact',
    custom: ({ contact }) => (
      <>
        {`+91 ${contact}`}
      </>
    ),
  },
  {
    label: 'Whats app no',
    custom: ({ whatsAppNumber }) => (
      <>
        {`+91 ${whatsAppNumber}`}
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
        title={`${categoryName} customer`}
        total={total}
        btnRoute={`/customer/${category}/create`}
        btnLabel={`Add ${categoryName} customer`}
      />
      <Grid
        columns={columns}
        data={data}
        fetchHandler={getCustomer}
        deleteHandler={deleteCustomer}
        editRoute={`/customer/${category}`}
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
  getCustomer: func.isRequired,
  deleteCustomer: func.isRequired,
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
