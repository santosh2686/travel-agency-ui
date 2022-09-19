import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput, TextArea, SelectBox, DatePicker,
} from '@base'

import { StaffSelection } from '@local'

import { toUTCFormat } from '@utils/date'

class CreateForm extends PureComponent {
  state = {
    staff: '',
    paymentMethod: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { staff, paymentMethod } = model
    const { _id: staffId } = staff || {}
    const { _id: paymentMethodId } = paymentMethod || {}

    if (isEdit) {
      this.setState({
        staff: staffId,
        paymentMethod: paymentMethodId,
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      $merge: valueObj,
    })
  }

  staffChangeHandler = (valueObj) => {
    this.setState(valueObj)
    this.changeHandler(valueObj)
  }

  paymentMethodChangeHandler = (valueObj) => {
    const { paymentMethod } = valueObj
    this.setState({
      paymentMethod,
    })
    this.changeHandler(valueObj)
  }

  render() {
    const { staff, paymentMethod } = this.state
    const { model, paymentMethods, errorMap = {} } = this.props
    const {
      amount, paymentDate, comment, staffCategory,
    } = model
    return (
      <>
        <Panel title="Staff details" classes="mar-b-15">
          <StaffSelection
            category={staffCategory}
            value={staff}
            categoryError={errorMap.staffCategory}
            valueError={errorMap.staff}
            changeHandler={this.staffChangeHandler}
          />
        </Panel>

        <Panel title="Payment details" classes="mar-b-15">
          <Row>
            <Col
              col={{
                xs: 12, sm: 12, md: 4, lg: 4,
              }}
              classes="pad-b-15"
            >
              <DatePicker
                label="Expense date"
                name="paymentDate"
                required
                selected={paymentDate}
                maxDate={toUTCFormat(new Date())}
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
          </Row>
        </Panel>

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
  paymentMethods: arrayOf(shape({
    name: string,
  })),
  isEdit: bool,
}

CreateForm.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  paymentMethods: [],
  isEdit: false,
}

export default CreateForm
