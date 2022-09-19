import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import DataSelection from '../DataSelection/DataSelection'

import { mapStateToProps, actions } from './packageSelection.conf'

class PackageSelection extends Component {
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
    const { getPackage } = this.props
    const requestQuery = {
      filterData: params,
    }
    getPackage(requestQuery).then((response) => {
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
      packageCategory: category,
      package: '',
    })
    if (category) {
      this.fetchData(valueObj)
    }
  }

  dataSelectHandler = ({ data }) => {
    const { changeHandler } = this.props
    changeHandler({
      package: data,
    })
  }

  render() {
    const { data, isLoading } = this.state
    const {
      categoryList, category, value, categoryError, valueError,
    } = this.props
    return (
      <DataSelection
        type="Package"
        dataValueMap="packageCode"
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

PackageSelection.propTypes = {
  getPackage: func.isRequired,
  changeHandler: func.isRequired,
  categoryList: arrayOf(shape({
    name: string,
  })),
  category: string,
  value: string,
  categoryError: string,
  valueError: string,
}

PackageSelection.defaultProps = {
  categoryList: [],
  category: '',
  value: '',
  categoryError: '',
  valueError: '',
}

const PackageSelectionWithConnect = connect(mapStateToProps, actions)(PackageSelection)

export {
  PackageSelectionWithConnect as default,
  PackageSelection,
}
