import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput, TextArea, SelectBox, DatePicker,
} from '@base'

import { VehicleSelection, StaffSelection } from '@local'

import { toUTCFormat } from '@utils/date'

class CreateForm extends PureComponent {
  state = {
    expenseType: '',
    paymentMethod: '',
    vehicle: '',
    staff: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const {
      type, paymentMethod, vehicle, staff,
    } = model
    const { _id: expenseTypeId } = type || {}
    const { _id: paymentMethodId } = paymentMethod || {}
    const { _id: vehicleId } = vehicle || {}
    const { _id: staffId } = staff || {}

    if (isEdit) {
      this.setState({
        expenseType: expenseTypeId,
        paymentMethod: paymentMethodId,
        vehicle: vehicleId,
        staff: staffId,
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  expenseTypeChangeHandler = (valueObj) => {
    const { type } = valueObj
    this.setState({
      expenseType: type,
    })
    this.changeHandler(valueObj)
  }

  paymentMethodChangeHandler = (valueObj) => {
    const { paymentMethod } = valueObj
    this.setState({
      paymentMethod,
    })
    this.changeHandler(valueObj)
  }

  vehicleChangeHandler = (valueObj) => {
    const { vehicle } = valueObj
    this.setState({
      vehicle,
    })
    this.changeHandler(valueObj)
  }

  staffChangeHandler = (valueObj) => {
    const { staff } = valueObj
    this.setState({
      staff,
    })
    this.changeHandler(valueObj)
  }

  render() {
    const {
      expenseType, paymentMethod, vehicle, staff,
    } = this.state
    const {
      expenseTypes, paymentMethods, model, errorMap = {}, categoryName,
    } = this.props
    const expenseCategory = categoryName.toLowerCase()
    const {
      date,
      location,
      amount,
      vehicleCategory,
      staffCategory,
      comment,
    } = model
    return (
      <>
        <Panel title="Expense details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <SelectBox
                label="Expense type"
                name="type"
                options={expenseTypes}
                valueMap="name"
                keyMap="_id"
                value={expenseType}
                invalid={!!errorMap.type}
                required
                errorMessage={errorMap.type}
                changeHandler={this.expenseTypeChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <SelectBox
                label="Payment method"
                name="paymentMethod"
                options={paymentMethods}
                valueMap="name"
                keyMap="_id"
                value={paymentMethod}
                invalid={!!errorMap.paymentMethod}
                required
                errorMessage={errorMap.paymentMethod}
                changeHandler={this.paymentMethodChangeHandler}
              />
            </Col>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <DatePicker
                label="Expense date"
                name="date"
                required
                selected={date}
                maxDate={toUTCFormat(new Date())}
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
                label="Expense amount"
                name="amount"
                value={amount}
                invalid={!!errorMap.amount}
                required
                errorMessage={errorMap.amount}
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
                label="Location"
                name="location"
                value={location}
                changeHandler={this.changeHandler}
              />
            </Col>
          </Row>
        </Panel>

        {expenseCategory === 'vehicle' && (
          <Panel title="Vehicle details" classes="mar-b-15">
            <VehicleSelection
              category={vehicleCategory}
              value={vehicle}
              categoryError={errorMap.vehicleCategory}
              valueError={errorMap.vehicle}
              changeHandler={this.vehicleChangeHandler}
            />
          </Panel>
        )}

        {expenseCategory === 'staff' && (
          <Panel title="Staff details" classes="mar-b-15">
            <StaffSelection
              category={staffCategory}
              value={staff}
              categoryError={errorMap.staffCategory}
              valueError={errorMap.staff}
              changeHandler={this.staffChangeHandler}
            />
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
  expenseTypes: arrayOf(shape({
    name: string,
  })),
  paymentMethods: arrayOf(shape({
    name: string,
  })),
  isEdit: bool,
  categoryName: string,
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  expenseTypes: [],
  paymentMethods: [],
  isEdit: false,
  categoryName: '',
}

export default CreateForm
