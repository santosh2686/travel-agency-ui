import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import {
  Button, Col, Row, SelectBox,
} from '@base'
import { validatePayload, getYearList } from '@utils'
import { getCurrentYear } from '@utils/date'

import validationSchema from './validation/schema.js'

import { mapStateToProps, actions } from './filterByVehicle.conf.js'

class FilterByVehicle extends PureComponent {
  state = {
    data: [],
    isLoading: false,
    isFilteredApplied: false,
    errorMap: {},
  }

  fetchData = (params) => {
    this.setState({ isLoading: true })
    const { getVehicle } = this.props
    getVehicle(params).then((response) => {
      const { data } = response
      this.setState({
        data,
        isLoading: false,
      })
    })
  }

  categorySelectHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { vehicleCategory } = valueObj
    changeHandler({
      vehicleCategory,
      vehicle: '',
    })
    if (vehicleCategory) {
      this.setState({ errorMap: {} })
      this.fetchData({ filterData: { category: vehicleCategory } })
    }
  }

  filterSearchHandler = () => {
    this.setState({ errorMap: {} })
    const { filterData, searchHandler } = this.props
    const { isValid, errorMap } = validatePayload(validationSchema, filterData)
    if (!isValid) {
      this.setState({ errorMap })
      return
    }
    this.setState({ isFilteredApplied: true })
    searchHandler()
  }

  filterClearHandler = () => {
    const { clearHandler } = this.props
    const { isFilteredApplied } = this.state
    if (isFilteredApplied) {
      clearHandler()
    }
    this.setState({ errorMap: {}, isFilteredApplied: false })
  }

  render() {
    const { isLoading, data, errorMap } = this.state
    const {
      categoryList, filterData, changeHandler, withYear,
    } = this.props
    const { vehicleCategory, vehicle, year = getCurrentYear() } = filterData
    return (
      <Row>
        <Col
          col={{
            xs: 12, sm: 12, md: 3, lg: 3,
          }}
          classes="pad-b-10"
        >
          <SelectBox
            name="vehicleCategory"
            placeHolder="Vehicle category"
            keyMap="_id"
            valueMap="name"
            invalid={!!errorMap.vehicleCategory}
            value={vehicleCategory}
            options={categoryList}
            changeHandler={this.categorySelectHandler}
          />
        </Col>
        <Col
          col={{
            xs: 12, sm: 12, md: 3, lg: 3,
          }}
          classes="pad-b-10"
        >
          <SelectBox
            name="vehicle"
            placeHolder="Select vehicle"
            keyMap="_id"
            valueMap="registrationNo"
            invalid={!!errorMap.vehicle}
            value={vehicle}
            options={data}
            isLoading={isLoading}
            changeHandler={changeHandler}
          />
        </Col>
        { withYear && (
          <Col
            col={{
              xs: 12, sm: 12, md: 2, lg: 2,
            }}
            classes="pad-b-10"
          >
            <SelectBox
              name="year"
              options={getYearList()}
              value={year}
              changeHandler={changeHandler}
            />
          </Col>
        )}
        <Col
          col={{
            xs: 12, sm: 4,
          }}
          classes="flex pad-b-10"
        >
          <Button
            classes="mar-r-10 flex-1"
            clickHandler={this.filterSearchHandler}
          >
            Search
          </Button>
          <Button
            outline
            classes="flex-1"
            clickHandler={this.filterClearHandler}
          >
            Clear
          </Button>
        </Col>
      </Row>
    )
  }
}

FilterByVehicle.propTypes = {
  getVehicle: func.isRequired,
  changeHandler: func.isRequired,
  searchHandler: func.isRequired,
  clearHandler: func.isRequired,
  categoryList: arrayOf(shape({
    name: string,
  })),
  filterData: shape({
    category: string,
    vehicle: string,
  }),
  withYear: bool,
}

FilterByVehicle.defaultProps = {
  categoryList: [],
  filterData: {},
  withYear: false,
}

const FilterByVehicleWithConnect = connect(mapStateToProps, actions)(FilterByVehicle)

export {
  FilterByVehicleWithConnect as default,
  FilterByVehicle,
}
