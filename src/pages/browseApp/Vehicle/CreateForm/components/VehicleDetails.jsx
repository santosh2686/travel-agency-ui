import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput, Text, Toggle, SelectBox,
} from '@base'

class VehicleDetails extends PureComponent {
  state = {
    vehicleType: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { type = {} } = model
    if (isEdit) {
      const { _id } = type
      this.setState({ vehicleType: _id })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  vehicleTypeChangeHandler = (valueObj) => {
    const { type } = valueObj
    this.setState({ vehicleType: type })
    this.changeHandler(valueObj)
  }

  monthlyFixedChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { isMonthlyFixed } = valueObj
    changeHandler({
      $merge: {
        isMonthlyFixed,
        monthlyFixedDetails: {},
      },
    })
  }

  render() {
    const { vehicleType } = this.state
    const {
      vehicleTypes, model, errorMap = {},
    } = this.props
    const {
      manufacturer, name, registrationNo,
      noOfSeats, isMonthlyFixed,
      hasAc,
    } = model
    return (
      <>
        <Panel title="Vehicle details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <SelectBox
                label="Vehicle type"
                name="type"
                options={vehicleTypes}
                valueMap="name"
                keyMap="_id"
                value={vehicleType}
                invalid={!!errorMap.type}
                required
                errorMessage={errorMap.type}
                changeHandler={this.vehicleTypeChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Manufacturer"
                name="manufacturer"
                value={manufacturer}
                invalid={!!errorMap.manufacturer}
                required
                errorMessage={errorMap.manufacturer}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Name"
                name="name"
                value={name}
                invalid={!!errorMap.name}
                required
                errorMessage={errorMap.name}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                label="Registration number"
                name="registrationNo"
                value={registrationNo}
                required
                invalid={!!errorMap.registrationNo}
                errorMessage={errorMap.registrationNo}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <TextInput
                type="number"
                label="No of seats"
                name="noOfSeats"
                value={noOfSeats}
                required
                invalid={!!errorMap.noOfSeats}
                errorMessage={errorMap.noOfSeats}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <Row>
                <Col col={{ xs: 6 }}>
                  <Text tag="label" classes="mar-b-5">
                    AC
                  </Text>
                  <Toggle checked={hasAc} name="hasAc" changeHandler={this.changeHandler} />
                </Col>
                <Col col={{ xs: 6 }}>
                  <Text tag="label" classes="mar-b-5">
                    Monthly fixed
                  </Text>
                  <Toggle
                    checked={isMonthlyFixed}
                    name="isMonthlyFixed"
                    changeHandler={this.monthlyFixedChangeHandler}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </>
    )
  }
}

VehicleDetails.propTypes = {
  changeHandler: func,
  model: shape({
    packageCode: string,
  }),
  errorMap: shape({
    packageCode: string,
  }),
  vehicleTypes: arrayOf(shape({
    name: string,
  })),
  isEdit: bool,
}

VehicleDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  vehicleTypes: [],
  isEdit: false,
}

export default VehicleDetails
