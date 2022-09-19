import React, { PureComponent } from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import { Panel } from '@base'

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

  changeHandler = (valueObj) => {
    const { changeHandler } = this.props
    const { customer } = valueObj
    this.setState({ customer })
    changeHandler({
      $merge: valueObj,
    })
  }

  render() {
    const { customer } = this.state
    const { model = {}, errorMap = {} } = this.props
    const { customerCategory } = model

    return (
      <Panel title="Customer details" classes="mar-b-15">
        <CustomerSelection
          category={customerCategory}
          value={customer}
          categoryError={errorMap.customerCategory}
          valueError={errorMap.customer}
          changeHandler={this.changeHandler}
        />
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
