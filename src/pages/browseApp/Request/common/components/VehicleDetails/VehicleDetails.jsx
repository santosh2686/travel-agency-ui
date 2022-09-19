import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput,
} from '@base'

import { VehicleSelection } from '@local'

class VehicleDetails extends PureComponent {
  state = {
    vehicle: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { vehicle } = model
    const { _id: vehicleId } = vehicle || {}

    if (isEdit) {
      this.setState({ vehicle: vehicleId })
    }
  }

  vehicleChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { vehicle } = valueObj
    this.setState({ vehicle })
    changeHandler({
      $merge: {
        ...valueObj,
        packageFromProvidedVehicle: {},
      },
    })
  }

  vehicleDetailChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      vehicleDetails: {
        $merge: valueObj,
      },
    })
  }

  render() {
    const { vehicle } = this.state
    const { model = {}, errorMap = {} } = this.props
    const { vehicleType, vehicleCategory, vehicleDetails = {} } = model
    const {
      ownerName, ownerContact, ownerEmail,
      manufacturer, name, registrationNo,
    } = vehicleDetails

    return (
      <Panel title="Vehicle details" classes="mar-b-15">
        {vehicleType === 'existing' && (
          <VehicleSelection
            category={vehicleCategory}
            value={vehicle}
            categoryError={errorMap.vehicleCategory}
            valueError={errorMap.vehicle}
            changeHandler={this.vehicleChangeHandler}
          />
        )}
        {vehicleType === 'new' && (
          <>
            <Row>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Owner name"
                  name="ownerName"
                  value={ownerName}
                  required
                  invalid={!!errorMap['vehicleDetails.ownerName']}
                  errorMessage={errorMap['vehicleDetails.ownerName']}
                  changeHandler={this.vehicleDetailChangeHandler}
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Owner contact"
                  name="ownerContact"
                  value={ownerContact}
                  required
                  invalid={!!errorMap['vehicleDetails.ownerContact']}
                  errorMessage={errorMap['vehicleDetails.ownerContact']}
                  changeHandler={this.vehicleDetailChangeHandler}
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Owner email address"
                  name="ownerEmail"
                  value={ownerEmail}
                  invalid={!!errorMap['vehicleDetails.ownerEmail']}
                  errorMessage={errorMap['vehicleDetails.ownerEmail']}
                  changeHandler={this.vehicleDetailChangeHandler}
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
                  label="Vehicle manufacturer"
                  name="manufacturer"
                  value={manufacturer}
                  required
                  invalid={!!errorMap['vehicleDetails.manufacturer']}
                  errorMessage={errorMap['vehicleDetails.manufacturer']}
                  changeHandler={this.vehicleDetailChangeHandler}
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Vehicle name"
                  name="name"
                  value={name}
                  required
                  invalid={!!errorMap['vehicleDetails.name']}
                  errorMessage={errorMap['vehicleDetails.name']}
                  changeHandler={this.vehicleDetailChangeHandler}
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Vehicle registration no."
                  name="registrationNo"
                  value={registrationNo}
                  required
                  invalid={!!errorMap['vehicleDetails.registrationNo']}
                  errorMessage={errorMap['vehicleDetails.registrationNo']}
                  changeHandler={this.vehicleDetailChangeHandler}
                />
              </Col>
            </Row>
          </>
        )}
      </Panel>
    )
  }
}

VehicleDetails.propTypes = {
  model: shape({
    vehicleType: string,
  }),
  errorMap: shape({
    vehicle: string,
  }),
  isEdit: bool,
  changeHandler: func,
}

VehicleDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
}

export default VehicleDetails
