import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput, TextArea,
  RadioGroup, SelectBox, DatePicker,
  Text, Toggle,
} from '@base'

import { CustomerSelection } from '@local'

import { toUTCFormat } from '@utils/date'

class CreateForm extends PureComponent {
  state = {
    customer: '',
    vehicleType: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { customer, vehicleType } = model
    const { _id: customerId } = customer || {}
    const { _id: vehicleTypeId } = vehicleType || {}

    if (isEdit) {
      this.setState({
        customer: customerId,
        vehicleType: vehicleTypeId,
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  customerTypeChangeHandler = (type) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: {
        customerType: type,
      },
    })
  }

  customerChangeHandler = (valueObj) => {
    const { customer } = valueObj
    this.setState({
      customer,
    })
    this.changeHandler(valueObj)
  }

  customerDetailChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      customerDetails: {
        $merge: valueObj,
      },
    })
  }

  render() {
    const { customer, vehicleType } = this.state
    const { vehicleTypes, model, errorMap = {} } = this.props
    const {
      pickUpLocation, dropOffLocation, pickUpDateTime, comment,
      noOfSeats, hasAc, customerCategory, customerType,
      customerDetails = {},
    } = model
    const { name, contact, email } = customerDetails
    return (
      <>
        <Panel title="Booking details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <Text tag="label">Customer type</Text>
              <RadioGroup
                list={[{
                  name: 'customerType',
                  id: 'existing',
                  value: 'existing',
                  label: 'Existing',
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
              <TextInput
                label="Pickup location"
                name="pickUpLocation"
                value={pickUpLocation}
                required
                invalid={!!errorMap.pickUpLocation}
                errorMessage={errorMap.pickUpLocation}
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
                label="Drop off location"
                name="dropOffLocation"
                required
                value={dropOffLocation}
                invalid={!!errorMap.dropOffLocation}
                errorMessage={errorMap.dropOffLocation}
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
              <DatePicker
                label="Pick up date-time"
                name="pickUpDateTime"
                required
                selected={pickUpDateTime}
                minDate={toUTCFormat(new Date())}
                options={{
                  showTimeSelect: true,
                  timeIntervals: 15,
                  timeCaption: 'Time',
                  dateFormat: 'dd-MM-yyyy, h:mm aaa',
                }}
                changeHandler={this.changeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <SelectBox
                label="Vehicle type"
                name="vehicleType"
                valueMap="name"
                keyMap="_id"
                options={vehicleTypes}
                value={vehicleType}
                required
                invalid={!!errorMap.vehicleType}
                errorMessage={errorMap.vehicleType}
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
                <Col
                  col={{
                    xs: 8,
                  }}
                  classes="pad-b-15"
                >
                  <TextInput
                    label="No. of seats"
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
                    xs: 4,
                  }}
                  classes="pad-b-15"
                >
                  <Text tag="label">
                    AC
                  </Text>
                  <Toggle
                    checked={hasAc}
                    name="hasAc"
                    classes="pad-t-10"
                    changeHandler={this.changeHandler}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
        {customerType === 'existing' && (
          <Panel title="Customer details" classes="mar-b-15">
            <CustomerSelection
              category={customerCategory}
              value={customer}
              categoryError={errorMap.customerCategory}
              valueError={errorMap.customer}
              changeHandler={this.customerChangeHandler}
            />
          </Panel>
        )}

        {customerType === 'new' && (
          <Panel title="Customer details" classes="mar-b-15">
            <Row>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Customer name"
                  name="name"
                  value={name}
                  required
                  invalid={!!errorMap['customerDetails.name']}
                  errorMessage={errorMap['customerDetails.name']}
                  changeHandler={this.customerDetailChangeHandler}
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Contact"
                  name="contact"
                  value={contact}
                  required
                  invalid={!!errorMap['customerDetails.contact']}
                  errorMessage={errorMap['customerDetails.contact']}
                  changeHandler={this.customerDetailChangeHandler}
                />
              </Col>
              <Col
                col={{
                  xs: 12, sm: 12, md: 4, lg: 4,
                }}
                classes="pad-b-15"
              >
                <TextInput
                  label="Email address"
                  name="email"
                  value={email}
                  invalid={!!errorMap['customerDetails.email']}
                  errorMessage={errorMap['customerDetails.email']}
                  changeHandler={this.customerDetailChangeHandler}
                />
              </Col>
            </Row>
          </Panel>
        )}
        <Panel title="Comments" classes="mar-b-15 pad-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 6, lg: 6,
              }}
              classes="pad-b-15"
            >
              <TextArea
                name="comment"
                value={comment}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
        </Panel>
      </>
    )
  }
}

CreateForm.propTypes = {
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

CreateForm.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  vehicleTypes: [],
  isEdit: false,
}

export default CreateForm
