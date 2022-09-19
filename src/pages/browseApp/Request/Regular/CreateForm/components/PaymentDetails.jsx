import React, { PureComponent } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, SelectBox, DatePicker,
} from '@base'
import constants from '@config/constant'
import { toUTCFormat } from '@utils/date'

class PaymentDetails extends PureComponent {
  state = {
    paymentMethod: '',
  }

  componentDidMount() {
    const { isEdit, model, changeHandler } = this.props
    const { paymentMethod, paymentDetails } = model
    const { _id: paymentMethodId } = paymentMethod || {}

    if (isEdit) {
      changeHandler({
        $merge: {
          paymentDetails,
        },
      })
      this.setState({
        paymentMethod: paymentMethodId,
      })
    }
  }

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    changeHandler({
      paymentDetails: {
        $merge: valueObj,
      },
    })
  }

  paymentMethodChangeHandler = (valueObj) => {
    const { paymentMethod } = valueObj
    this.setState({
      paymentMethod,
    })

    this.changeHandler(valueObj)
  }

  render() {
    const { paymentMethod } = this.state
    const { model, paymentMethods, errorMap = {} } = this.props
    const { paymentDetails } = model
    const { paymentDate, status } = paymentDetails
    const paymentStatus = [{
      key: 'BILL_GENERATED',
      value: constants.BILL_GENERATED,
    },
    {
      key: 'BILL_SENT_TO_CUSTOMER',
      value: constants.BILL_SENT_TO_CUSTOMER,
    },
    {
      key: 'PAYMENT_RECEIVED',
      value: constants.PAYMENT_RECEIVED,
    }]
    return (
      <Panel title="Payment details" classes="mar-b-15">
        <Row>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <SelectBox
              label="Payment status"
              name="status"
              options={paymentStatus}
              value={status}
              changeHandler={this.changeHandler}
            />
          </Col>
          <Col
            col={{
              xs: 12, sm: 12, md: 4, lg: 4,
            }}
            classes="pad-b-15"
          >
            <DatePicker
              label="Payment date"
              name="paymentDate"
              selected={paymentDate}
              maxDate={toUTCFormat(new Date())}
              changeHandler={this.changeHandler}
              invalid={!!errorMap['paymentDetails.paymentDate']}
              errorMessage={errorMap['paymentDetails.paymentDate']}
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
              changeHandler={this.paymentMethodChangeHandler}
            />
          </Col>
        </Row>
      </Panel>
    )
  }
}

PaymentDetails.propTypes = {
  isEdit: bool,
  model: shape({
    tollCharge: string,
  }),
  paymentMethods: arrayOf(shape({
    name: string,
  })),
  errorMap: shape({
    name: string,
  }),
  changeHandler: func,
}

PaymentDetails.defaultProps = {
  isEdit: false,
  model: {},
  paymentMethods: [],
  errorMap: {},
  changeHandler: () => {},
}

export default PaymentDetails
