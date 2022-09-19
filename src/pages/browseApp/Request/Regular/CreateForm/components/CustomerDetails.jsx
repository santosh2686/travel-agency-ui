import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import {
  Panel, Row, Col, TextInput,
} from '@base'

import { CustomerSelection } from '@local'

class CustomerDetails extends PureComponent {
  state = {
    customer: '',
  }

  componentDidMount() {
    const { isEdit, model } = this.props
    const { customer } = model
    const { _id: customerId } = customer || {}

    if (isEdit) {
      this.setState({ customer: customerId })
    }
  }

  customerChangeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { customer } = valueObj
    this.setState({ customer })
    changeHandler({
      $merge: valueObj,
    })
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
    const { customer } = this.state
    const { model = {}, errorMap = {} } = this.props
    const { customerType, customerCategory, customerDetails = {} } = model
    const { name, contact, email } = customerDetails

    return (
      <Panel title="Customer details" classes="mar-b-15">
        {customerType === 'existing' && (
          <CustomerSelection
            category={customerCategory}
            value={customer}
            categoryError={errorMap.customerCategory}
            valueError={errorMap.customer}
            changeHandler={this.customerChangeHandler}
          />
        )}
        {customerType === 'new' && (
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
        )}
      </Panel>
    )
  }
}

CustomerDetails.propTypes = {
  model: shape({
    customerType: string,
  }),
  errorMap: shape({
    customer: string,
  }),
  isEdit: bool,
  changeHandler: func,
}

CustomerDetails.defaultProps = {
  changeHandler: () => {},
  model: {},
  errorMap: {},
  isEdit: false,
}

export default CustomerDetails
