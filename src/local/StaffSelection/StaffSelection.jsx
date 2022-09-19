import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import DataSelection from '../DataSelection/DataSelection'

import { mapStateToProps, actions } from './staffSelection.conf'

class StaffSelection extends Component {
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
    const { getStaff } = this.props
    const requestQuery = {
      filterData: params,
    }
    getStaff(requestQuery).then((response) => {
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
      staffCategory: category,
      staff: '',
    })
    if (category) {
      this.fetchData(valueObj)
    }
  }

  dataSelectHandler = ({ data }) => {
    const { changeHandler } = this.props
    changeHandler({
      staff: data,
    })
  }

  render() {
    const { data, isLoading } = this.state
    const {
      categoryList, category, value, categoryError, valueError,
    } = this.props
    return (
      <DataSelection
        type="Staff"
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

StaffSelection.propTypes = {
  getStaff: func.isRequired,
  changeHandler: func.isRequired,
  categoryList: arrayOf(shape({
    name: string,
  })),
  category: string,
  value: string,
  categoryError: string,
  valueError: string,
}

StaffSelection.defaultProps = {
  categoryList: [],
  category: '',
  value: '',
  categoryError: '',
  valueError: '',
}

const StaffSelectionWithConnect = connect(mapStateToProps, actions)(StaffSelection)

export {
  StaffSelectionWithConnect as default,
  StaffSelection,
}
