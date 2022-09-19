import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, func, shape, string,
} from 'prop-types'

import DataSelection from '../DataSelection/DataSelection'

import { mapStateToProps, actions } from './vehicleSelection.conf'

class VehicleSelection extends Component {
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
    const { getVehicle } = this.props
    const requestQuery = {
      filterData: params,
    }
    getVehicle(requestQuery).then((response) => {
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
      vehicleCategory: category,
      vehicle: '',
    })
    if (category) {
      this.fetchData(valueObj)
    }
  }

  dataSelectHandler = ({ data }) => {
    const { changeHandler } = this.props
    changeHandler({
      vehicle: data,
    })
  }

  render() {
    const { data, isLoading } = this.state
    const {
      categoryList, category, value, categoryError, valueError,
    } = this.props
    return (
      <DataSelection
        type="Vehicle"
        dataValueMap="registrationNo"
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

VehicleSelection.propTypes = {
  getVehicle: func.isRequired,
  changeHandler: func.isRequired,
  categoryList: arrayOf(shape({
    name: string,
  })),
  category: string,
  value: string,
  categoryError: string,
  valueError: string,
}

VehicleSelection.defaultProps = {
  categoryList: [],
  category: '',
  value: '',
  categoryError: '',
  valueError: '',
}

const VehicleSelectionWithConnect = connect(mapStateToProps, actions)(VehicleSelection)

export {
  VehicleSelectionWithConnect as default,
  VehicleSelection,
}
