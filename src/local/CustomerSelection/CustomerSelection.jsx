import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import DataSelection from '../DataSelection/DataSelection'

import { mapStateToProps, actions } from './customerSelection.conf'

class CustomerSelection extends Component {
  state = {
    data: [],
    isLoading: false,
  }

  componentDidMount() {
    const { category } = this.props
    if (category) {
      this.fetchData({ category })
    }
  }

  fetchData = (params) => {
    this.setState({ isLoading: true })
    const { getCustomer } = this.props
    const requestQuery = {
      filterData: params,
    }
    getCustomer(requestQuery).then((response) => {
      const { data } = response
      this.setState({
        data,
        isLoading: false,
      })
    })
  }

  categorySelectHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { category } = valueObj
    changeHandler({
      customerCategory: category,
      customer: '',
    })
    this.fetchData(valueObj)
  }

  dataSelectHandler = ({ data }) => {
    const { changeHandler } = this.props
    changeHandler({
      customer: data,
    })
  }

  render() {
    const { data, isLoading } = this.state
    const {
      categoryList, category, value, categoryError, valueError,
    } = this.props
    return (
      <DataSelection
        type="Customer"
        dataValueMap="name"
        categorySelected={category}
        valueSelected={value}
        categoryError={categoryError}
        valueError={valueError}
        categoryList={categoryList}
        dataList={data}
        isLoading={isLoading}
        categorySelectHandler={this.categorySelectHandler}
        dataSelectHandler={this.dataSelectHandler}
      />
    )
  }
}

CustomerSelection.propTypes = {
  getCustomer: func.isRequired,
  changeHandler: func.isRequired,
  categoryList: arrayOf(shape({
    name: string,
  })),
  category: string,
  value: string,
  categoryError: string,
  valueError: string,
}

CustomerSelection.defaultProps = {
  categoryList: [],
  category: '',
  value: '',
  categoryError: '',
  valueError: '',
}

const CustomerSelectionWithConnect = connect(mapStateToProps, actions)(CustomerSelection)

export {
  CustomerSelectionWithConnect as default,
  CustomerSelection,
}
