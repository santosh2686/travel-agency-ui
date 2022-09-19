import React, { PureComponent } from 'react'
import {
  bool, arrayOf, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, RadioGroup, Text,
} from '@base'

import TimeMaterial from '../../../common/components/TimeMaterial/TimeMaterial.jsx'

class RequestDetails extends PureComponent {
  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  customerTypeChangeHandler = (value) => {
    this.changeHandler({
      customerType: value,
      customerCategory: null,
      customer: null,
      customerDetails: {},
    })
  }

  vehicleTypeChangeHandler = (value) => {
    this.changeHandler({
      vehicleType: value,
      vehicleCategory: null,
      vehicle: null,
      vehicleDetails: {},
      packageFromProvidedVehicle: {},
    })
  }

  staffTypeChangeHandler = (value) => {
    this.changeHandler({
      staffType: value,
      staffCategory: null,
      staff: null,
      staffDetails: {},
    })
  }

  render() {
    const {
      model, errorMap = {}, requestTypes, isEdit,
    } = this.props
    const {
      customerType, vehicleType, staffType,
    } = model
    return (
      <Panel title="Request details" classes="mar-b-15">
        <Row>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <Text tag="label">Customer selection</Text>
            <RadioGroup
              list={[{
                name: 'customerType',
                id: 'existing',
                value: 'existing',
                label: 'Existing customer',
                defaultChecked: customerType === 'existing',
              },
              {
                name: 'customerType',
                id: 'new',
                value: 'new',
                label: 'New customer',
                defaultChecked: customerType === 'new',
              }]}
              inline
              classes="pad-t-10"
              changeHandler={this.customerTypeChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <Text tag="label">Vehicle selection</Text>
            <RadioGroup
              list={[{
                name: 'vehicleType',
                id: 'existing',
                value: 'existing',
                label: 'Existing vehicle',
                defaultChecked: vehicleType === 'existing',
              },
              {
                name: 'vehicleType',
                id: 'new',
                value: 'new',
                label: 'New vehicle',
                defaultChecked: vehicleType === 'new',
              }]}
              inline
              classes="pad-t-10"
              changeHandler={this.vehicleTypeChangeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <Text tag="label">Staff selection</Text>
            <RadioGroup
              list={[{
                name: 'staffType',
                id: 'existing',
                value: 'existing',
                label: 'Existing staff',
                defaultChecked: staffType === 'existing',
              },
              {
                name: 'staffType',
                id: 'new',
                value: 'new',
                label: 'New staff',
                defaultChecked: staffType === 'new',
              }]}
              inline
              classes="pad-t-10"
              changeHandler={this.staffTypeChangeHandler}
            />
          </Col>
        </Row>
        <TimeMaterial
          model={model}
          errorMap={errorMap}
          isEdit={isEdit}
          requestTypes={requestTypes}
          changeHandler={this.changeHandler}
        />
      </Panel>
    )
  }
}

RequestDetails.propTypes = {
  model: shape({
    customerType: string,
  }),
  errorMap: shape({
    pickUpLocation: string,
  }),
  requestTypes: arrayOf(shape({
    name: string,
  })),
  changeHandler: func,
  isEdit: bool,
}

RequestDetails.defaultProps = {
  model: {},
  errorMap: {},
  requestTypes: [],
  changeHandler: () => {},
  isEdit: false,
}

export default RequestDetails
